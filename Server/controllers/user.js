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
exports.resetPassword = exports.googleLogin = exports.login = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const token_1 = require("../middlewares/token");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const salt = yield bcrypt_1.default.genSalt(10);
        const newUser = new User_1.default({
            email: req.body.email,
            name: req.body.name,
            password: yield bcrypt_1.default.hash(req.body.password, salt),
        });
        console.log(req.body);
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
        console.log(req.body);
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
        res
            .status(200)
            .json({ message: "User logged in successfully", token: token });
    }
    catch (err) {
        next(err);
    }
});
exports.login = login;
const googleLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, avatar, googleId } = req.body;
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            const newUser = new User_1.default({
                email: email,
                username: username,
                avatar: avatar,
                googleId: googleId,
            });
            yield newUser.save();
            const token = (0, token_1.generateToken)(newUser._id);
            return res.status(200).json({
                message: "User logged in successfully",
                newUser,
                token: token,
            });
        }
        else {
            const token = (0, token_1.generateToken)(user._id);
            return res
                .status(200)
                .json({ message: "User logged in successfully", user, token: token });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.googleLogin = googleLogin;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "Please enter a valid email" });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.resetPassword = resetPassword;
