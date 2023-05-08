const request = require('supertest');
const servicoUsuario = require('../servicos/dbUsuario.servico');
const baseURL = 'http://localhost:8000';
require('dotenv').config();

describe('POST /cliente', () => {
  let token;
  const cliente = {
    nome: 'Nome do Cliente',
    email: 'email@cliente.com',
    cpf: '123.456.789-10',
    telefone: '(11) 99999-9999',
    endereco: {
      logradouro: 'Rua do Cliente',
      bairro: 'Bairro do Cliente',
      cidade: 'Cidade do Cliente',
      estado: 'MG',
      cep: '12345-678',
    },
  };

  const clienteAtualizado = {
    nome: 'Novo nome do cliente atualizado',
    email: 'novoemail@cliente.com',
    cpf: '987.654.321-00',
    telefone: '(11) 88888-8888',
    endereco: {
      logradouro: 'Nova rua do cliente',
      bairro: 'Novo bairro do Cliente',
      cidade: 'Nova cidade do Cliente',
      estado: 'SP',
      cep: '12345-678',
    },
  };

  beforeAll(async () => {
    token = servicoUsuario.criarToken('2');
  });

  test('Deve retornar erro de campo nome faltando', async () => {
    const { nome, ...clienteSemNome } = cliente;

    await delay(1000);
    const response = await request(baseURL).post('/cliente').set('Authorization', `Bearer ${token}`).send(clienteSemNome);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'nome', 'O campo nome é obrigatório');
  });

  test('Deve retornar erro de campo email faltando', async () => {
    const { email, ...clienteSemEmail } = cliente;

    await delay(1000);
    const response = await request(baseURL).post('/cliente').set('Authorization', `Bearer ${token}`).send(clienteSemEmail);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'email', 'O campo email é obrigatório');
  });

  test('Deve retornar erro de campo cpf faltando', async () => {
    const { cpf, ...clienteSemCpf } = cliente;

    await delay(1000);
    const response = await request(baseURL).post('/cliente').set('Authorization', `Bearer ${token}`).send(clienteSemCpf);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'cpf', 'O campo CPF é obrigatório');
  });

  test('Deve retornar erro de campo cpf formato inválido', async () => {
    await delay(1000);
    const cpfInvalido = {
      ...cliente,
      cpf: '11111111111',
    };
    const response = await request(baseURL).post('/cliente').set('Authorization', `Bearer ${token}`).send(cpfInvalido);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'cpf', 'A CPF deve estar no formato "xxx.xxx.xxx-xx"');
  });

  test('Deve retornar erro de campo telefone faltando', async () => {
    const { telefone, ...clienteSemTelefone } = cliente;

    await delay(1000);
    const response = await request(baseURL).post('/cliente').set('Authorization', `Bearer ${token}`).send(clienteSemTelefone);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'telefone', 'O campo telefone é obrigatório');
  });

  test('Deve retornar erro de campo nome com número', async () => {
    const cliente = {
      nome: 'Nome do Cliente 123',
    };

    await delay(1000);
    const response = await request(baseURL).post('/cliente').set('Authorization', `Bearer ${token}`).send(cliente);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'nome', 'O campo nome deve conter apenas letras');
  });

  test('Deve retornar erro de email inválido', async () => {
    const cliente = {
      nome: 'Nome do Cliente',
      email: 'email_invalido',
      cpf: '12345678901',
      telefone: '11999999999',
    };

    await delay(1000);
    const response = await request(baseURL).post('/cliente').set('Authorization', `Bearer ${token}`).send(cliente);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'email', 'O email informado não é válido');
  });

  test('Deve retornar erro de endereço estado inválido', async () => {
    const teste = {
      nome: 'Nome do Cliente',
      email: 'email@cliente.com',
      cpf: '123.456.789-01',
      telefone: '(11) 99999-9999',
      endereco: {
        logradouro: '',
        bairro: 'Bairro do Cliente',
        cidade: 'Cidade do Cliente',
        estado: 'Estado do Cliente',
        cep: '12345-678',
      },
    };

    await delay(1000);
    const response = await request(baseURL).post('/cliente').set('Authorization', `Bearer ${token}`).send(teste);

    expect(response.status).toBe(400);
    expect(response.body.mensagem.endereco).toEqual('O campo estado deve ter exatamente 2 caracteres');
  });

  test('Deve retornar erro de endereço cep inválido', async () => {
    const cepInvalido = {
      nome: 'Nome do Cliente',
      email: 'email@cliente.com',
      cpf: '123.456.789-01',
      telefone: '(11) 99999-9999',
      endereco: {
        logradouro: '',
        bairro: 'Bairro do Cliente',
        cidade: 'Cidade do Cliente',
        estado: 'Estado do Cliente',
        cep: '12345678',
      },
    };

    await delay(1000);
    const response = await request(baseURL).post('/cliente').set('Authorization', `Bearer ${token}`).send(cepInvalido);

    expect(response.status).toBe(400);
    expect(response.body.mensagem.endereco).toEqual('O campo cep deve estar no formato "XXXXX-XXX"');
  });

  test('Deve atualizar os dados do cliente corretamente', async () => {
    await delay(1000);
    const response = await request(baseURL).put(`/cliente/1`).set('Authorization', `Bearer ${token}`).send(clienteAtualizado);

    expect(response.status).toBe(200);
  });

  test('Deve retornar os dados atualizados do cliente', async () => {
    await delay(1000);
    const response = await request(baseURL).get(`/cliente/1`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(clienteAtualizado);
  });

  test('Deve atualizar para os dados originais do cliente', async () => {
    await delay(2000);

    const response = await request(baseURL).put(`/cliente/1`).set('Authorization', `Bearer ${token}`).send(cliente);
    expect(response.status).toBe(200);
  });

  test('Deve retornar os dados originais do cliente', async () => {
    await delay(1000);
    const response = await request(baseURL).get(`/cliente/1`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(cliente);
  });
});

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
