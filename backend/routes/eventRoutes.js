import express from 'express';
const router=express.Router();
import {createEvent, getEvents, updateEvent, deleteEvent, rsvpEvent} from '../controllers/EventsController.js';
import authMiddleware from '../midleware/Auth.js';



// Create Event
router.post('/',authMiddleware,createEvent);
//Get all events
router.get('/',authMiddleware,getEvents);
//rsvp event
router.post('/:id/rsvp',authMiddleware,rsvpEvent);
//update event
router.put('/:id',authMiddleware,updateEvent);
//delete event
router.delete('/:id',authMiddleware,deleteEvent);

export default router;