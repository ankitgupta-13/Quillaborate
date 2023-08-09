import User from "../models/User";
import { generateToken } from "../middlewares/token";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, salt),
    });
    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = generateToken(user._id);
    res
      .status(200)
      .json({ message: "User logged in successfully", token: token });
  } catch (err) {
    next(err);
  }
};

export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, username, avatar, googleId } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      const newUser = new User({
        email: email,
        username: username,
        avatar: avatar,
        googleId: googleId,
      });
      await newUser.save();
      const token = generateToken(newUser._id);
      return res.status(200).json({
        message: "User logged in successfully",
        newUser,
        token: token,
      });
    } else {
      const token = generateToken(user._id);
      return res
        .status(200)
        .json({ message: "User logged in successfully", user, token: token });
    }
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({email:email})
    if(!user){
      return res.status(404).json({message:"Please enter a valid email"})
    }
    
  } catch (err) {
    next(err);
  }
};
