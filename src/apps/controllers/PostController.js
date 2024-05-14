const { NOW, where } = require('sequelize');
const Posts = require('../models/posts');
const Users = require('../models/Users');

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

        if(!postAddLike){
            return res.status(400).json({message:'Failed add like in this post'});
        }

        return res.status(200).json({message: `Like Storaged`});


    }


    async listMyPosts(req,res){
        const allPost = await Posts.findAll({
            order:[
                ['id', 'DESC']
            ],
            where:{
                author_id:req.userId,
            },
        });

        if(!allPost){
            return ResizeObserver.status(400).json({message:'Failed to list all posts'});
        }



        const formatedData= [];

        for (const item of allPost) {
            formatedData.push({
                id:item.id,
                image:item.image,
                description:item.description,
                number_likes:item.number_likes,

            })
            
        }
        

        return res.status(200).json({postsData: formatedData});
    }
    

    async listAllPosts(req, res){
        const allPost = await Posts.findAll({
            order:[
                ['id', 'DESC']
            ],
            attributes:['id','image', 'description','number_likes'],
            include:[
                {
                    model:Users,
                    as: 'user',
                    required:true,
                    attributes:['id','user_name']
                }
            ],

        });


        return res.status(200).json({postsData: allPost});



    }






}

module.exports = new PostController();