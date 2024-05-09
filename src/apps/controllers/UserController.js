
const Users = require('../models/Users');
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


}



module.exports= new UserController();