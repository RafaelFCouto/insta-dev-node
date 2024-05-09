const jwt = require('jsonwebtoken');
const Users = require('../models/Users');


class AuthController{
    async authenticate(req,res){
        const{email,user_name, password} = req.body;

        let whereClause ={};
        if(email){
            whereClause ={email};
        } 
        else if(user_name){
            whereClause={user_name};
        }
        else{
            return res.status(401).json({error:'We need a e-mail or password'});
        }


        const user = await Users.findOne({
            where:whereClause,
        });

        if(!user){
            return res.status(401).json({error:'User not found'});
        }


        const checkPassword = await user.checkPassword(password);

        if(!checkPassword){
            return res.status(401).json({error:'Informe a correct e-mail or password '});

        }





        return res.status(200).json({user: user});


    }
}



module.exports = new AuthController();