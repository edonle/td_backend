/* O nome do arquivo server.js não é regra... Pode ser qualquer nome. */

/* Framework do Node.js que nos auxilia na construção de aplicações Web */
const express = require('express');

const mongoose = require('mongoose');
const routes = require('./routes');

/* Função principal do express */
const server = express();

mongoose.connect('mongodb://localhost:27017/omnistack', {useNewUrlParser: true});

/* Informa ao express que as requisições devem ser tratadas como json */
server.use(express.json());

server.use(routes);

server.listen(3333);