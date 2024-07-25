const mongoose = require("mongoose");
const Post = require("../models/postModel");

//Get all posts
const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate('createdBy', 'username').sort({ createdAt: -1 });
  res.status(200).json(posts);
};
  
// Delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;

  // Check if the id provided in the params is genuine
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await Post.findByIdAndDelete({ _id: id });

  if (!post) {
    return res.status(400).json({ error: "No such post" });
  }

  res.status(200).json(post);
};

// Update a Post
const updatePost = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }
  console.log(req.body)
  const { title, description } = req.body;

  try {
    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, description },
      { new: true } // Return the updated document
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "No such post" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllPosts, deletePost, updatePost };
