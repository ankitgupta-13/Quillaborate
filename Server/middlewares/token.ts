import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
export const SECRET_KEY: Secret = process.env.JWT;

export const generateToken = (userId) => {
  const payload: JwtPayload = {
    userId: userId,
  };
  return jwt.sign(payload, process.env.JWT, { expiresIn: "1h" });
};

interface CustomRequest extends Request {
  userId?: string; // Define the userId property on the Request object
}

export const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ mess: "Access denied. No token provided." });
  }
  jwt.verify(token, process.env.JWT, (err, decoded: JwtPayload) => {
    if (err) {
      return res.status(403).json({ mess: "Invalid token." });
    }
    req.userId = decoded.userId;
    next();
  });
};
