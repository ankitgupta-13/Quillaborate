import jwt from 'jsonwebtoken';
export const generateToken = (userId) => {
    return jwt.sign(
        { userId: userId },
        process.env.SECRET_KEY,
        { expiresIn: '1h' } 
    );
};

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ mess: "Access denied. No token provided." });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ mess: "Invalid token." });
        }
        req.userId = decoded.userId;
        next();
    });
};