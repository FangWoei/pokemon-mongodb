const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const pokeSchema = require("./poke");

const FavoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  pokemon: {
    type: Schema.Types.ObjectId,
    ref: "Pokemon",
  },
});

const Favorite = model("Favorite", FavoriteSchema);
module.exports = Favorite;
