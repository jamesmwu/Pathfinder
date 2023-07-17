const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();


// REGISTRATION
router.post("/register", async (req, res) => {
  try {
    // PASSWORD ENCRYPTION
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // CREATE NEW USER
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      description: req.body.description,
      city: req.body.city,
      from: req.body.from,
      relationship: req.body.relationship,
    });
    const user = await newUser.save();
    res.status(200).json(user);
    // SAVE NEW USER INTO MONGODB
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Registration failed" });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json("User not found");
      return;
    }
    const attemptPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // VALIDATE PASSWORD
    if (!attemptPassword) {
      res.status(400).json(user);
    }
    else {
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Login failed" });
  }
});


module.exports = router;
