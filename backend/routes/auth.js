const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req,res)=>{
  const hashed = await bcrypt.hash(req.body.password,10);

  const user = new User({
    name:req.body.name,
    email:req.body.email,
    password:hashed
  });

  await user.save();
  res.json(user);
});

router.post("/login", async (req,res)=>{
  const user = await User.findOne({email:req.body.email});

  if(!user) return res.status(400).json("User not found");

  const match = await bcrypt.compare(req.body.password,user.password);

  if(!match) return res.status(400).json("Wrong password");

  // 👇 यही जगह है
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
});

module.exports = router;