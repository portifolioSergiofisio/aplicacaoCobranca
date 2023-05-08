const request = require('supertest');
const servicoUsuario = require('../servicos/dbUsuario.servico');
const baseURL = 'http://localhost:8000';
require('dotenv').config();

describe('POST /cliente', () => {
  let token;
  let cliente_id = 1;

  let nova_cobranca_id;

  const cobranca = {
    cliente_id: 1,
    descricao: 'teste cobrança',
    vencimento: new Date().toISOString(),
    valor: 100000,
    status_id: 1,
  };

  const cobrancaAtualizada = {
    descricao: 'teste cobrança atualizada',
    vencimento: new Date().toISOString(),
    valor: 200000,
    status_id: 2,
  };

  beforeAll(async () => {
    token = servicoUsuario.criarToken('1');
  });

  test('Deve cadastrar uma nova cobrança', async () => {
    const response = await request(baseURL).post(`/cobranca`).set('Authorization', `Bearer ${token}`).send(cobranca);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('descricao', cobranca.descricao);
    expect(response.body).toHaveProperty('valor', `${cobranca.valor}`);

    nova_cobranca_id = response.body.id;
  });

  test('Deve retornar erro com lista de cobrança', async () => {
    const response = await request(baseURL).get(`/cobranca`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'Por favor, informe o ID do cliente na query.');
  });

  test('Deve retornar sucesso com lista de cobrança', async () => {
    const response = await request(baseURL).get(`/cobranca?cliente_id=${cliente_id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  test('Deve retornar erro com uma cobrança', async () => {
    const response = await request(baseURL).get(`/cobranca/1?cliente_id=${cliente_id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('mensagem', 'Cobrança informada não encontrada.');
  });

  test('Deve retornar sucesso com uma cobrança', async () => {
    const response = await request(baseURL).get(`/cobranca/${nova_cobranca_id}?cliente_id=${cliente_id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  test('Deve atualiar com sucesso uma cobrança', async () => {
    const response = await request(baseURL)
      .put(`/cobranca/${nova_cobranca_id}?cliente_id=${cliente_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(cobrancaAtualizada);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('descricao', cobrancaAtualizada.descricao);
    expect(response.body).toHaveProperty('valor', '200000');
    expect(response.body).toHaveProperty('status_id', cobrancaAtualizada.status_id);
  });

  test('Deve da err ao deletar uma cobrança existe mas não pertence ao cliente', async () => {
    const response = await request(baseURL).del(`/cobranca/${nova_cobranca_id}?cliente_id=2`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
  
  test('Deve deletar sucesso uma cobrança', async () => {
    const response = await request(baseURL).del(`/cobranca/${nova_cobranca_id}?cliente_id=${cliente_id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
