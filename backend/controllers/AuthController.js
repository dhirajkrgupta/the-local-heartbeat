import { configDotenv } from "dotenv";
configDotenv();
import jwt from "jsonwebtoken";
import {v4 as uuidv4} from 'uuid';
import UserModel from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;


const createAnonymousSession = async (req, res) => {
  try {
    const userId = uuidv4();
    await UserModel.create({ userId });

    // Sign JWT with userId
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "30d" });

    res.cookie("authToken", token, {
      httpOnly: true,
      // secure: true,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to create session", details: err.message });
    console.log(err)
  }
};

// Check current session
const checkSession=(req, res) => {
  const token = req.cookies.authToken;
  if (!token) return res.json({ authenticated: false });

  jwt.verify(token, JWT_SECRET, (err) => {
    if (err) return res.json({ authenticated: false });
    res.json({ authenticated: true }); 
  });
}



export  {createAnonymousSession,checkSession};