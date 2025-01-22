import { registerUser,loginUser } from "../controller/user.js";
import generateOtp from "../controller/verifyEmail.js";
import { verifyEmailOtp } from "../controller/verifyEmail.js";
import { Router } from "express";
import { createOrder,verifyPayment } from "../controller/payment.js";
import { getOrdersHandler,getSingleOrdersHandler } from "../controller/order.js";
import { confirmOrder } from "../controller/confirm.js";
import {authentication} from "../authentication/authenticator.js"
import { userDetails } from "../controller/user.js";
import multer from "multer";
const router=Router()
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/v1/register',upload.single('image'),registerUser)

router.get('/v1/order',authentication(), getOrdersHandler);
router.get('/v1/order/:id',authentication(), getSingleOrdersHandler);

router.post('/v1/confirm', confirmOrder);
router.get('/v1/user/details',authentication(),userDetails)

router.post('/v1/login',loginUser)
router.post('/v1/otp',generateOtp)
router.post('/v1/verify',verifyEmailOtp)
router.post('/v1/create-order',authentication(),createOrder)
router.post('/v1/verify-payment',verifyPayment)




export default router