const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "123456";

const authController = require("express").Router();

authController.post("/register", async (req, res) => {
  try {
    const isExisting = await User.findOne({ email: req.body.email });
    if (isExisting) {
      return res.status(404).json({ msg: "User already registered" });
    }

    if (req.body.username === "" || req.body.email === "" || req.body.password === "") {
      return res.status(500).json({ msg: "All fields must be populated" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({ ...req.body, password: hashedPassword });
    await user.save();


    const {password, ...others} = user._doc
    const token = createToken(user);

    return res.status(201).json({ others, token });
  } catch (error) {
    return res.status(500).json(error);
  }
});

authController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    return res.status(500).json({ msg: "All fields must be populated" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Invalid credentials" });
    }
    const comparePass = await bcrypt.compare(req.body.password, user.password);
    if (!comparePass) {
      return res.status(404).json({ msg: "Invalid credentials" });
    }

    const {password, ...others} = user._doc
    const token = createToken(user);

    return res.status(200).json({ others, token });
  } catch (error) {
    return res.status(500).json(error);
  }
});

const createToken = (user) => {
  const payload = {
    id: user._id.toString(),
    email: user.email,
  };

  const token = jwt.sign(payload, JWT_SECRET);

  return token;
};

module.exports = authController 
