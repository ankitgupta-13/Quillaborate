"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.forgotPassword = exports.googleLogin = exports.login = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const token_1 = require("../middlewares/token");
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        const newUser = new User_1.default({
            email: req.body.email,
            name: req.body.name,
            password: yield bcrypt_1.default.hash(req.body.password, salt),
        });
        yield newUser.save();
        res.status(200).send("User has been created");
    }
    catch (err) {
        next(err);
    }
});
exports.createUser = createUser;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const passwordCheck = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = (0, token_1.generateToken)(user._id);
        res.status(200).json({
            message: "User logged in successfully",
            token: token,
            userId: user._id,
            user: user,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.login = login;
const googleLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user) {
            const newUser = new User_1.default(req.body);
            yield newUser.save();
            const token = (0, token_1.generateToken)(newUser._id);
            return res.status(200).json({
                user: newUser,
                token: token,
            });
        }
        else {
            const token = (0, token_1.generateToken)(user._id);
            return res.status(200).json({ user, token: token });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.googleLogin = googleLogin;
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "Please enter a valid email" });
        const otp = Math.floor(100000 + Math.random() * 900000);
        otpMail(otp, email);
        return res.status(200).json({ message: "OTP sent successfully", otp: otp });
    }
    catch (err) {
        next(err);
    }
});
exports.forgotPassword = forgotPassword;
const otpMail = (otp, receiverEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
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
    yield transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Email sent: " + info.response);
        }
    });
});
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, newPassword } = req.body;
        console.log(newPassword);
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, salt);
        yield User_1.default.findOneAndUpdate({ email: email }, { password: hashedPassword });
        console.log(newPassword);
        return res.status(200).json({ message: "Password changed successfully" });
    }
    catch (err) {
        next(err);
    }
});
exports.changePassword = changePassword;
