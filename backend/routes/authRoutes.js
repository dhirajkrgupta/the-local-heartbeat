import express from "express";
import {createAnonymousSession,checkSession} from "../controllers/AuthController.js";
const router = express.Router();



router.post("/session", createAnonymousSession);
router.get("/me",checkSession ) 
export default router;
