const knex = require('../../conexao');
const TratamentoDeErro = require('../intermediarios/tratamentoDeErros/tratamentoDeErro.class');

const servicoCompartilhado = {};

/**
 * Obtém um registro em uma tabela no banco de dados.
 *
 * @async
 * @function obterUm
 * @param {object} parametro - O objeto contendo a chave e valor do registro a ser verificado.
 * @param {string} tabela - O nome da tabela no banco de dados.
 * @param {string} campo - [opcional] - O nome do campo que será retornado. Caso não seja informado, será retornado o objeto completo.
 * @returns {Promise<object|null>} Retorna um objeto com as informações do registro encontrado na tabela ou undefined se não foi encontrado.
 */
servicoCompartilhado.obterUm = async (parametro, tabela, campo = '*') => {
  return knex(tabela).first(campo).where(parametro);
};

/**
 *@param {Object} usuario - Um objeto que contém a senha do usuário.
 *@returns {Object} Um novo objeto que contém todas as propriedades do objeto original, exceto a propriedade "senha".
 */
servicoCompartilhado.excluirSenhaUsuario = (usuario) => {
  const { senha, ...usuarioSemSenha } = usuario;
  return usuarioSemSenha;
};

/**
 * Extrai campos específicos de uma solicitação HTTP.
 *
 * @function extrairCampos
 * @param {object} req - O objeto da solicitação HTTP.
 * @param {string[]} campos - Um array contendo os nomes dos campos a serem extraídos.
 * @throws {TratamentoDeErro} Se um campo especificado não for encontrado na solicitação.
 * @returns {object} Um objeto contendo os valores extraídos dos campos especificados.
 */
servicoCompartilhado.extrairCampos = (req, campos) => {
  const dados = {};
  for (let campo of campos) {
    if (req.body.hasOwnProperty(campo)) {
      dados[campo] = req.body[campo] ?? '';
    } else {
      throw new TratamentoDeErro(`O campo ${campo} não foi encontrado no corpo da solicitação.`);
    }
  }
  return dados;
};

/**
 * Validates a field value against an ID.
 * @async
 * @function validarCampoId
 * @param {Object} req - O objeto de requisição do express.
 * @param {Object} res - O objeto de resposta do express.
 * @param {string} campo - O nome do campo a ser validado.
 * @param {string} tabela - O nome da tabela a ser validada.
 * @returns {Object} - O objeto de resposta com o status HTTP apropriado.
 * @example
 * const req = { query: { campo: "name", id: 1 } };
 * const res = { sendStatus: (status) => console.log(status) };
 * const campo = "name";
 * const tabela = "cliente";
 * const resultado = await servicoCompartilhado.validarCampoId(req, res, campo, tabela);
 */
servicoCompartilhado.validarCampoId = async (req, res, campo, tabela) => {
  if (req.query[campo] && req.query.id) {
    const valorCampo = req.query[campo];
    const id = parseInt(req.query.id);
    const campoEncontrado = await servicoCompartilhado.obterUm({ [campo]: valorCampo }, tabela);

    if (!campoEncontrado) return res.sendStatus(200);

    if (campoEncontrado && campoEncontrado.id === id) return res.sendStatus(200);
    
    return res.sendStatus(400);
  }

};

/**
 * Lança um erro do tipo TratamentoDeErro se a condição especificada for verdadeira.
 *
 * @function validarCondicao
 * @param {boolean} condicao - A condição a ser verificada dentro do if. Caso a condição seja verdadeira, um erro será lançado.
 * @param {string} mensagemErro - A mensagem de erro a ser exibida se a condição for verdadeira.
 * @param {string} [codigoHttp='400'] - O código HTTP a ser retornado no erro.
 * @throws {TratamentoDeErro} Se a condição for verdadeira.
 * @returns {void}
 */
servicoCompartilhado.validarCondicao = (condicao, mensagemErro, codigoHttp = '400') => {
  if (condicao) {
    throw new TratamentoDeErro(mensagemErro, codigoHttp);
  }
};

module.exports = servicoCompartilhado;
