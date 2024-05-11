
const{Router} = require('express');
const{upload} = require('./configs/multer');

const schemaValidator = require('./apps/middlewares/schemaValidator');
const AuthMiddleware = require('./apps/middlewares/authentication');

const UserController = require('./apps/controllers/UserController');
const userSchema = require('./schema/create.user.schema.json');

const AuthController = require('./apps/controllers/AuthController');
const authSchema = require('./schema/auth.schema.json');

const PostController = require('./apps/controllers/PostController');
const postSchema = require('./schema/create.post.schema.json');


const FileController = require('./apps/controllers/FileController');

const routes = new Router();


routes.post('/user/create', schemaValidator(userSchema), UserController.createUser);






routes.post('/auth',schemaValidator(authSchema), AuthController.authenticate);


routes.use(AuthMiddleware);


routes.put('/user/update', UserController.updateUser);
routes.delete('/user/delete', UserController.deleteUser);
routes.get('/user/profile', UserController.userProfile);


routes.post('/upload', upload.single('image'), FileController.upload);

routes.post('/post/create', schemaValidator(postSchema), PostController.createPost);




routes.get('/health', (req,res)=>{
    return res.send({message:'Connected with success!'});
});

module.exports = routes;