import Post from "../models/post.js";

export const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query;
    const posts = await Post.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Post.countDocuments();

    res.status(200).json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      allPosts: count
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post(post);
  if (post) {
    try {
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(404).json(error.message);
    }
  }
};

export const likePost = async (req, res) => {};
