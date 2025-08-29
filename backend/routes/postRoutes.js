import express from 'express';
const router=express.Router();
import {CreatePost,GetNearbyPost,ToggleReaction,EditPost,DeletePost} from '../controllers/PostController.js';
import authMiddleware from '../midleware/Auth.js';



// Create post 
router.post('/',authMiddleware,CreatePost);

//Get nearby post:
router.get('/nearby',authMiddleware,GetNearbyPost)

//Togle reaction
router.post("/:postId/react",authMiddleware,ToggleReaction);

//edit post
router.put("/:postId", authMiddleware, EditPost);

//delete post
router.delete("/:postId", authMiddleware, DeletePost);

export default router;