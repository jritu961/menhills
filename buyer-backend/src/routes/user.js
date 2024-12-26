import { registerUser } from "../components/user.js";
import { Router } from "express";

const router=Router()


router.post('/register',registerUser)

    export default router