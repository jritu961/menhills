import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a transporter using your email provider's SMTP details
const transporter = nodemailer.createTransport({
  service: 'gmail',  // or use SMTP settings for other services
  auth: {
    user: process.env.EMAIL_USER,  // Your email address
    pass: process.env.EMAIL_PASS,  // Your email password (use an App Password for Gmail)
  },
});

// Send email function
const sendEmail = async (to, subject, text, html) => {
  console.log("🚀 ~ sendEmail ~ text:", text);
  console.log("🚀 ~ sendEmail ~ subject:", subject);
  console.log("🚀 ~ sendEmail ~ email:", to);
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,  // Sender address
      to: to,  // Recipient's email address
      subject: subject,  // Subject line
      text: text,  // Plain text body
      html: html,  // HTML body (optional)
    });
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Example usage
export default sendEmail;
