const express = require("express");
const router = express.Router();

const Pokemon = require("../models/poke");

const authMiddleware = require("../middleware/auth");
const isAdminMiddleware = require("../middleware/isAdmin");
const Favorite = require("../models/favorite");

router.get("/", async (req, res) => {
  try {
    const { type } = req.query;
    let filter = {};
    if (type) {
      filter.type = type;
    }
    res.status(200).send(await Pokemon.find(filter));
  } catch (error) {
    res.status(400).send({ message: "Pokemon not found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Pokemon.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Pokemon id not found" });
  }
});

router.post("/", isAdminMiddleware, async (req, res) => {
  try {
    const newPokemon = new Pokemon({
      name: req.body.name,
      ip: req.body.ip,
      type: req.body.type,
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
      speed: req.body.speed,
      image: req.body.image,
    });
    await newPokemon.save();
    res.status(200).send(newPokemon);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const pokemon_id = req.params.id;

    const updatedPokemon = await Pokemon.findByIdAndUpdate(
      pokemon_id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).send(updatedPokemon);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const pokemon_id = req.params.id;
    const deletePoke = await Pokemon.findByIdAndDelete(pokemon_id);
    await Favorite.deleteMany({pokemon:pokemon_id})
    res.status(200).send(deletePoke);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
