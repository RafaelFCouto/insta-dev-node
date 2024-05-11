const { NOW } = require("sequelize");
const Posts = require("../models/posts");

class PostController{

    async createPost(req, res){
        const{image, description} = req.body;

        const newPost = await Posts.create({
            image,
            description,
            author_id:req.userId
        });

        if(!newPost){
            return res.status(400).json({message:'Created post failed!'});
        }

        return res.status(200).json({newPost});




    }






}

module.exports = new PostController();