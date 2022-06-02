const jwt = require('jsonwebtoken');

const createUserToken = async (user, req, res) => {

    //criando token
    const token = jwt.sign({
        //o que vai ser enviado com o token
        name: user.name,
        id: user._id 
    }, "nossosecret");

    //return token
    res.status(200).json({
        message: "Você está autenticado.",
        token: token,
        userId: user._id,
    })
}

module.exports = createUserToken