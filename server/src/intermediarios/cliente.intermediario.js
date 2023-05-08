const { compararDadosCliente, msgErroCampoCadastrado } = require('../lib/utils');
const servicoCompartilhado = require('../servicos/dbCompartilhado.servico');

async function validarCliente(req, res, next) {
  try {
    const { email: email_req, cpf: cpf_req, telefone: telefone_req } = servicoCompartilhado.extrairCampos(req, ['email', 'cpf', 'telefone']);
    const cliente_email = req.cliente?.email;
    const cliente_cpf = req.cliente?.cpf;
    const cliente_telefone = req.cliente?.telefone;

    let dadosIguais;
    if (req.cliente) dadosIguais = compararDadosCliente(req.body, req.cliente);

    if (dadosIguais) return res.json(req.body);

    const emailEncontrado = await servicoCompartilhado.obterUm({ email: email_req }, 'cliente', 'email');

    servicoCompartilhado.validarCondicao(emailEncontrado && (email_req !== cliente_email || !email_req), msgErroCampoCadastrado('e-mail'));

    const cpfEncontrado = await servicoCompartilhado.obterUm({ cpf: cpf_req }, 'cliente', 'cpf');

    servicoCompartilhado.validarCondicao(cpfEncontrado && (cpf_req !== cliente_cpf || !cpf_req), msgErroCampoCadastrado('CPF'));

    const telefoneEncontrado = await servicoCompartilhado.obterUm({ telefone: telefone_req }, 'cliente');

    servicoCompartilhado.validarCondicao(telefoneEncontrado && (telefone_req !== cliente_telefone || !telefone_req), msgErroCampoCadastrado('telefone'));

    next();
  } catch (erro) {
    next(erro);
  }
}

module.exports = validarCliente;
