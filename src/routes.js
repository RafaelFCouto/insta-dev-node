
const{Router} = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator');
const UserController = require('./apps/controllers/UserController');
const AuthController = require('./apps/controllers/AuthController');
const userSchema = require('./schema/create.user.schema.json');

const routes = new Router();


routes.post('/user/create', schemaValidator(userSchema), UserController.createUser);


routes.post('/auth', AuthController.authenticate);

routes.get('/health', (req,res)=>{
    return res.send({message:'Connected with success!'});
});

module.exports = routes;