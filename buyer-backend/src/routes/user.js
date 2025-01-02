import { registerUser,loginUser } from "../controller/user.js";
import generateOtp from "../controller/verifyEmail.js";
import { verifyEmailOtp } from "../controller/verifyEmail.js";
import { Router } from "express";
import { createOrder } from "../controller/payment.js";
const router=Router()

router.post('/v1/register',registerUser)
router.post('/v1/login',loginUser)
router.post('/v1/otp',generateOtp)
router.post('/v1/verify',verifyEmailOtp)
router.post('/v1/create-order',createOrder)



export default router