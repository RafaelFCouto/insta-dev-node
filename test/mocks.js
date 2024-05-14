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

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlZDk1ZDJiZDlhYzExZGJlM2JjYzVkOTk3MzE0MDlmZTowNDQxMDM5YjdiMGEzNTI3ZTY1ZjY0OWFkYzY3NDA2MyIsImlhdCI6MTcxNTcxNTk4MywiZXhwIjoxNzE2MzIwNzgzfQ.TxffgCZcMBBmnk_wxQkreiGa5IrovXq3Df3WG5NeqM0";


module.exports={user, auth, token};