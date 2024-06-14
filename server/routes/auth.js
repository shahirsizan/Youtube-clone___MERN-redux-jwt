import express from "express";
import {} from "../controllers/auth.js";
import { signup } from "../controllers/auth.js";

const router = express.Router();

//CREATE A USER
router.post("/signup", signup);

//SIGN IN
// router.post("/signin", signin);

//GOOGLE AUTH
// router.post("/google", googleAuth);

export default router;
