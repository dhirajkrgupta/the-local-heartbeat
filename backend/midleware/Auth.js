import { configDotenv } from "dotenv";
configDotenv();

import jwt from "jsonwebtoken";
const JWT_SECRET=process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.userId = decoded.userId;
    next();
  });
};

export default authMiddleware;
