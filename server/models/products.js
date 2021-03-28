import mongoose from "mongoose";

const productsSchema = mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  user: {
    _id: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  created_at: { type: Date, default: new Date() },
  votes: {
    like: { type: Array, default: [] },
    dislike: { type: Array, default: [] },
  },
});

const Products = mongoose.model("Products", productsSchema);

export default Products;
