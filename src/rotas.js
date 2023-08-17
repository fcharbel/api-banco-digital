const express = require('express');
const { listarContas, criarConta, atualizarUsuario, excluirConta } = require('./controladores/bancodigital');

const rotas = express();

rotas.get('/contas', listarContas);
rotas.post('/contas', criarConta);
rotas.put('/contas/:numero/usuario', atualizarUsuario);
rotas.delete('/contas/:numero', excluirConta);



module.exports = rotas;