const servicoCliente = require('../../servicos/dbCliente.servico');
const servicoCompartilhado = require('../../servicos/dbCompartilhado.servico');

module.exports = async function (req, res, next) {
  try {
    const { nome, email, cpf, telefone } = servicoCompartilhado.extrairCampos(req, ['nome', 'email', 'cpf', 'telefone']);
    const { logradouro = '', complemento = '', cep = '', bairro = '', cidade = '', estado = '' } = req.body?.endereco ?? {};

    const novoUsuario = {
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

    const cliente_id = await servicoCliente.cadastro(novoUsuario);

    const clienteCadastrado = await servicoCliente.obterClienteCompletoCadastradoPorId(cliente_id);

    res.status(201).json(clienteCadastrado);
  } catch (erro) {
    next(erro);
  }
};
