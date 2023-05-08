CREATE TABLE clientes(
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  cpf TEXT NOT NULL UNIQUE,
  telefone TEXT NOT NULL UNIQUE,
  cep TEXT,
  logradouro TEXT,
  complemento TEXT,
  bairro TEXT,
  cidade TEXT,
  estado TEXT,
  status TEXT DEFAULT 'Em dia'
  );

  drop table if exists cobrancas;
  
  CREATE TABLE cobrancas(
    id SERIAL PRIMARY KEY,
    id_cliente INTEGER REFERENCES clientes(id),
    descricao TEXT NOT NULL,
    status VARCHAR(8),
    valor BIGINT NOT NULL,
    vencimento DATE NOT NULL
);

drop table if exists usuarios;

  CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    cpf TEXT UNIQUE,
    telefone TEXT UNIQUE
    );