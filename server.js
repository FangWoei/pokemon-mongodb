const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGODB_URL } = require("./config");

const app = express();
app.use(express.json());
const port = 1204;

// setup cors
const corsHandler = cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
  preflightContinue: true,
});

app.use(corsHandler);

// MongoDB Connection
mongoose
  .connect(MONGODB_URL + "pokemon")
  .then(() => console.log("MongoDBConnected... "))
  .catch((err) => console.log(err));

// routes

const authRouter = require("./routes/auth");
const favoriteRouter = require("./routes/favorite");
const imageRouter = require("./routes/image");
const orderRouter = require("./routes/order");
const paymentRouter = require("./routes/payment");
const pokeRouter = require("./routes/poke");
const postRouter = require("./routes/post");
const productRouter = require("./routes/product");

app.use("/favorite", favoriteRouter);
app.use("/posts", postRouter);
app.use("/pokemons", pokeRouter);
app.use("/orders", orderRouter);
app.use("/products", productRouter);
app.use("/images", imageRouter);
app.use("/payment", paymentRouter);
app.use("/auth", authRouter);

// set the uploads folder as static path
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Pokemon");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
