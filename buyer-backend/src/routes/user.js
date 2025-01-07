import { registerUser,loginUser } from "../controller/user.js";
import generateOtp from "../controller/verifyEmail.js";
import { verifyEmailOtp } from "../controller/verifyEmail.js";
import { Router } from "express";
import { createOrder,verifyPayment } from "../controller/payment.js";
import { getOrdersHandler } from "../controller/order.js";
import { confirmOrder } from "../controller/confirm.js";
import {authentication} from "../authentication/authenticator.js"
const router=Router()




router.get('/v1/orderdetails', getOrdersHandler);
router.post('/v1/confirm', confirmOrder);

router.post('/v1/register',registerUser)
router.post('/v1/login',loginUser)
router.post('/v1/otp',generateOtp)
router.post('/v1/verify',verifyEmailOtp)

router.post('/v1/create-order',authentication(),createOrder)
router.post('/v1/verify-payment',verifyPayment)




export default router