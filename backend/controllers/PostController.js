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

const ToggleReaction=async(req,res)=>{
  try {
    const { postId } = req.params;
    const { emoji, userId } = req.body;
    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });
    const currentReaction = post.userReactions.get(userId);

    if (currentReaction === emoji) {
      // User already reacted with this emoji → remove it
      post.reactions.set(emoji, (post.reactions.get(emoji) || 1) - 1);
      post.userReactions.delete(userId);
    } else {
      // If reacted with a different emoji → remove old, add new
      if (currentReaction) {
        post.reactions.set(currentReaction, (post.reactions.get(currentReaction) || 1) - 1);
      }
      post.reactions.set(emoji, (post.reactions.get(emoji) || 0) + 1);
      post.userReactions.set(userId, emoji);
    }
    await post.save();
    res.status(200).json({ reactions: post.reactions, userReactions: post.userReactions });

  } catch (error) {
        res.status(500).json({ error: "Failed to toggle reaction", details: err.message });

  }
}

export { CreatePost, GetNearbyPost,ToggleReaction};
