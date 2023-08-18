const express = require('express');
const {
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta,
    depositarNaConta,
    listarDepositos,
    sacarDaConta,
    listarSaques,
    transferirDaConta,
    listarTransferencias,
    obterSaldo
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
rotas.post('/transacoes/transferir', transferirDaConta);
rotas.get('/transferencias', listarTransferencias);
rotas.get('/contas/saldo', obterSaldo);



module.exports = rotas;