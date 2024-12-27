import { registerUser,loginUser } from "../components/user.js";
import generateOtp from "../components/verifyEmail.js";
import { verifyEmailOtp } from "../components/verifyEmail.js";
import { Router } from "express";

const router=Router()


router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/otp',generateOtp)
router.post('/verify',verifyEmailOtp)

    export default router