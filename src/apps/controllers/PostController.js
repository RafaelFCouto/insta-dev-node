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


    async deletePost(req, res){

        const id = req.params.id;

        const verifyPost = await Posts.findOne({
            where:{
                id,
            },
        });



        if(!verifyPost){
            return res.status(404).json({message: 'Post does not exists'});
        }

        if(verifyPost.author_id != req.userId){
            return res.status(401).json({message: 'Unauthorized'});
        }

        const deletePost = await Posts.destroy({
            where:{
                id,
            },

        });

        if(!deletePost){
            return res.status(400).json({message: 'Failed to delete this post'});
        }

        return res.status(200).json({message:'Post deleted'})


    }






}

module.exports = new PostController();