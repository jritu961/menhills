import { verifyJwtToken } from './validateToken.js';

/**
 * Authentication middleware to verify JWT token.
 * @returns {function} - Middleware function for Express routes.
 */
export const authentication = () => async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return handleError(res, 'Authentication failed: Missing Authorization header');
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the 'Bearer' header

  try {
    // Verify JWT token
    const decodedToken = verifyJwtToken(token);


    // If uid is missing in the decoded token, throw an error
    if (!decodedToken || !decodedToken.uid) {
      throw new Error('UID missing in token');
    }

    // Attach the decoded token to the request for further use
    req.user = { decodedToken, token };
    next();
  } catch (err) {
    return handleError(res, 'Authentication failed: Invalid token', err.message);
  }
};

/**
 * Standardized error handling for authentication failure.
 * @param {object} res - The Express response object.
 * @param {string} message - The error message.
 * @param {string} [errorMessage] - Additional error details (optional).
 * @returns {object} - Response with error message.
 */
const handleError = (res, message, errorMessage = '') => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  return res.status(401).json({
    success: false,
    message,
    error: errorMessage
  });
};
