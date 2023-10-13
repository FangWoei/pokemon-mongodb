const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text:{
    type:String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Post = model("Post", postSchema);
module.exports = Post;
