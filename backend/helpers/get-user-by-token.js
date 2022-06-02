const jwt = require('jsonwebtoken');

const User = require('../models/User');

// pegando usuário pelo token jwt
const getUserByToken = async (token) => {

    if(!token){
        return res.status(401).json({ message: "Acesso negado!" });
    }
    
    // decodificando o token
    const decoded = jwt.verify(token, "nossosecret");

    const userId = decoded.id;

    const user = await User.findOne({_id: userId});

    return user
}

module.exports = getUserByToken