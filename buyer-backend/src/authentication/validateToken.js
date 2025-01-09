import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../authentication/error.js'; // Custom error class for unauthenticated users

const JWT_SECRET = process.env.JWT_SECRET || 'ritujaiswal';

/**
 * Verifies the JWT token.
 * @param {string} token - The JWT token.
 * @param {string} secretKey - The secret key used to verify the token.
 * @returns {object} - The decoded token.
 */
export const verifyJwtToken = (token, secretKey = JWT_SECRET) => {
  try {

    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new UnauthenticatedError('Invalid or expired token');
  }
};
