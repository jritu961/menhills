import User from "../model/usermodel.js";
import crypto from "crypto";
import sendEmail from "../utils/nodemailer.js"
/**
 * Generate a 6-digit OTP for email verification.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const generateOtp = async (req, res) => {
  try {
    const { userId } = req.query; // Correcting from `req.param` to `req.params`
    console.log("🚀 ~ generateOtp ~ userId:", userId);

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    console.log("🚀 ~ generateOtp ~ userId:", userId);

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Get the current user from the database
    const user = await User.findById(userId);
    console.log("🚀 ~ generateOtp ~ user:", user)
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Set OTP expiration time (e.g., 5 minutes from now)
    const otpExpires = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

    // Save the OTP and expiration time to the user's document
    user.emailOtp = otp;
    user.emailOtpExpires = otpExpires;

    await user.save(); // Save the updated user document
    console.log("🚀 ~ generateOtp ~ user:39", user)

    await sendEmail(
      user.email,  // 'to' address
      'OTP FROM Menhills Registration',  // Subject
      `OTP for Menhills registration is ${otp}`,  // Text body
      ''  // HTML body (optional, leave empty if not needed)
    );
    
    console.log("OTP generated successfully:", otp);
    return res.status(200).json({ message:"OTP generated successfully:" });
  } catch (error) {
    console.error("Error generating OTP:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

/**
 * Verify the OTP for email verification.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const verifyEmailOtp = async (req, res, next) => {
  try {
    const { userId, otp } = req.query; // Access `userId` and `otp` from query parameters

    // Validate `userId` and `otp`
    if (!userId || !otp) {
      return res.status(400).json({ error: 'User ID and OTP are required' });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the OTP matches and is not expired
    if (user.emailOtp !== otp || user.emailOtpExpires < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Clear the OTP fields after successful verification
    user.emailOtp = undefined;
    user.emailOtpExpires = undefined;
    await user.save();

    // Respond with success
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the error-handling middleware
  }
};

export default generateOtp;
