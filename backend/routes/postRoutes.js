import express from 'express';
const router=express.Router();
import {CreatePost,GetNearbyPost,ToggleReaction} from '../controllers/PostController.js';


// Create post
router.post('/',CreatePost);

//Get nearby post:
router.get('/nearby',GetNearbyPost)

//Togle reaction
router.post("/:postId/react",ToggleReaction);


export default router;