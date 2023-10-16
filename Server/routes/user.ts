import express from "express";
import { createUser, googleLogin, login } from "../controllers/user";

const router = express.Router();
router.post("/register", createUser);
router.post("/login", login);
router.post("/googlelogin", googleLogin);

export default router;
