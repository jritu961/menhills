import { registerUser,loginUser } from "../controller/user.js";
import generateOtp from "../controller/verifyEmail.js";
import { verifyEmailOtp } from "../controller/verifyEmail.js";
import { Router } from "express";

const router=Router()

router.post('/v1/register',registerUser)
router.post('/v1/login',loginUser)
router.post('/v1/otp',generateOtp)
router.post('/v1/verify',verifyEmailOtp)



export default router