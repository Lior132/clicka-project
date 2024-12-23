const jwt = require('jsonwebtoken');
const axios = require('axios');

const authMiddleware = async (req, res, next) => {
    try {
        // בדוק אם יש את ה-token ב-cookie או ב-Authorization header
        const token = req.cookies?.userToken || req.headers.authorization?.split(" ")[1];
        console.log("Resolved token:", token);

        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        // אימות טוקן (תמיכה ב-RS256 אם נדרש)
        let decoded;
        if (process.env.JWT_ALGORITHM === 'RS256') {
            // הורדת המפתחות הציבוריים (לדוגמה, מ-Firebase)
            const FIREBASE_PUBLIC_KEYS_URL =
                'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';

            const response = await axios.get(FIREBASE_PUBLIC_KEYS_URL);
            const publicKeys = response.data;

            const decodedHeader = jwt.decode(token, { complete: true });
            const kid = decodedHeader?.header?.kid;

            if (!kid || !publicKeys[kid]) {
                return res.status(401).json({ message: "Invalid token: Key ID not found" });
            }

            const publicKey = publicKeys[kid];
            decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        } else {
            // שימוש ב-HS256 עם מפתח סודי
            decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
        }

        req.user = decoded; // שמור את המידע המפוענח לשימוש מאוחר יותר
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
