"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// export const SECRET_KEY: Secret = process.env.JWT;
const generateToken = (userId) => {
    const payload = {
        userId: userId,
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT, { expiresIn: "1h" });
};
exports.generateToken = generateToken;
// export const authenticateToken = (req, res, next) => {
//   const token = req.headers["authorization"];
//   if (!token) {
//     return res.status(401).json({ mess: "Access denied. No token provided." });
//   }
//   jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ mess: "Invalid token." });
//     }
//     req.userId = decoded.userId;
//     next();
//   });
// };
