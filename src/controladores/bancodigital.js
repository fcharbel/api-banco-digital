
const bancodigital = require('../bancodedados');
const { format } = require('date-fns')
const { contas, depositos, saques, transferencias, banco } = bancodigital
const {
    validacaoDadosUsuario,
    validarNumeroConta,
    validarSenha,
    usuarioJaExiste,
    cpfOuEmailJaExistem,
    encontrarConta,
    validarValorPositivo
} = require('./utils');

let numeroConta = contas.length + 1;

function listarContas(req, res) {
    const { senha_banco } = req.query;

    const senhaValida = validarSenha(senha_banco, banco.senha, res);

    if (senhaValida) {

        return res.status(200).json(contas);
    }
}

function criarConta(req, res) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const dadosValidos = validacaoDadosUsuario(req, res);
    const usuarioEncontrado = usuarioJaExiste(req, res);

    if (dadosValidos && !usuarioEncontrado) {
        const novaConta = {
            numero: String(numeroConta),
            saldo: 0,
            usuario: {
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }
        }

        numeroConta++
        contas.push(novaConta);
        return res.status(201).json();
    }
}

function atualizarUsuario(req, res) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numero } = req.params;

    const contaValida = validarNumeroConta(numero, res);
    if (contaValida) {
        const contaEncontrada = encontrarConta(numero, res);
        if (contaEncontrada) {
            const dadosValidos = validacaoDadosUsuario(req, res);
            if (dadosValidos) {
                const cpfOuEmailValidos = cpfOuEmailJaExistem(numero, cpf, email, res);
                if (cpfOuEmailValidos) {

                    contaEncontrada.usuario.nome = nome;
                    contaEncontrada.usuario.cpf = cpf;
                    contaEncontrada.usuario.data_nascimento = data_nascimento;
                    contaEncontrada.usuario.telefone = telefone;
                    contaEncontrada.usuario.email = email;
                    contaEncontrada.usuario.senha = senha;

                    return res.status(200).send();
                }
            }
        }
    }
}

function excluirConta(req, res) {
    const { numero } = req.params;

    const contaEncontrada = encontrarConta(numero, res);

    if (contaEncontrada) {

        if (contaEncontrada.saldo !== 0) {
            return res.status(401).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' });
        }

        contas.splice(contas.indexOf(contaEncontrada), 1);
        return res.status(200).send();
    }
}

function depositarNaConta(req, res) {
    const { numero_conta, valor } = req.body;

    const contaValida = validarNumeroConta(numero_conta, res);
    if (contaValida) {
        const valorPositivo = validarValorPositivo(valor, res);
        if (valorPositivo) {
            const contaEncontrada = encontrarConta(numero_conta, res);
            if (contaEncontrada) {

                contaEncontrada.saldo += valor;
                depositos.push({
                    data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                    numero_conta,
                    valor
                })

                return res.status(200).send();

            }
        }
    }
}

function listarDepositos(req, res) {
    const { senha_banco } = req.query;

    const senhaValida = validarSenha(senha_banco, banco.senha, res);

    if (senhaValida) {
        return res.status(200).json(depositos);
    }
}

function sacarDaConta(req, res) {
    const { numero_conta, valor, senha } = req.body;

    const contaValida = validarNumeroConta(numero_conta, res);
    if (contaValida) {
        const contaEncontrada = encontrarConta(numero_conta, res);
        if (contaEncontrada) {
            const senhaValida = validarSenha(senha, contaEncontrada.usuario.senha, res);
            if (senhaValida) {
                const valorPositivo = validarValorPositivo(valor, res);
                if (valorPositivo) {

                    if (contaEncontrada.saldo < valor) {
                        return res.status(400).json({ mensagem: 'Saldo insuficiente.' })
                    }

                    contaEncontrada.saldo -= valor;
                    saques.push({
                        data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                        numero_conta,
                        valor
                    })

                    return res.status(200).send();

                }
            }
        }
    }
}

function listarSaques(req, res) {
    const { senha_banco } = req.query;

    const senhaValida = validarSenha(senha_banco, banco.senha, res);

    if (senhaValida) {
        return res.status(200).json(saques);
    }
}

function transferirDaConta(req, res) {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    const contaOrigemValida = validarNumeroConta(numero_conta_origem, res);
    if (contaOrigemValida) {
        const contaDestinoValida = validarNumeroConta(numero_conta_destino, res);
        if (contaDestinoValida) {
            const contaOrigem = encontrarConta(numero_conta_origem, res);
            if (contaOrigem) {
                const contaDestino = encontrarConta(numero_conta_destino, res);
                if (contaDestino) {
                    const senhaValida = validarSenha(senha, contaOrigem.usuario.senha, res);
                    if (senhaValida) {
                        const valorPositivo = validarValorPositivo(valor, res);
                        if (valorPositivo) {
                            if (contaOrigem.saldo < valor) {
                                return res.status(400).json({ mensagem: 'Saldo insuficiente.' })
                            }

                            contaOrigem.saldo -= valor;
                            contaDestino.saldo += valor;

                            transferencias.push({
                                data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                                numero_conta_origem,
                                numero_conta_destino,
                                valor
                            })

                            return res.status(200).send();

                        }
                    }
                }
            }
        }
    }
}


function listarTransferencias(req, res) {
    const { senha_banco } = req.query;

    const senhaValida = validarSenha(senha_banco, banco.senha, res);

    if (senhaValida) {
        return res.status(200).json(transferencias);
    }
}

function obterSaldo(req, res) {
    const { numero_conta, senha } = req.query;

    const contaValida = validarNumeroConta(numero_conta, res);
    if (contaValida) {
        const contaEncontrada = encontrarConta(numero_conta, res);
        if (contaEncontrada) {
            const senhaValida = validarSenha(senha, contaEncontrada.usuario.senha, res);
            if (senhaValida) {
                return res.status(200).json({ mensagem: `saldo: ${contaEncontrada.saldo}` })
            }
        }

    }
}

function obterExtrato(req, res) {
    const { numero_conta, senha } = req.query;

    const contaValida = validarNumeroConta(numero_conta, res);
    if (contaValida) {
        const contaEncontrada = encontrarConta(numero_conta, res);
        if (contaEncontrada) {
            const senhaValida = validarSenha(senha, contaEncontrada.usuario.senha, res);
            if (senhaValida) {

                const depositosDaConta = depositos.filter(deposito => deposito.numero_conta === numero_conta);
                const saquesDaConta = saques.filter(saque => saque.numero_conta === numero_conta);
                const transferenciasEnviadas = transferencias.filter(transferenciaEnviada => transferenciaEnviada.numero_conta_origem === numero_conta);
                const transferenciasRecebidas = transferencias.filter(transferenciaRecebida => transferenciaRecebida.numero_conta_destino === numero_conta);

                const extrato = {
                    depositos: depositosDaConta,
                    saques: saquesDaConta,
                    transferenciasEnviadas,
                    transferenciasRecebidas
                }

                return res.status(200).json(extrato)
            }
        }

    }
}

module.exports = {
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
    obterSaldo,
    obterExtrato
}