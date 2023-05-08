/**
 * Um objeto que contém funções para filtrar clientes.
 *
 * @namespace filtrarClientes
 */

export const filtrarClientes = {};
/**
 * Retorna uma lista de clientes que estão com as cobranças em dia.
 *
 * @memberof filtrarClientes
 * @function clientesEmDia
 * @param {Array} cobrancas - Uma lista de cobranças a serem filtradas.
 * @returns {Array} Uma lista de clientes com cobranças em dia.
 */
filtrarClientes.clientesEmDia = function (clientes = []) {
  return clientes.filter((cliente) => cliente.status === 1);
};
/**
 * Filtra os clientes inadimplentes.
 *
 * @param {Array} clientes - Um array de objetos que contém informações dos clientes.
 * @returns {Array} - Um array com os clientes inadimplentes.
 */
filtrarClientes.clientesInadimplentes = function (clientes) {
  return clientes?.filter((cliente) => cliente.status === 2);
};

filtrarClientes.clientesPorStatus = function (clientes, filtroStatus) {
  if (!filtroStatus) {
    return clientes;
  }

  let filtradoPorStatus = [];

  if (filtroStatus === 1) {
    filtradoPorStatus = filtrarClientes.clientesEmDia(clientes);
  }

  if (filtroStatus === 2) {
    filtradoPorStatus = filtrarClientes.clientesInadimplentes(clientes);
  }

  return filtradoPorStatus;
};