const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Post = model("Post", postSchema);
module.exports = Post;
