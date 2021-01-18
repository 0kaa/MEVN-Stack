import Post from "../models/post.js";
import User from "../models/user.js";

export const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 6, user = "" } = req.query;
    var posts, count;
    if (user) {
      posts = await Post.find({
        user
      })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ created_at: -1 })
        .exec();
      count = await Post.countDocuments({
        user
      });
    } else {
      posts = await Post.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ created_at: -1 })
        .exec();
      count = await Post.countDocuments();
    }

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

  let user = await User.findById(post.user);
  post.user = user.username;
  console.log(post);
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
