
const bancodigital = require('../bancodedados');
const { contas } = bancodigital

let numeroConta = contas.length + 1;


function validacaoDadosUsuario(req, res) {

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (
        !nome || nome.trim() === '' ||
        !cpf || cpf.trim() === '' ||
        !data_nascimento || data_nascimento.trim() === '' ||
        !telefone || telefone.trim() === '' ||
        !email || email.trim() === '' ||
        !senha || senha.trim() === ''
    ) {

        return false;
    }

    return true;
}

function numeroContaValido(req, res) {
    const { numero } = req.params;

    if (!Number(numero)) {
        return false;
    }

    return true;

}

function listarContas(req, res) {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(400).json({ mensagem: 'A senha do banco não foi informada' })
    }

    if (senha_banco !== 'Cubos123Bank') {
        return res.status(401).json({ mensagem: 'A senha do banco informada é inválida' })
    }

    return res.status(200).json(contas);
}

function criarConta(req, res) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!validacaoDadosUsuario(req, res)) {
        return res.status(400).json({ mensagem: 'Todos os dados são obrigatórios' });
    }

    const usuarioJaExiste = contas.find((conta) => {
        return conta.usuario.cpf === cpf || conta.usuario.email === email;
    });

    if (usuarioJaExiste) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' })
    }

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

function atualizarUsuario(req, res) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numero } = req.params;

    const contaEncontrada = contas.find((conta) => {
        return conta.numero == numero
    });

    if (!numeroContaValido(req, res)) {
        return res.status(400).json({ mensagem: 'Número da conta inválido.' });
    }

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Número da conta não encontrado.' });
    }

    if (!validacaoDadosUsuario(req, res)) {
        return res.status(400).json({ mensagem: 'Todos os dados são obrigatórios' });
    }

    const usuarioJaExiste = contas.find((conta) => {
        return conta.usuario.cpf === cpf || conta.usuario.email === email;
    });

    if (usuarioJaExiste) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' })
    }

    contaEncontrada.usuario.nome = nome;
    contaEncontrada.usuario.cpf = cpf;
    contaEncontrada.usuario.data_nascimento = data_nascimento;
    contaEncontrada.usuario.telefone = telefone;
    contaEncontrada.usuario.email = email;
    contaEncontrada.usuario.senha = senha;

    return res.status(203).send();

}

function excluirConta(req, res) {
    const { numero } = req.params;

    if (!numeroContaValido(req, res)) {
        return res.status(400).json({ mensagem: 'Número da conta inválido.' });
    }

    const contaEncontrada = contas.find((conta) => {
        return conta.numero == numero
    });

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Número da conta não encontrado.' });
    }

    if (contaEncontrada.saldo !== 0) {
        return res.status(401).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' });
    }

    contas.splice(contas.indexOf(contaEncontrada), 1);

    return res.status(200).send();
}

module.exports = { listarContas, criarConta, atualizarUsuario, excluirConta }