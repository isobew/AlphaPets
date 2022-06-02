const Pet = require("../models/Pet");

//helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class PetController {
  //registrando pets
  static async create(req, res) {
    //pegando dados do request
    const { name, age, weight, color } = req.body;

    //upload de imagens
    const images = req.files;

    const available = true;

    //validações
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }
    if (!age) {
      res.status(422).json({ message: "A idade é obrigatória!" });
      return;
    }
    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório!" });
      return;
    }
    if (!color) {
      res.status(422).json({ message: "A cor é obrigatória!" });
      return;
    }
    if (images.length === 0) {
      res.status(422).json({ message: "A imagem é obrigatória!" });
      return;
    }

    //pegando o dono do pet pelo token
    const token = getToken(req);
    const user = await getUserByToken(token);

    //criando um pet
    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    //acrescentando as imagens no array
    images.map((image) => {
      pet.images.push(image.filename);
    });

    try {
      //salvando o pet no banco de dados
      const newPet = await pet.save();
      res.status(201).json({
        message: "Pet cadastrado com sucesso!",
        newPet,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  //pegando todos os pets cadastrados
  static async getAll(req, res) {
    const pets = await Pet.find().sort("-createdAt");

    res.status(200).json({
      pets: pets,
    });
  }

  //pegando todos os pets cadastrados pelo usuário
  static async getAllUserPets(req, res) {
    //pegando usuário pelo token
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt");

    res.status(200).json({
      pets,
    });
  }

  //pegando todos os pets adotados por um usuário
  static async getAllUserAdoptions(req, res) {
    //pegando usuário pelo token
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "adopter._id": user._id }).sort("-createdAt");

    res.status(200).json({
      pets,
    });
  }

  //pegando detalhes de um pet
  static async getPetById(req, res) {
    const id = req.params.id;

    //verificando se o id é válido
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    //verificando se existe um pet com o id informado
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    res.status(200).json({
      pet: pet,
    });
  }

  //removendo um pet pelo id
  static async removePetById(req, res) {
    const id = req.params.id;

    //rejeitando o usuário não validado
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    //verificando se existe um pet com o id informado
    const pet = await Pet.findOne({ _id: id });
    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    //verificando se o pet foi cadastrado pelo usuário logado
    const token = getToken(req);
    const user = await getUserByToken(token);

    //comparando o id do usuário logado com o id do cadastrante do pet
    if (pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema ao processar a sua solicitação, tente novamente mais tarde!",
      });
      return;
    }

    await Pet.findByIdAndRemove(id);

    res.status(200).json({
      message: "Pet removido com sucesso!",
    });
    return;
  }

  //atualizado dados de um pet
  static async updatePet(req, res) {
    const id = req.params.id;

    //pegando dados do request
    const { name, age, weight, color, available } = req.body;

    const images = req.files;

    const updatedData = {};

    //checando se pet existe
    const pet = await Pet.findOne({ _id: id });
    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    //verificando se o pet foi cadastrado pelo usuário logado
    const token = getToken(req);
    const user = await getUserByToken(token);

    //comparando o id do usuário logado com o id do cadastrante do pet
    if (pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema ao processar a sua solicitação, tente novamente mais tarde!",
      });
      return;
    }

    //validações
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    } else {
      updatedData.name = name;
    }
    if (!age) {
      res.status(422).json({ message: "A idade é obrigatória!" });
      return;
    } else {
      updatedData.age = age;
    }
    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório!" });
      return;
    } else {
      updatedData.weight = weight;
    }
    if (!color) {
      res.status(422).json({ message: "A cor é obrigatória!" });
      return;
    } else {
      updatedData.color = color;
    }
    if (images.length > 0) {
      updatedData.images = [];
      images.map((image) => {
        updatedData.images.push(image.filename);
      });
    }

    await Pet.findByIdAndUpdate(id, updatedData);

    res.status(200).json({ message: "Pet atualizado com sucesso!" });
  }

  //agendar visita para adoção
  static async schedule(req, res) {
    const id = req.params.id;

    //verificando se pet existe
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    //verificando se o pet foi cadastrado pelo usuário logado
    const token = getToken(req);
    const user = await getUserByToken(token);

    //comparando o id do usuário logado com o id do cadastrante do pet
    if (pet.user._id.equals(user._id)) {
      res.status(422).json({
        message: "Você não pode agendar uma visita com o seu próprio pet!",
      });
      return;
    }

    //checando se o usuário já agendou uma visita
    if (pet.adopter) {
      if (pet.adopter._id.equals(user._id)) {
        res.status(422).json({
          message: "Você já agendou uma visita para este pet!",
        });
        return;
      }
    }

    //adicionar usuário como adotante do pet
    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image,
    };

    await Pet.findByIdAndUpdate(id, pet);

    res.status(200).json({
      message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`,
    });
  }

  //concluindo adoção
  static async concludeAdoption(req, res) {
    const id = req.params.id;

    //verificando se pet existe
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    
    //verificando se o pet foi cadastrado pelo usuário logado
    const token = getToken(req);
    const user = await getUserByToken(token);

    //comparando o id do usuário logado com o id do cadastrante do pet
    if (pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema ao processar a sua solicitação, tente novamente mais tarde!",
      });
      return;
    }

    pet.available = false;

    await Pet.findByIdAndUpdate(id, pet);

    res.status(200).json({
        message: "Parabéns! O ciclo de adoção foi finalizado com sucesso!"
    });
  }
};
