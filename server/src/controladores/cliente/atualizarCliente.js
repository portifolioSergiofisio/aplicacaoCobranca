const servicoCliente = require('../../servicos/dbCliente.servico');
const servicoCompartilhado = require('../../servicos/dbCompartilhado.servico');

module.exports = async function (req, res, next) {
  try {
    const { id, endereco_id } = req.cliente;

    const { nome, email, cpf, telefone } = servicoCompartilhado.extrairCampos(req, ['nome', 'email', 'cpf', 'telefone']);
    const { logradouro = '', complemento = '', cep = '', bairro = '', cidade = '', estado = '' } = req.body?.endereco ?? {};

    const clienteAtualizado = {
      nome,
      email,
      cpf,
      telefone,
      endereco: {
        logradouro,
        complemento,
        cep,
        bairro,
        cidade,
        estado,
      },
    };

    await servicoCliente.atualizarCadastro(id, endereco_id, clienteAtualizado);

    const clienteTemp = await servicoCliente.obterClienteCompletoCadastradoPorId(id);

    return res.status(200).json(clienteTemp);
  } catch (error) {
    next(error);
  }
};
