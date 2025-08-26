import express from 'express';
const router=express.Router();
import {CreatePost,GetNearbyPost} from '../controllers/PostController.js';


// Create post
router.post('/',CreatePost);

//Get nearby post:
router.get('/nearby',GetNearbyPost)

export default router;