const knex = require('../../../conexao');
const servicoUsuario = require('../../servicos/dbUsuario.servico');

module.exports = async function (req, res, next) {
  const moment = require('moment');
  const bcrypt = require('bcrypt');

  const { token: resete_token } = req.params;
  const { senha } = req.body;
  try {
    const reseteEncontrado = await knex('resete_senha_usuario').where({ resete_token }).where('expira_em', '>', moment()).first('usuario_id');
    if (!reseteEncontrado) {
      return res.status(400).json({ message: 'Token inválido ou expirado' });
    }
    console.log(reseteEncontrado.usuario_id);
    const hashedPassword = await bcrypt.hash(senha, 10);

    await servicoUsuario.atualizarCadastro(reseteEncontrado.usuario_id, { senha: hashedPassword });
    await servicoUsuario.deletarReseteSenha(resete_token);
    res.status(200).json({ message: 'Senha redefinida com sucesso' });
  } catch (error) {
    next(error);
  }
};
