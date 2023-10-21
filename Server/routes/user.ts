import express from "express";
import {
  changePassword,
  createUser,
  forgotPassword,
  googleLogin,
  login,
} from "../controllers/user";

const router = express.Router();
router.post("/register", createUser);
router.post("/login", login);
router.post("/googleLogin", googleLogin);
router.post("/forgotPassword", forgotPassword);
router.post("/changePassword", changePassword);

export default router;
