import EventModel from "../models/Event.js";

const createEvent = async (req, res) => {
  try {
    // console.log('Request body:', req.body);
    const { title, description, startTime, endTime,location } = req.body;

    const e = await EventModel({
      title,
      description,
      startTime,
      endTime,
      location,
      userId: req.userId
    });
    await e.save();
    let feed = {
      id: e.id,
      title: e.title,
      description: e.description,
      startTime: e.startTime,
      endTime: e.endTime,
      isOwner: e.userId === req.userId,
      interested: e.interested,
      createdAt: e.createdAt,
    };
    
    res.status(201).json({ feed });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const { lat, lng, radiusMeters = 2000 } = req.query;
    console.log(lat, lng, radiusMeters);

    const query = {
      startTime: { $gt: new Date() },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseInt(radiusMeters),
        },
      },
    };
    const events = await EventModel.find(query);
    const feed = events.map((e) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      startTime: e.startTime,
      endTime: e.endTime,
      isOwner: e.userId === req.userId,
      interested: e.interested,
      createdAt: e.createdAt,
    }));
    res.json(feed);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await EventModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await EventModel.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const rsvpEvent = async (req, res) => {
  try {
    
    const event = await EventModel.findById(req.params.id);
    console.log(event);
    if (!event) return res.status(404).json({ error: "Event not found" });
    event.interested += req.body.vote;
    await event.save();
    
    res.status(200).json({ message: "RSVP successful", interested: event.interested });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { createEvent, getEvents, updateEvent, deleteEvent, rsvpEvent };
