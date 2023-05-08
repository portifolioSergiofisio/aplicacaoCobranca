/**
 * @param {string} senha - A senha não criptografada enviada no corpo da requisição.
 * @param {string} senha_usuario - A senha criptografada armazenada no banco de dados ou em outra fonte segura.
 * @returns {Promise<boolean>} Uma Promise que resolve com um valor booleano indicando se a senha não é válida.
 */
async function senhaInvalida(senha, senha_usuario) {
  const bcrypt = require('bcrypt');

  return !(await bcrypt.compare(senha, senha_usuario));
}

/**
 * Compara os dados do cliente com os dados do servidor.
 *
 * @param {object} dadosServer - Os dados do servidor.
 * @param {object} cliente - Os dados do cliente.
 * @returns {boolean} Retorna true se os dados do cliente forem iguais aos dados do servidor, caso contrário, retorna false.
 */
function compararDadosCliente(dadosServer, cliente) {
  const { id, status, ...dadosCliente } = cliente;

  if (JSON.stringify(dadosServer) == JSON.stringify(dadosCliente)) {
    return true;
  }
  return false;
}

function msgErroCampoCadastrado(campo) {
  return `O ${campo} já está cadastrado.`;
}

module.exports = { senhaInvalida, compararDadosCliente, msgErroCampoCadastrado };

