const bcrypt = require('bcrypt');
const servicoUsuario = require('../../servicos/dbUsuario.servico');
const servicoCompartilhado = require('../../servicos/dbCompartilhado.servico');

module.exports = async function (req, res, next) {
  const { nome, email, senha } = servicoCompartilhado.extrairCampos(req, ['nome', 'email', 'senha']);

  try {
    const senhaEncriptada = await bcrypt.hash(senha, 10);

    const novoUsuario = await servicoUsuario.cadastrar({
      nome,
      email,
      senha: senhaEncriptada,
    });

    return res.status(201).json(novoUsuario);
  } catch (erro) {
    next(erro);
  }
};
