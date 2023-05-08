const request = require('supertest');
const servicoUsuario = require('../servicos/dbUsuario.servico');
const baseURL = 'http://localhost:8000';
require('dotenv').config();

describe('POST /cadastro', () => {
  let token = '';

  const cliente = {
    nome: 'Nome do Usuario',
    email: 'email@usuario.com',
    senha: 'cubos123456',
  };

  beforeAll(async () => {
    token = servicoUsuario.criarToken('2');
  });

  /* test('Deve cadastrar um cliente com sucesso', async () => {


    const response = await request(baseURL).post('/cadastro').send(cliente);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  }); */

  test('Deve retornar erro de campo nome faltando', async () => {
    const { nome, ...nomeFaltando } = cliente;

    await delay(1000);
    const response = await request(baseURL).post('/cadastro').send(nomeFaltando);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'nome', 'O campo nome é obrigatório');
  });

  test('Deve retornar erro de campo email faltando', async () => {
    const { email, ...emailFaltando } = cliente;

    await delay(1000);
    const response = await request(baseURL).post('/cadastro').send(emailFaltando);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'email', 'O campo email é obrigatório');
  });

  test('Deve retornar erro de email inválido', async () => {
    const email_invalido = {
      ...cliente,
      email: 'email_invalido',
    };

    await delay(1000);
    const response = await request(baseURL).post('/cadastro').send(email_invalido);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'email', 'O email informado não é válido');
  });

  test('Deve retornar erro de email cadastrado', async () => {
    await delay(1000);
    const response = await request(baseURL).post('/cadastro').send(cliente);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'email', 'O e-mail já está cadastrado.');
  });

  test('Deve retornar erro de campo nome com número', async () => {
    const cliente = {
      nome: 'Nome do Cliente 123',
      email: 'email@cliente.com',
      senha: 'senha123',
    };

    await delay(1000);
    const response = await request(baseURL).post('/cadastro').send(cliente);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'nome', 'O campo nome deve conter apenas letras');
  });

  test('Deve retornar erro de cpf inválido', async () => {
    const cpf_invalido = {
      ...cliente,
      cpf: '123456789',
    };

    await delay(1000);
    const response = await request(baseURL).post('/cadastro').send(cpf_invalido);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'email', 'O email informado não é válido');
  });

  /* Rotas exigindo token do usuario  */

  test('Deve retornar erro de cpf cadastrado', async () => {
    const cpf_cadastrado = {
      ...cliente,
      cpf: '077.108.716-10',
    };

    await delay(1000);
    const response = await request(baseURL)
      .put('/usuario')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...cpf_cadastrado });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'cpf', 'O cpf já está cadastrado.');
  });

  test('Deve retornar erro de e-mail cadastrado', async () => {
    const emailCadastrado = {
      ...cliente,
      email: 'email@usuario.com',
    };

    await delay(1000);
    const response = await request(baseURL)
      .put('/usuario')
      .set('Authorization', `Bearer ${token}`)
      .send(emailCadastrado);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'email', 'O e-mail já está cadastrado.');
  });
});

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
