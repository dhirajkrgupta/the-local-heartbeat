import express from 'express';
const router=express.Router();
import {CreatePost,GetNearbyPost,ToggleReaction} from '../controllers/PostController.js';
import authMiddleware from '../midleware/Auth.js';


// Create post
router.post('/',authMiddleware,CreatePost);

//Get nearby post:
router.get('/nearby',GetNearbyPost)

//Togle reaction
router.post("/:postId/react",authMiddleware,ToggleReaction);


export default router;