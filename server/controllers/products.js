import Products from "../models/products.js";
import User from "../models/user.js";

// Get Posts Controller
export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 6, user = "" } = req.query;
    var posts, count;
    if (user) {
      posts = await Products.find({
        user,
      })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ created_at: -1 })
        .exec();
      count = await Products.countDocuments({
        user,
      });
    } else {
      posts = await Products.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ created_at: -1 })
        .exec();
      count = await Products.countDocuments();
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
export const createProducts = async (req, res) => {
  const post = req.body;
  const image = req.file;
  let user = await User.findById(post.user);
  post.user = user.username;
  post.image = req.protocol + "://" + req.get("host") + "/" + image.path;
  const newProduct = new Products(post);
  if (post) {
    try {
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(404).json(error.message);
    }
  }
};

// Delete product

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Products.findByIdAndDelete(id);
  product.save();
  res.status(200).json({ message: "Product is deleted" });
};
