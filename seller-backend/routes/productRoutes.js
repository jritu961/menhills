import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByPriceRange
} from "../controllers/productController.js"; // Import controller functions
import {registerUser} from "../controllers/signup.js"
import {signInDAta} from "../controllers/signin.js"
import multer from "multer";
const router = express.Router();
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });
router.post("/products",upload.array('images', 5), addProduct);  // Add a new product

// Routes for product operations
router.post("/signup", registerUser);  // Add a new product
router.post("/signin", signInDAta);  // Add a new product

router.get("/products", getAllProducts);  // Get all products
router.get("/products/:id", getProductById);  // Get a single product by ID
router.put("/products/:id", updateProduct);  // Update a product by ID
router.delete("/products/:id", deleteProduct);  // Delete a product by ID
router.get("/products/category/:category", getProductsByCategory);  // Get products by category
router.get("/products/price-range", getProductsByPriceRange);  // Get products within a price range

export default router;
