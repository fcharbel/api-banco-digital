const bancodigital = require('../bancodedados');
const { contas } = bancodigital

let numeroDaConta = contas.length + 1;


function validacaoDadosUsuario(req) {

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || nome.trim() === ''
        || !cpf || cpf.trim() === ''
        || !data_nascimento || data_nascimento.trim() === ''
        || !telefone || telefone.trim() === ''
        || !email || email.trim() === ''
        || !senha || senha.trim() === '') {

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

    if (!validacaoDadosUsuario) {
        return res.status(400).json({ mensagem: 'Todos os dados são obrigatórios' });
    }

    const cpfOuEmailEncontrado = contas.find((conta) => {
        return conta.usuario.cpf === cpf || conta.usuario.email === email;
    });


    if (cpfOuEmailEncontrado) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' })
    }

    const novaConta = {
        numero: numeroDaConta++,
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

    contas.push(novaConta);
    return res.status(201).json();

}

// function atualizarUsuario(req, res) {

// }


module.exports = { listarContas, criarConta }