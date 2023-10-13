const express = require("express");
const router = express.Router();

const Post = require("../models/post");

const authMiddleware = require("../middleware/auth");
const isAdminMiddleware = require("../middleware/isAdmin");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    if (status) {
      filter.status = status;
    }
    if (req.user && req.user.role === "user") {
      filter.customerEmail = req.user.email;
    }
    res
      .status(200)
      .send(await Post.find(filter).populate("post").sort({ _id: -1 }));
  } catch (error) {
    res.status(400).send({ message: "Post not found" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const data = await Post.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Post not found" });
  }
});

router.post("/", isAdminMiddleware, async (req, res) => {
  try {
    const newPost = new Post({
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      title: req.body.title,
      text: req.body.text,
      image: req.body.image,
    });
    await newPost.save();
    res.status(200).send(newPost);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const post_id = req.params.id;
    const deletePost = await Post.findByIdAndDelete(post_id);
    res.status(200).send(deletePost);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
