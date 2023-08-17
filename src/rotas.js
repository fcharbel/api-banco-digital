const express = require('express');
const { listarContas, criarConta, atualizarUsuario } = require('./controladores/bancodigital');

const rotas = express();

rotas.get('/contas', listarContas);
rotas.post('/contas', criarConta);
rotas.put('/contas/:numero/usuario', atualizarUsuario);



module.exports = rotas;