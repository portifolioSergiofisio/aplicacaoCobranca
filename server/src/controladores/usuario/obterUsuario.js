const servicoCompartilhado = require('../../servicos/dbCompartilhado.servico');

module.exports = async function (req, res) {
  const { id } = req.usuario;

  const usuario = await servicoCompartilhado.obterUm({ id }, 'usuarios');
  const resposta = servicoCompartilhado.excluirSenhaUsuario(usuario);

  res.json(resposta);
};