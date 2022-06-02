const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class UserController {
    //criando registro
    static async register(req, res) {
        const { name, email, phone, password, confirmpassword } = req.body;
    
        //validações
        if(!name){
            res.status(422).json({message: 'O nome é obrigatório!'});
            return
        } 
        if(!email){
            res.status(422).json({message: 'O e-mail é obrigatório!'});
            return
        }
        if(!phone){
            res.status(422).json({message: 'O telefone é obrigatório!'});
            return
        }
        if(!password){
            res.status(422).json({message: 'A senha é obrigatória!'});
            return
        }
        if(!confirmpassword){
            res.status(422).json({message: 'A confirmação de senha é obrigatória!'});
            return
        }

        //checando se senha e confirmação são iguais
        if(password !== confirmpassword){
            res.status(422).json({message: 'A senha e confirmação de senha precisam ser iguais!'});
            return 
        }

        //checando se o usuário já existe
        const userExists = await User.findOne({email: email});
        
        if(userExists){
            res.status(422).json({message: 'O e-mail já existe! Por favor, utilize outro e-mail'});
            return 
        }

        // criando uma senha criptografada
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        //criando um usuário
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash,
        })

        //erro ao salvar o usuário
        try {
            //salvar usuário com método save do mongoose
            const newUser = await user.save();
            
            //utilizando a função para finalizar a requisição nos helpers
            await createUserToken(newUser, req, res);
            
        } catch(error) {
            res.status(500).json({message: error});
        }
    }   

    //criando login
    static async login(req, res){
        const { password, email } = req.body;
        //validações
        if(!email){
            res.status(422).json({message: 'O e-mail é obrigatório!'});
            return
        } 
        
        if(!password){
            res.status(422).json({message: 'A senha é obrigatória!'});
            return
        } 

        //checando se o usuário existe
        const user = await User.findOne({email: email});
        
        if(!user){
            res.status(422).json({message: 'Não há usuário cadastrado com esse e-mail!'});
            return 
        }

        //checando se a senha coincide com a senha do banco
        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword){
            res.status(422).json({message: 'Senha inválida!'});
            return 
        }

        //utilizando a função para finalizar a requisição nos helpers
        await createUserToken(user, req, res);
    } 

    //helper p pegar o usuário que tá utilizando o sistema atualmente
    static async checkUser(req, res){
        let currentUser;

        if(req.headers.authorization){

            const token = getToken(req);
            //decodificando o token
            const decoded = jwt.verify(token, "nossosecret");

            //extraindo o usuário a partir do token
            currentUser = await User.findById(decoded.id);
        
            //zerando senha
            currentUser.password = undefined;
        } else {
            currentUser = null;
        }

        res.status(200).send(currentUser);
    }

    static async getUserById(req, res){
        const id = req.params.id;

        const user = await User.findById(id).select("-password");

        //se não encontrar o id
        if(!user){
            res.status(422).json({
                message: 'Usuário não encontrado!',
            })
            return
        }

        res.status(200).json({ user });
    }

    static async editUser(req, res){
        const id = req.params.id;

        // checando se o usuário existe pelo token
        const token = getToken(req);
        const user = await getUserByToken(token);

        const { name, email, phone, password, confirmpassword } = req.body;

        //verificando se veio alguma imagem no req.file e alterando o nome da imagem
        if(req.file){
            user.image = req.file.filename;
        }

        //validações
        if(!name){
            res.status(422).json({message: 'O nome é obrigatório!'});
            return
        } 

        user.name = name;

        //checando se o e-mail já foi usado
        const userExists = await User.findOne({email: email});

        if(user.email !== email && userExists){
            res.status(422).json({
                message: 'E-mail já existe! Por favor, use outro e-mail',
            });
            return
        }

        user.email = email;

        if(!email){
            res.status(422).json({message: 'O e-mail é obrigatório!'});
            return
        }
        if(!phone){
            res.status(422).json({message: 'O telefone é obrigatório!'});
            return
        }

        user.phone = phone;

        if(password != confirmpassword) {
            res.status(422).json({message: 'As senhas não coincidem!'});
            return
        } else if(password === confirmpassword && password != null){
            //criando nova senha criptografada
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            user.password = passwordHash;
        }

        try {

            //retornando os dados do usuário atualizados
            await User.findOneAndUpdate(
                {_id: user._id},
                {$set: user},
                {new: true},
            );

            res.status(200).json({
                message: "Dados atualizados com sucesso!"
            });

        } catch (err) {
            res.status(500).json({ message: err });
            return
        }

    }
}