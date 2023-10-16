"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.generateToken = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET_KEY = process.env.JWT;
const generateToken = (userId) => {
    const payload = {
        userId: userId,
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT, { expiresIn: "1h" });
};
exports.generateToken = generateToken;
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ mess: "Access denied. No token provided." });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT, (err, decoded) => {
        if (err) {
            return res.status(403).json({ mess: "Invalid token." });
        }
        req.userId = decoded.userId;
        next();
    });
};
exports.authenticateToken = authenticateToken;
