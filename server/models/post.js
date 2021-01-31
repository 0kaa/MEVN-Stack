import mongoose from "mongoose";
var postSchema = mongoose.Schema({
  author_name: { type: String, required: true },
  user: { type: String },
  created_at: { type: Date, default: new Date() },
  votes: {
    like: { type: Array, default: [] },
    dislike: { type: Array, default: [] }
  },
  ratings: { type: Array, default: [] },
  ratingByUser: { type: Array, default: [] },
  avgRating: { type: Number, default: 0 }
});

var Post = mongoose.model("Posts", postSchema);

export default Post;
