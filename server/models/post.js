import mongoose from "mongoose";

var postSchema = mongoose.Schema({
  author_name: { type: String, required: true },
  created_at: { type: Date, default: new Date() }
});

var Post = mongoose.model("Posts", postSchema);

export default Post;
