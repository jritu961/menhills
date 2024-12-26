import bcrypt from 'bcryptjs';
import User from "../model/usermodel.js";

export const registerUser = async (req, res) => {
  const { name, email, password, phone, addresses, wishlist, cart } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "Please enter all required fields." });
    }

    // Validate email format using a regular expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    // Validate phone number format (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Please enter a valid 10-digit phone number." });
    }

    // Check if user already exists (either by email or phone)
    const user = await User.findOne({
      $or: [{ email }, { phone }],
    });
    console.log("🚀 ~ registerUser ~ user:", user)

    if (user) {
      // Check which field already exists
      if (user.email === email) {
        return res.status(400).json({ message: "Email already exists." });
      }
      if (user.phone === phone) {
        return res.status(400).json({ message: "Phone number already exists." });
      }
    }

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    console.log("🚀 ~ registerUser ~ salt:", salt)
    
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user with hashed password and dynamic fields
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      addresses,   // If provided, this will be added to the user document
      wishlist,    // If provided, this will be added to the user document
      cart,        // If provided, this will be added to the user document
    });

    // Save the new user to the database
    const result = await newUser.save();

    // Send the response with created user data (excluding password)
    res.status(201).json({
      data: {
        name: result.name,
        email: result.email,
        phone: result.phone,
        addresses: result.addresses,
        wishlist: result.wishlist,
        cart: result.cart,
        createdAt: result.createdAt,
      },
      message: "User has been successfully created.",
      status: true,
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
