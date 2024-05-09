
const{Router} = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator');
const AuthMiddleware = require('./apps/middlewares/authentication');

const UserController = require('./apps/controllers/UserController');
const userSchema = require('./schema/create.user.schema.json');

const AuthController = require('./apps/controllers/AuthController');
const authSchema = require('./schema/auth.schema.json');

const routes = new Router();


routes.post('/user/create', schemaValidator(userSchema), UserController.createUser);
routes.post('/auth',schemaValidator(authSchema), AuthController.authenticate);


routes.use(AuthMiddleware);

routes.get('/health', (req,res)=>{
    return res.send({message:'Connected with success!'});
});

module.exports = routes;