import moment from 'moment';
import { toast } from 'react-toastify';
import falha from '../assets/toast/iconeFalha.svg';
import Sucesso from '../assets/toast/iconeSucesso.svg';

export function feedBemVindo(nome) {
  toast.success(
    `Olá, ${nome}.
  Seja Bem vindo!`,
    {
      icon: () => <img className="iconeToastSucesso" src={Sucesso} alt="sucesso" />,
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      className: 'corDeFundoSucesso',
    }
  );
}

export function feedSucesso(titulo) {
  toast.success(titulo, {
    icon: () => <img className="iconeToastSucesso" src={Sucesso} alt="sucesso" />,
    position: 'bottom-right',
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    className: 'feedbackSucesso',
  });
}

export function feedErro(titulo) {
  toast.success(titulo, {
    icon: () => <img className="iconeToastSucesso" src={falha} alt="falha" />,
    position: `bottom-right`,
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    className: 'feedbackDelete',
  });
}

/**
 * Formata uma data para UTC utilizando a biblioteca MomentJS.
 *
 * @function formatarDataParaUtc
 * @param {Date} data - A data a ser formatada.
 * @returns {string} A data formatada em UTC.
 */
export function formatarDataParaUtc(data) {
  if (!data) return '';

  return moment(data).utc().format();
}

/**
 * Formata uma data para o formato brasileiro (DD/MM/YYYY).
 *
 * @function formatarDataParaBrasil
 * @param {Date|string} data - A data a ser formatada.
 * @returns {string} A data formatada no formato brasileiro.
 */
export function formatarDataParaBrasil(data, formato = 'DD/MM/YYYY') {
  return moment(data).format(formato);
}

export function formatarDataUtc(data, formato = 'DD/MM/YYYY') {
  return moment(data).format(formato);
}

export function formatarDataBrasil(data) {
  const dataObj = new Date(data);
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  return dataObj.toLocaleDateString('pt-BR', options);
}

export function definirStatusCobranca(cobranca) {
  const { status_id, vencimento } = cobranca;
  const hoje = moment();

  if (status_id === 2) {
    return 'paga';
  }

  if (status_id === 1 && moment(vencimento).isBefore(hoje, 'day')) {
    return 'vencida';
  }

  return 'pendente';
}

/**
 * Formata um valor numérico para o formato de dinheiro brasileiro.
 *
 * Considere como valor em centavos.
 *
 * @param {string} valor - O valor a ser formatado.
 * @returns {string} O valor formatado em reais.
 */
export function formatarDinheiro(valor) {
  let valorFormatado = valor.replace(/\D/g, '');
  valorFormatado = (valorFormatado / 100).toFixed(2) + '';
  valorFormatado = valorFormatado.replace('.', ',');
  valorFormatado = valorFormatado.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  return `R$ ${valorFormatado}`;
}

/**
 * Converte um valor monetário no formato de string para centavos.
 *
 * @param {string} valor - O valor monetário em brl no formato de string.
 * @returns {number} O valor convertido em centavos.
 */
export function converterParaCentavos(valor) {
  const valorSemCifrão = valor.replace(/[R$]/g, '');

  const valorSemPontos = valorSemCifrão.replace(/[.,]/g, '');

  const valorEmCentavos = parseInt(valorSemPontos);

  return valorEmCentavos;
}
