import User from "../model/usermodel"
import crypto from 'crypto';

const generateOtp = async (userId) => {
  // Generate a 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString(); 

  // Get the current user from the database
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  // Set OTP expiration time (e.g., 5 minutes from now)
  const otpExpires = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

  // Save the OTP and expiration time to the user's document
  user.emailOtp = otp;
  user.emailOtpExpires = otpExpires;

  // Save the user document
  await user.save();

  return otp; // Return OTP to send to the user
};

export default generateOtp;




export const verifyEmailOtp=()=>{
 
}