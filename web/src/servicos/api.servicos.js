import { localConfig } from '../utilidades/localStorage';
import axios from './api';

export const servicosApi = {};

const config = localConfig.pegarAutorizacao();

servicosApi.cadastrarUsuario = async function (usuario) {
  const resposta = await axios.post('/cadastro', usuario);
  return resposta.data;
};

servicosApi.pegarCobrancas = async function () {
  const jwt = localConfig.checarToken();

  if (jwt.error) return;

  const resposta = await axios.get('/cobranca', localConfig.pegarAutorizacao());
  return resposta.data;
};

servicosApi.pegarClientes = async function () {
  const jwt = localConfig.checarToken();

  if (jwt.error) return;

  const resposta = await axios.get('/cliente', localConfig.pegarAutorizacao());
  return resposta.data;
};

servicosApi.pegarCobrancasCliente = async function () {
  const jwt = localConfig.checarToken();

  if (jwt.error) return;

  const resposta = await axios.get(`/cobranca`, config);
  return resposta.data;
};

servicosApi.pegarCobrancaPorId = async function (id) {
  const jwt = localConfig.checarToken();

  if (jwt.error) return;

  const resposta = await axios.get(`/cobranca/${id}`, config);
  return resposta.data;
};

servicosApi.verificarCampo = async function (campoBusca, valorBusca, id, alvo) {
  try {
    await axios.get(`v/${alvo}?${campoBusca}=${valorBusca}&id=${id}`);
  } catch (erro) {
    if (erro.response.status === 400 || erro.response.data.mensagem === `O ${campoBusca} já está cadastrado.`) {
      throw new Error(`O ${campoBusca} já está cadastrado.`);
    } else {
      console.error(erro);
      throw new Error(`Erro ao verificar ${campoBusca} já cadastrado.`);
    }
  }
};

servicosApi.buscarEndereco = async function (cep) {
  if (!cep || cep.toString().replace(/\D/g, '').length !== 8) {
    return '';
  }
  const { data } = await axios.get(`/v/endereco/${cep}`);
  if (data.erro) {
    throw new Error('CEP não encontrado');
  }

  return data;
};
