const Posts = require("../models/Posts");
const mongoose = require("mongoose");

const addPost = async (req, res)=>{
    const {title, content, author} = req.body;
    
        const post = new Posts({
            title,
            content,
            author
        });
        const posts = await post.save();  

    res.send(posts)
}

module.exports = {addPost}