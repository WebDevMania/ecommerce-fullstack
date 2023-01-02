const verifyToken = require("../middlewares/auth");
const Product = require("../models/Product");
const productController = require("express").Router();

// get all products
productController.get("/", async (req, res) => {
  try {
    let products;
    products = await Product.find({});
    if (!products) {
      return res.status(404).json({ msg: "Error occured" });
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// get a product
productController.get("/:id", async (req, res) => {
  try {
    let product;
    product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Error occured" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// create a product
productController.post("/", verifyToken, async (req, res) => {
  try {
    const product = await Product.create({...req.body});

    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = productController;
