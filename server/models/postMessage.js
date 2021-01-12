import mongoose from "mongoose";

var postSchema = mongoose.Schema({
  author_name: String
});

var PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
