const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // בדוק אם יש את ה-token ב-cookie או ב-Authorization header
    const token = req.cookies.userToken || req.headers.authorization?.split(" ")[1];
    console.log("token from cookies:", req.cookies.userToken);
    console.log("token from headers:", req.headers.authorization);
    console.log("resolved token:", token);

    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // שמור את המידע המפוענח לשימוש מאוחר יותר
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
