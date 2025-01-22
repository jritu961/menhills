import bcrypt from 'bcryptjs';
import User from "../model/usermodel.js";
import jwt from "jsonwebtoken"
import mongoose from 'mongoose';
import  cloudinary  from "../utils/cloudinary.js";
import streamifier from "streamifier"; 
export const registerUser = async (req, res) => {
  const { name, email, password, phone, addresses, wishlist, cart } = req.body;
  const file = req.file;

  console.log("🚀 ~ registerUser ~ addresses:", addresses);

  try {
    if (!name || !email || !password || !phone || !file || !addresses) {
      return res.status(400).json({ message: "Please enter all required fields." });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Please enter a valid 10-digit phone number." });
    }

    const user = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (user) {
      if (user.email === email) {
        return res.status(400).json({ message: "Email already exists." });
      }
      if (user.phone === phone) {
        return res.status(400).json({ message: "Phone number already exists." });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "profile" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    };

    const image = await uploadToCloudinary();
    console.log("🚀 ~ registerUser ~ image:", image);

    // Ensure addresses is an array of objects
    let parsedAddresses = Array.isArray(addresses) ? JSON.parse(addresses) : JSON.parse(addresses);
    console.log("🚀 ~ registerUser ~ parsedAddresses:", parsedAddresses)

    // Create the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      addresses: parsedAddresses, 
      wishlist,
      cart,
      image,
    });

    const result = await newUser.save();

    res.status(201).json({
      data: result,
      message: "User has been successfully created.",
      status: true,
    });
  } catch (error) {
    console.error("Error in registerUser:", error.response);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter required data' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign(
      { uid: user.id,email: user.email, name: user.name }, // Payload
      process.env.JWT_SECRET, // Secret key
      // { expiresIn: process.env.JWT_EXPIRES_IN } // Options
    );

    // Respond with the token
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email }, // Optional: Return user data
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'An error occurred during login' });
  }
};

export const userDetails= async (req,res) => {
  const {uid}=req.user.decodedToken
  console.log("🚀 ~ userDetails ~ req:", uid)
  if(uid){
    const objectId = new mongoose.Types.ObjectId(uid);
  console.log("Converted ObjectId:", objectId);
    const user=await User.findOne({_id:objectId})
    if(user){
      return res.status(200).json({sucess:true,data:user})
    }
    return res.status(404).json({sucess:false,data:"User Does not exits"})
  }
  return {
}
  
}
