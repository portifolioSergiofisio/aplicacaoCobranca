const servicoCliente = require('../../servicos/dbCliente.servico');

module.exports = async function (req, res, next) {
  try {
    const { id } = req.cliente;

    await servicoCliente.deletarCliente(id);

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
