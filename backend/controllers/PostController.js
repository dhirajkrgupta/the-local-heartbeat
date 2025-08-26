import PostModel from "../models/Post.js";

const CreatePost = async (req, res) => {
  try {
    const {
      content,
      hub,
      displayHandle,
      userId,
      editToken,
      lat,
      long,
      ttlMinutes,
    } = req.body;
    const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);
    const post = new PostModel({
      content,
      hub,
      displayHandle,
      userId,
      editToken,
      location: { type: "Point", coordinates: [long, lat] },
      expiresAt,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create post", details: err.message });
  }
};

const GetNearbyPost = async (req, res) => {
  try {
    const { lat, lng, radiusMeters = 2000, hub } = req.query;
    
    const query = {
      expiresAt: { $gt: new Date() },
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(radiusMeters)
        }
      }
    };
    if (hub) query.hub = hub;
    const posts = await PostModel.find(query).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch  nearby posts", details: err.message });
  }
};

export { CreatePost, GetNearbyPost };
