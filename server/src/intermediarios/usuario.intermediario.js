const { senhaInvalida, msgErroCampoCadastrado } = require('../lib/utils');
const servicoCompartilhado = require('../servicos/dbCompartilhado.servico');
const TratamentoDeErro = require('./tratamentoDeErros/tratamentoDeErro.class');

async function validarDadosUsuario(req, res, next) {
  const { email: email_req } = servicoCompartilhado.extrairCampos(req, ['email']);
  const cpf_req = req.body?.cpf
  const email_usuario = req.usuario?.email;
  const cpf_usuario = req.usuario?.cpf;

  try {
    const emailEncontrado = await servicoCompartilhado.obterUm({ email: email_req }, 'usuarios', 'email');

    servicoCompartilhado.validarCondicao(emailEncontrado && email_usuario && email_usuario !== email_req, msgErroCampoCadastrado('e-mail'));

    servicoCompartilhado.validarCondicao(emailEncontrado && !email_usuario, msgErroCampoCadastrado('e-mail'));

    if (cpf_req) {
      const cpfEncontrado = await servicoCompartilhado.obterUm({ cpf: cpf_req }, 'usuarios', 'cpf');
  
      servicoCompartilhado.validarCondicao(cpfEncontrado && cpf_usuario && cpf_usuario !== cpf_req, msgErroCampoCadastrado('CPF'));
  
      servicoCompartilhado.validarCondicao(cpfEncontrado && !cpf_usuario, msgErroCampoCadastrado('CPF'));
    }

    next();
  } catch (erro) {
    next(erro);
  }
}

async function loginUsuarioIntermediario(req, res, next) {
  const { email: email_req, senha: senha_req } = servicoCompartilhado.extrairCampos(req, ['email', 'senha']);
  const msgUsuarioInvalido = 'Usuário e/ou senha inválido(s).';

  try {
    const usuario = await servicoCompartilhado.obterUm({ email: email_req }, 'usuarios');

    if (!usuario) throw new TratamentoDeErro(msgUsuarioInvalido, 404);

    const { senha: senha_usuario, ...usuario_temp } = usuario;

    const senhaIncorreta = await senhaInvalida(senha_req, senha_usuario);
    if (senhaIncorreta) throw new TratamentoDeErro(msgUsuarioInvalido, 400);

    req.usuario = usuario_temp;
    next();
  } catch (erro) {
    next(erro);
  }
}

module.exports = { validarDadosUsuario, loginUsuarioIntermediario };
