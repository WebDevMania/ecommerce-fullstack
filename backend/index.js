require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authController = require("./controllers/authController");
const productController = require("./controllers/productController");
const uploadController = require("./controllers/uploadController");
const app = express();

// db connecting
mongoose.connect(process.env.MONGO_URL, () => console.log("Db is connected"));

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// to serve images inside public folder
app.use('/images', express.static('public/images'));

app.use("/auth", authController);
app.use("/product", productController);
app.use('/upload', uploadController)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server has been started"));
