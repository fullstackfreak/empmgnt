const express = require('express');
const route = express.Router();
const {addPost} = require("../controllers/postController")
route.get("/",(req, res)=>{
    res.send("working...")
})
route.post("/", addPost)

module.exports = route;