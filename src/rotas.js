const express = require('express');
const { listarContas, criarConta } = require('./controladores/bancodigital');

const rotas = express();

rotas.get('/contas', listarContas);
rotas.post('/contas', criarConta);



module.exports = rotas;