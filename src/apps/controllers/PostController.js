const { NOW, where } = require("sequelize");
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


    async updatePost(req, res){
        const {image, description} = req.body;

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


        const postUpdate = await Posts.update(req.body,{where:{id:id}});

        if(!postUpdate){
            return res.status(400).json({message: 'Failed to update this post'});
        }


        return res.status(200).json({message: 'Post updated'});


    }

    async addLike(req, res){
        const id = req.params.id;

        const verifyPost = await Posts.findOne({
            where:{
                id,
            },
        });

        if(!verifyPost){
            return res.status(404).json({message: 'Post does not exists'});
        }

        const postAddLike = await Posts.update({number_likes: verifyPost.number_likes + 1},{where:{id:id}});

        console.log(postAddLike.number_likes);


        if(!postAddLike){
            return res.status(400).json({message:'Failed add like in this post'});
        }

        return res.status(200).json({message: `Like Storaged`});


    }






}

module.exports = new PostController();