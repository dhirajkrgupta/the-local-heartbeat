import express from "express";
import createAnonymousSession from "../controllers/AuthController.js";
const router = express.Router();


router.post("/session", createAnonymousSession);

export default router;
