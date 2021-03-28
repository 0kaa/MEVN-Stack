import Products from "../models/products.js";
import User from "../models/user.js";
import fs from "fs";

// Get Posts Controller
export const getProducts = async (req, res) => {
  return Products.find();
  // try {
  //   const { page = 1, limit = 6, user = "" } = req.query;
  //   var products, count;
  //   if (user) {
  //     products = await Products.find({
  //       user,
  //     })
  //       .limit(limit * 1)
  //       .skip((page - 1) * limit)
  //       .sort({ created_at: -1 })
  //       .exec();
  //     count = await Products.countDocuments({
  //       user,
  //     });
  //   } else {
  //     products = await Products.find()
  //       .limit(limit * 1)
  //       .skip((page - 1) * limit)
  //       .sort({ created_at: -1 })
  //       .exec();
  //     count = await Products.countDocuments();
  //   }

  //   res.status(200).json({
  //     products,
  //     totalPages: Math.ceil(count / limit),
  //     currentPage: parseInt(page),
  //     allPosts: count,
  //   });
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }
};

// Create Post Controller
export const createProduct = async (req, res) => {
  const post = req.body;
  const image = req.file;
  let user = await User.findById(post.user);
  const count = await Products.countDocuments();
  post.user = {
    _id: user._id,
    name: user.username,
  };
  if (image) {
    post.image = req.protocol + "://" + req.get("host") + "/" + image.path;
  } else {
    res.status(404).json({ message: "Image Required" });
  }
  const newProduct = new Products(post);
  if (post) {
    try {
      await newProduct.save();
      res.status(201).json({ products: newProduct, products_count: count });
    } catch (error) {
      res.status(404).json(error.message);
    }
  }
};

// Delete product

export const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findOne({ _id: req.params.id });
    const image = product.image;
    const oldImage = image.slice(image.indexOf("uploads"));
    fs.unlinkSync(oldImage);
    product.delete();
    res.status(200).json({ message: `product is deleted` });
  } catch (error) {
    res.status(404).json(error);
  }
};
