import { registerUser,loginUser } from "../components/user.js";
import generateOtp from "../components/verifyEmail.js";
import { verifyEmailOtp } from "../components/verifyEmail.js";
import { Router } from "express";
import { addItemToCart,getCartItems,updateCartItem,removeCartItem,clearCart } from "../components/cart.js";
import multer from "multer";

const router=Router()
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/cart/add',upload.single('image'), addItemToCart);
router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/otp',generateOtp)
router.post('/verify',verifyEmailOtp)

router.get('/cart', getCartItems);
router.put('/cart/update/:id', updateCartItem);
router.delete('/cart/remove/:id', removeCartItem);
router.delete('/cart/clear', clearCart);



export default router