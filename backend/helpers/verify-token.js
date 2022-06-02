//proteção de rotas com verificação do token
const jwt = require('jsonwebtoken');
const getToken = require('./get-token');

//middleware para validação de token
const checkToken = (req, res, next) => {
    
    //verificando se existe header
    if(!req.headers.authorization){
        return res.status(401).json({ message: "Acesso negado!" });
    }
    
    const token = getToken(req);
    
    //verificando se existe token
    if(!token){
        return res.status(401).json({ message: "Acesso negado!" });
    }

    //verificação de token
    try{
        const verified = jwt.verify(token, "nossosecret");
        req.user = verified
        next();
    } catch(err) {
        return res.status(400).json({ message: "Token inválido!" })
    }
}

module.exports = checkToken