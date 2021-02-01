import mongoose from "mongoose";

const productsSchema = mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  user: { type: String },
  created_at: { type: Date, default: new Date() },
  votes: {
    like: { type: Array, default: [] },
    dislike: { type: Array, default: [] },
  },
  //   ratings: { type: Array, default: [] },
  //   ratingByUser: { type: Array, default: [] },
  //   avgRating: { type: Number, default: 0 },
});

const Products = mongoose.model("Products", productsSchema);

export default Products;
