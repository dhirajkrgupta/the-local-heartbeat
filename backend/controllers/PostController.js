import PostModel from "../models/Post.js";
import { v4 as uuidv4 } from "uuid";

const CreatePost = async (req, res) => {
  try {
    const { content, hub, location, expiresInHours } = req.body;
    const editToken = uuidv4();
    const expiresAt = new Date(Date.now() + expiresInHours * 3600 * 1000);

    const newPost = await Post.create({
      content,
      hub,
      location,
      displayHandle: generateRandomHandle(),   //TODO:write this function to generate random username
      userId: req.userId, // comes from authMiddleware
      editToken,
      expiresAt,
    });

    res.status(201).json({ post: newPost, editToken }); // return editToken to client
  } catch (error) {
    res
          res.status(500).json({ error: "Failed to create post", details: error.message });

  }
};

const GetNearbyPost = async (req, res) => {
  try {
    const { lat, lng, radiusMeters = 2000, hub } = req.query;

    const query = {
      expiresAt: { $gt: new Date() },
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
    if (hub) query.hub = hub;
    const posts = await PostModel.find(query).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch  nearby posts", details: error.message });
      console.log(error)
  }
};

const ToggleReaction = async (req, res) => {
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
        post.reactions.set(
          currentReaction,
          (post.reactions.get(currentReaction) || 1) - 1
        );
      }
      post.reactions.set(emoji, (post.reactions.get(emoji) || 0) + 1);
      post.userReactions.set(userId, emoji);
    }
    await post.save();
    res
      .status(200)
      .json({ reactions: post.reactions, userReactions: post.userReactions });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to toggle reaction", details: error.message });
  }
};

const EditPost=async(req,res)=>{
  try {
    const { postId } = req.params;
    const { newContent, editToken } = req.body;
    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.userId !== req.userId || post.editToken !== editToken) {
      return res.status(403).json({ error: "Not authorized to edit this post" });
    }

    post.content = newContent;
    await post.save();
    res.status(200).json({ message: "Post updated", post });

  } catch (error) {
    res.status(500).json({ error: "Failed to edit post", details: err.message });
  }
}

const DeletePost=async(req,res)=>{
  try {
    const { postId } = req.params;
    const { editToken } = req.body;
    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.userId !== req.userId || post.editToken !== editToken) {
      return res.status(403).json({ error: "Not authorized to delete this post" });
    }
    await post.deleteOne();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post", details: error.message });

  }
}

export { CreatePost, GetNearbyPost, ToggleReaction,EditPost,DeletePost };
