const bcrypt = require('bcrypt');
const servicoUsuario = require('../../servicos/dbUsuario.servico');
const servicoCompartilhado = require('../../servicos/dbCompartilhado.servico');

module.exports = async function (req, res, next) {
  const { nome, email, senha, cpf = '', telefone = '' } = servicoCompartilhado.extrairCampos(req, ['nome', 'email', 'senha', 'cpf', 'telefone']);
  const { id } = req.usuario;

  try {
    const senhaEncriptada = await bcrypt.hash(senha, 10);

    const dadosAtualizados = { nome, email, senha: senhaEncriptada, cpf, telefone };

    await servicoUsuario.atualizarCadastro(id, dadosAtualizados);

    res.status(201).json({ mensagem: 'usuario atualizado' });
  } catch (erro) {
    next(erro);
  }
};
