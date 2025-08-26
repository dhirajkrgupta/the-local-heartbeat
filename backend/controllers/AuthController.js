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

    res.status(201).json({ token, userId });
  } catch (err) {
    res.status(500).json({ error: "Failed to create session", details: err.message });
  }
};



export default createAnonymousSession;