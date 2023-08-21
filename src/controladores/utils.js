const bancodigital = require('../bancodedados');
const { contas } = bancodigital

function validarCampo(valor, nomeCampo, res) {
    if (!valor || valor.trim() === '') {
        res.status(400).json({ mensagem: `O campo ${nomeCampo} é obrigatório.` });
        return false;
    }
    return true;
}

function validarNumeroConta(numero, res) {
    if (!Number(numero)) {
        res.status(400).json({ mensagem: 'Número da conta inválido.' });
        return false;
    }

    if (!numero || numero.trim() == '') {
        res.status(400).json({ mensagem: 'Número da conta não informado' })
        return false
    }
    return true;
}

function validacaoDadosUsuario(req, res) {

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (
        !validarCampo(nome, 'nome', res) ||
        !validarCampo(cpf, 'cpf', res) ||
        !validarCampo(data_nascimento, 'data_nascimento', res) ||
        !validarCampo(telefone, 'telefone', res) ||
        !validarCampo(email, 'email', res) ||
        !validarCampo(senha, 'senha', res)
    ) {
        return false;
    }

    return true;
}

function validarSenha(senha, senhaCorreta, res) {
    if (!senha) {
        res.status(400).json({ mensagem: 'Senha não informada.' });
        return false;
    }
    if (senha !== senhaCorreta) {
        res.status(401).json({ mensagem: 'Senha inválida.' });
        return false;
    }
    return true;
}

function encontrarConta(numero, res) {
    const contaEncontrada = contas.find(conta => conta.numero == numero);
    if (!contaEncontrada) {
        res.status(404).json({ mensagem: `Conta bancária número ${numero} não encontrada.` });
        return false;
    }
    return contaEncontrada;
}

function usuarioJaExiste(req, res) {
    const { cpf, email } = req.body;

    const usuario = contas.find((conta) => {
        return conta.usuario.cpf === cpf || conta.usuario.email === email;
    });

    if (usuario) {
        res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' })
        return true;
    }

    return false;
}

function validarValorPositivo(valor, res) {
    if (!Number(valor) || valor <= 0) {
        res.status(400).json({ mensagem: 'Valor inválido.' });
        return false;
    }
    return true;
}

module.exports = {
    validarCampo,
    validacaoDadosUsuario,
    validarNumeroConta,
    validarSenha,
    usuarioJaExiste,
    encontrarConta,
    validarValorPositivo
}