import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid"; // Import UUID library for generating unique IDs

// Define the user schema
const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: uuidv4, // Generate a UUID for the user
      unique: true,    // Ensure `userId` is unique
      required: true,  // Make `userId` mandatory
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Validate a 10-digit phone number
        },
        message: "Invalid phone number",
      },
    },
    addresses: [
      {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        country: { type: String, default: "India", required: true },
        isDefault: { type: Boolean, default: false }, // Default shipping address
      },
      
    ],
    wishlist: [                                                                                                                                                                                                                                                                    
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    cart: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true, min: 1 },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    orders: [
      {
        orderId: { type: Schema.Types.ObjectId, ref: "Order" },
        status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
        purchasedAt: { type: Date, default: Date.now },
      },
    ],
    emailOtp: { 
      type: String, 
      default: null, // Will be generated when sending OTP
    },
    emailOtpExpires: { 
      type: Date, 
      default: null, // Will store expiration time of OTP
    },
    isActive: {
      type: Boolean,
      default: true, // Indicates if the user account is active
    },
    isAdmin: {
      type: Boolean,
      default: false, // Admin flag for user roles
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String,
      require:true
    }
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create the user model
const User = mongoose.model("User", UserSchema);

export default User;
