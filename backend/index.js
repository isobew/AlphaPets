const express = require("express");
const cors = require("cors");

const app = express();

//config json response
app.use(express.json());

//resolver cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//pasta pública para imagens
app.use(express.static('public'));

//rotas
const UserRoutes = require('./routes/UserRoutes');
const PetRoutes = require('./routes/PetRoutes');

app.use('/users', UserRoutes);
app.use('/pets', PetRoutes);

app.listen(5000);
