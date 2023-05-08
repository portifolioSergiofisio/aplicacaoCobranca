import moment from 'moment';

/**
 * Um objeto que contém funções para filtrar cobranças.
 *
 * @namespace filtrarCobrancas
 */

export const filtrarCobrancas = {};

/**
 * Filtra as cobranças pagas, ou seja, aquelas com status "pago".
 *
 * @function cobrancasPagas
 * @param {object[]} cobrancas - Um array contendo as cobranças a serem filtradas.
 * @returns {object[]} Um array contendo as cobranças pagas.
 */
filtrarCobrancas.cobrancasPagas = function (cobrancas) {
  if (!cobrancas) return [];

  return cobrancas?.filter((cobranca) => cobranca.status_id === 2) || [];
};
/**
 * Filtra as cobranças pendentes, ou seja, aquelas com status "aberto" e que ainda não venceram.
 *
 * @function cobrancasPendentes
 * @param {object[]} cobrancas - Um array contendo as cobranças a serem filtradas.
 * @returns {object[]} Um array contendo as cobranças pendentes.
 */
filtrarCobrancas.cobrancasPendentes = function (cobrancas) {
  if (!cobrancas) return [];

  return cobrancas?.filter((cobranca) => {
    const hoje = moment().startOf('day');
    const dataVencimento = moment(cobranca.vencimento, 'YYYY-MM-DD');

    return cobranca.status_id === 1 && dataVencimento.isSameOrAfter(hoje);
  });
};
/**
 * Filtra as cobranças vencidas com status pendente.
 *
 * @function cobrancasVencidas
 * @param {object[]} cobrancas - Um array contendo as cobranças a serem filtradas.
 * @returns {object[]} Um array contendo as cobranças filtradas como vencidas e com status pendente.
 */
filtrarCobrancas.cobrancasVencidas = function (cobrancas) {
  if (!cobrancas) return [];

  return cobrancas?.filter((cobranca) => {
    const dataVencimento = moment(cobranca.vencimento, 'YYYY-MM-DD');
    const hoje = moment().startOf('day');
    return cobranca.status_id === 1 && dataVencimento.isBefore(hoje);
  });
};
/**
 * Filtra as cobranças de uma determinada data.
 *
 * @function cobrancasDoDia
 * @param {object[]} cobrancas - Um array contendo as cobranças a serem filtradas.
 * @param {string} data - A data a ser utilizada como filtro.
 * @returns {object[]} Um array contendo as cobranças filtradas pela data especificada.
 */
filtrarCobrancas.cobrancasDoDia = function (cobrancas, data) {
  if (!cobrancas) return [];

  return cobrancas?.filter((cobranca) => {
    const dataVencimento = moment(cobranca.vencimento, 'YYYY-MM-DD');
    return dataVencimento.isSame(data, 'day');
  });
};
/**
 * Filtra as cobranças por status e/ou data.
 *
 * @memberof filtrarCobrancas
 * @param {Array} cobrancas - Um array contendo as cobranças a serem filtradas.
 * @param {number} filtroStatus - O status a ser filtrado. Se não houver filtro, deixe em branco.
 * @param {string} filtroData - A data a ser filtrada. Se não houver data, deixe em branco.
 * @returns {Array} - Um array contendo as cobranças filtradas.
 */
filtrarCobrancas.cobrancasPorStatusEData = function (cobrancas, filtroStatus, filtroData) {
  if (!filtroStatus && !filtroData) {
    return cobrancas;
  }

  let filtradoPorStatus = [];

  if (filtroStatus === 1) {
    filtradoPorStatus = filtrarCobrancas.cobrancasPendentes(cobrancas);
  }

  if (filtroStatus === 2) {
    filtradoPorStatus = filtrarCobrancas.cobrancasPagas(cobrancas);
  }

  if (filtroData) {
    const filtradoPorData = filtrarCobrancas.cobrancasDoDia(cobrancas, filtroData);

    if (filtroStatus) {
      filtradoPorStatus = filtradoPorStatus.filter((cobranca) => filtradoPorData.includes(cobranca));
    } else {
      filtradoPorStatus = filtradoPorData;
    }
  }

  return filtradoPorStatus;
};

filtrarCobrancas.cobrancasPorNomeOuId = function (dadosCobrancas, valor) {
  return dadosCobrancas.filter((cobranca) => cobranca.nome.toLowerCase().includes(valor.toLowerCase()) || cobranca.id.toString().includes(valor.toLowerCase()));
};

filtrarCobrancas.comparadores = {
  asc: {
    id: (a, b) => a.id - b.id,
    cliente: (a, b) => a.nome.localeCompare(b.nome)
  },
  desc: {
    id: (a, b) => b.id - a.id,
    cliente: (a, b) => b.nome.localeCompare(a.nome)
  }
};