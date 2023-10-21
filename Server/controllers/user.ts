import User from "../models/User";
import { generateToken } from "../middlewares/token";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import nodeMailer from "nodemailer";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const newUser = new User({
      email: req.body.email,
      name: req.body.name,
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
    res.status(200).json({
      message: "User logged in successfully",
      token: token,
      userId: user._id,
      user: user,
    });
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
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const newUser = new User(req.body);
      await newUser.save();
      const token = generateToken(newUser._id);
      return res.status(200).json({
        user: newUser,
        token: token,
      });
    } else {
      const token = generateToken(user._id);
      return res.status(200).json({ user, token: token });
    }
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Please enter a valid email" });
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpMail(otp, email);
    return res.status(200).json({ message: "OTP sent successfully", otp: otp });
  } catch (err) {
    next(err);
  }
};

const otpMail = async (otp, receiverEmail) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  var mailOptions = {
    from: process.env.EMAIL,
    to: receiverEmail,
    subject: "Request for changing the password",
    text: `We have received a request to reset your password for [Your Company's Name] account. If you did not make this request, please disregard this email.

If you did request the password reset, please follow the instructions below to change your password:

Enter the OTP to reset your password: ${otp}
Enter your new password and confirm it.
Click the 'Reset Password' button to complete the process.`,
  };
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, newPassword } = req.body;
    console.log(newPassword);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await User.findOneAndUpdate({ email: email }, { password: hashedPassword });
    console.log(newPassword);
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    next(err);
  }
};
