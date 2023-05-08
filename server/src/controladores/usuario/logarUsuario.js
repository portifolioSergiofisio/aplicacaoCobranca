const servicoUsuario = require('../../servicos/dbUsuario.servico');

module.exports = async function (req, res, next) {
  const { id: req_usuario_id, nome: req_usuario_nome } = req.usuario;

  try {
    const token = servicoUsuario.criarToken(req_usuario_id);
    return res.json({
      id: req_usuario_id,
      nome: req_usuario_nome,
      token,
    });
  } catch (erro) {
    next(erro);
  }
};
