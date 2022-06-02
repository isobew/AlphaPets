const mongoose = require('mongoose');

//criando conexão com o banco
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/alphapets')
    console.log('Conectado ao Mongoose!');
}

main().catch((err) => console.log(err));

module.exports = mongoose;
