const router = require("express").Router();
const Item = require("../models/Item");
const auth = require("../middleware/auth");

// ADD ITEM
router.post("/items",auth,async(req,res)=>{
  const item = new Item({...req.body,user:req.user.id});
  await item.save();
  res.json(item);
});

// GET ALL
router.get("/items",async(req,res)=>{
  const items = await Item.find();
  res.json(items);
});

// UPDATE
router.put("/items/:id",auth,async(req,res)=>{
  const item = await Item.findByIdAndUpdate(req.params.id,req.body);
  res.json(item);
});

// DELETE
router.delete("/items/:id",auth,async(req,res)=>{
  await Item.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

// SEARCH
router.get("/items/search",async(req,res)=>{
  const items = await Item.find({
    itemName: {$regex:req.query.name,$options:"i"}
  });
  res.json(items);
});

module.exports = router;