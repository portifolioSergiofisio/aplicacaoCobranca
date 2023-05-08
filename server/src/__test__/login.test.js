const request = require('supertest');
const baseURL = 'http://localhost:8000';
const email = 'teste2@teste.com';
const senha = 'cubos123456';

describe('Testes de login', () => {
  test('Deve retornar erro se o email não for enviado', async () => {
    const response = await request(baseURL).post('/login').send(senha);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'email', 'O campo email é obrigatório');
  });

  test('Deve retornar erro se a senha não for enviada', async () => {
    await delay(1000);
    const response = await request(baseURL).post('/login').send(email);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'email', 'O campo email é obrigatório');
  });

  test('Deve retornar erro se o email estiver em branco', async () => {
    await delay(1000);
    const response = await request(baseURL).post('/login').send({ email: '', senha });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'email', 'O campo email é obrigatório');
  });

  test('Deve retornar erro se a senha estiver em branco', async () => {
    await delay(1000);
    const response = await request(baseURL).post('/login').send({ email, senha: '' });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'senha', 'O campo senha é obrigatório');
  });

  test('Deve retornar token se o email e senha estiverem corretos', async () => {
    const usuario = { email, senha };

    await  delay(1000);
    const response = await request(baseURL).post('/login').send(usuario);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
