import PostModel from "../models/Post.js";

import { generateUsername } from "unique-username-generator";

const CreatePost = async (req, res) => {
  try {
    const { content, hub, location, expiresInHours } = req.body;

    const expiresAt = new Date(Date.now() + expiresInHours * 3600 * 1000);

    const newPost = await PostModel({
      content,
      hub,
      location,
      displayHandle: generateUsername(),
      userId: req.userId, // comes from authMiddleware
      expiresAt,
    });
    await newPost.save();
    let feed = {
      id: newPost.id,
      content: newPost.content,
      isOwner: newPost.userId === req.userId,
      displayHandle: newPost.displayHandle,
      createdAt: newPost.createdAt,
    };

    res.status(201).json({ feed });
  } catch (err) {
    console.error("Error creating post:", err);
    res
      .status(500)
      .json({ error: "Failed to create post", details: err.message });
  }
};

const GetNearbyPost = async (req, res) => {
  try {
    const { lat, lng, radiusMeters = 2000, hub } = req.query;
    console.log(lat, lng, radiusMeters);

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
    const posts = await PostModel.find(query);
    const feed = posts.map((p) => ({
      id: p.id,
      content: p.content,
      isOwner: p.userId === req.userId,
      displayHandle: p.displayHandle,
      createdAt: p.createdAt,
    }));
    res.json(feed);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch  nearby posts", details: error.message });
    console.log(error);
  }
};

const ToggleReaction = async (req, res) => {
  try {
    const { postId } = req.params;
    const { emoji } = req.body;
    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });
    const currentReaction = post.userReactions.get(req.userId);

    if (currentReaction === emoji) {
      // User already reacted with this emoji → remove it
      post.reactions.set(emoji, (post.reactions.get(emoji) || 1) - 1);
      post.userReactions.delete(req.userId);
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

const EditPost = async (req, res) => {
  try {
    const { content } = req.body;
    const {postId} = req.params;
    let post = await PostModel.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.userId !== req.userId) {
      return res.status(403).json({ error: "Not allowed" });
    }

    post.content = content;
    await post.save();
    res.status(200).json({ message: "Post edited successfully" });
    console.log('updated');
  } catch (err) {
    console.error("Error updating post:", err);
    res
      .status(500)
      .json({ error: "Failed to update post", details: err.message });
  }
};

const DeletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    let post = await PostModel.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.userId !== req.userId) {
      return res.status(403).json({ error: "Not allowed" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res
      .status(500)
      .json({ error: "Failed to delete post", details: err.message });
  }
};

export { CreatePost, GetNearbyPost, ToggleReaction, EditPost, DeletePost };
