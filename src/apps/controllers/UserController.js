
const bcryptjs = require('bcryptjs');
const Users = require('../models/Users');
const { where } = require('sequelize');
class UserController
{


    async createUser(req, res)
    {
        const verifyUser = await Users.findOne({
            where: {
                email: req.body.email,
            },
        });
        if(verifyUser){
            return res.status(400).json({message: 'User already exists!'});
        }
        const user = await Users.create(req.body);

        if(!user){
            return res.status(400).json({message: 'Failed to create a user.'});
        }
        res.send({message:'User Created'});

    }


    async updateUser(req, res) {
        const {name, avatar, bio, gender, old_password, new_password, confirm_new_password} = req.body;


        const user = await Users.findOne({
            where:{
                id:req.userId,
            }

        });


        if(!user){
            return res.status(400).json({message: 'User not exists!'});
        }

        let encryptedPassword = '';

        if(old_password){
            if(!await user.checkPassword(old_password)){
                return res.status(401).json({message: 'Old password does not match!'});
            }

            if(!new_password || !confirm_new_password){
                return res.status(401).json({error: 'We need a new password and confirm new password'});
            }


            if(new_password !== confirm_new_password){
                return res.status(401).json({error: 'New Password and confirm new password does not match'});
            }


            encryptedPassword = await bcryptjs.hash(new_password,8);


            await Users.update(
                {

                    name: name || user.name,
                    avatar: avatar || user.avatar,
                    bio: bio || user.bio,
                    gender:gender||user.gender,
                    password_hash: encryptedPassword|| user.password_hash

                },
                {
                    where: {
                        id:user.id,
                    }
                }

 
            );

            return res.status(200).json({message:'User updated'});

        }


    }
    
    async deleteUser(req,res){
        const userToDelete= await Users.findOne({
            where:{
                id:req.userId,
            },
        });


        if(!userToDelete){

            return res.status(400).json({error:'User not found'});

        }


        await Users.destroy({
            where:{
                id:req.userId,
            },
        });

        return res.status(200).json({message:'User deleted'});





    }


    async userProfile(req, res){
        const user= await Users.findOne({
            attributes:['id', 'name','user_name', 'email','avatar','bio', 'gender'],
            where:{
                id:req.userId,
            },
        });


        if(!user){
            return res.status(404).json({error: 'User not found'});
        }
        console.log(user);

        const{id,name, user_name, email,avatar,bio,gender} = user;

        return res.status(200).json({user:{
            id,name, user_name, email,avatar,bio,gender
        }});


    }


}



module.exports= new UserController();