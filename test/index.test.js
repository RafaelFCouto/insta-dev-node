
const app = require('../src/server');
const request = require('supertest');

const {user, auth, token, post} = require('../test/mocks');
const Test = require('supertest/lib/test');



test('Criando user...', async ()=>{

    const response	= await request(app).post('/user/create').send(user);

});


test('Realizando Login...', async()=>{
    const response = await request(app).post('/auth').send(auth);
    console.log(response.body.token);
});


describe('Teste em rotas protegidas...', ()=>{

    let token ="";
    beforeAll(async () =>{
        const response = await request(app).post('/auth').send(auth);
        token = response.body.token;
    });

    test('Acesso a uma rota protegida', async ()=>{
        const response = await request(app).post('/posts/listAllPosts').set('Authorization', `Bearer ${token}`);
        
    });

    test('Create Post', async()=>{
        const response = await request(app)
            .post('/posts/create')
            .set('Authorization', `Bearer ${token}`)
            .send(post);

    })
});










