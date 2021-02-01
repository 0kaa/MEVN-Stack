import Post from "../models/post.js";
import User from "../models/user.js";

// Get Posts Controller
export const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 6, user = "" } = req.query;
    var posts, count;
    if (user) {
      posts = await Post.find({
        user,
      })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ created_at: -1 })
        .exec();
      count = await Post.countDocuments({
        user,
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
      allPosts: count,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create Post Controller
export const createPost = async (req, res) => {
  const post = req.body;

  let user = await User.findById(post.user);
  post.user = user.username;
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

// Like Post Controller
export const likePost = async (req, res) => {
  const { id, vote_type, user_id } = req.body;
  const user = await User.findById(user_id);

  const post = await Post.findById(id);
  const other_type = vote_type === "like" ? "dislike" : "like";
  const oldRequest = post.votes[vote_type];
  const otherRequest = post.votes[other_type];

  if (!oldRequest.includes(user.id)) {
    oldRequest.push(user.id);
  } else {
    oldRequest.splice(oldRequest.indexOf(user.id));
  }

  if (otherRequest.includes(user.id)) {
    otherRequest.splice(otherRequest.indexOf(user.id));
  }
  await post.save();
  res.status(200).json(post);
};

export const ratingPost = async (req, res) => {
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;
  const rating = req.body.rating;
  const post = await Post.findById(post_id);
  const user = await User.findById(user_id);
  const userRating = {
    user: user.username,
    rating,
  };

  post.ratingByUser.push(userRating);
  post.ratings.push(rating);

  const grades = post.ratings;

  function getAvg(grades) {
    const total = grades.reduce((acc, c) => acc + c, 0);
    return total / grades.length;
  }

  const average = getAvg(grades);
  post.avgRating = average;
  await post.save();
  res.status(200).json(post);
};
