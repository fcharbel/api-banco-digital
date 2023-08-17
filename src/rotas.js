const express = require('express');
const {
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta,
    depositarNaConta,
    listarDepositos,
    sacarDaConta,
    listarSaques
} = require('./controladores/bancodigital');

const rotas = express();

rotas.get('/contas', listarContas);
rotas.post('/contas', criarConta);
rotas.put('/contas/:numero/usuario', atualizarUsuario);
rotas.delete('/contas/:numero', excluirConta);
rotas.post('/transacoes/depositar', depositarNaConta);
rotas.get('/depositos', listarDepositos);
rotas.post('/transacoes/sacar', sacarDaConta);
rotas.get('/saques', listarSaques);



module.exports = rotas;