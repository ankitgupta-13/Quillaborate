import jwt, { Secret, JwtPayload } from "jsonwebtoken";

// export const SECRET_KEY: Secret = process.env.JWT;

export const generateToken = (userId) => {
  const payload: JwtPayload = {
    userId: userId,
  };
  return jwt.sign(payload, process.env.JWT , { expiresIn: "1h" });
};

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
