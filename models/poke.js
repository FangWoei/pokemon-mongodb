const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const pokeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  ip: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "Normal",
      "Fire",
      "Water",
      "Grass",
      "Flying",
      "Fighting",
      "Poison",
      "Electric",
      "Ground",
      "Rock",
      "Psychic",
      "Ice",
      "Bug",
      "Ghost",
      "Steel",
      "Dragon",
      "Dark",
      "Fairy",
    ],
  },
  hp: {
    type: Number,
    required: true,
  },
  attack: {
    type: Number,
    required: true,
  },
  defense: {
    type: Number,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
});

const Pokemon = model("Pokemon", pokeSchema);
module.exports = Pokemon;
