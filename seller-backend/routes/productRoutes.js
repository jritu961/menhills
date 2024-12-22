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
import {registerUser} from "../controllers/sighup.js"
import {signInDAta} from "../controllers/signin.js"
const router = express.Router();

// Routes for product operations
router.post("/signup", registerUser);  // Add a new product
router.post("/signin", signInDAta);  // Add a new product

router.post("/products", addProduct);  // Add a new product
router.get("/products", getAllProducts);  // Get all products
router.get("/products/:id", getProductById);  // Get a single product by ID
router.put("/products/:id", updateProduct);  // Update a product by ID
router.delete("/products/:id", deleteProduct);  // Delete a product by ID
router.get("/products/category/:category", getProductsByCategory);  // Get products by category
router.get("/products/price-range", getProductsByPriceRange);  // Get products within a price range

export default router;
