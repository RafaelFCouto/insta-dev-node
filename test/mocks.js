const { password } = require("../src/configs/db");

const user = {
    name:"Sander Couto",
    user_name:"sandercouto",
    email: "sander@email.com",
    avatar: "https://googledrive.com/sander.jpg",
    gender:"Male",
    password:"senha123"
}

const auth={
    email:"gabriel@email.com",
    password: "senha123"
}

const post = {
    image:"https://postinsta/jogo-sport.jpg",
    description:"Vendo o meu time de coração"
}


module.exports={user, auth, post};