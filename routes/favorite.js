const express = require("express");
const router = express.Router();

const Favorite = require("../models/favorite");

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
      .send(await Favorite.find(filter).populate("pokemon").sort({ _id: -1 }));
  } catch (error) {
    res.status(400).send({ message: "Favorite not found" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const data = await Favorite.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Favorite not found" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const newFavorite = new Favorite({
      user: req.user._id,
      pokemon: req.body.pokemon,
    });
    await newFavorite.save();
    res.status(200).send(newFavorite);
  } catch (error) {
    res.status(400).send({
      message: error._message,
    });
  }
});

router.delete("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const favorite_id = req.params.id;
    const deletefav = await Favorite.findByIdAndDelete(favorite_id);
    res.status(200).send(deletefav);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});
module.exports = router;
