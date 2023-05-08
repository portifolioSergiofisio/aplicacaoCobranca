require('dotenv').config();
const express = require('express');
const rotas = require('./src/rotas');
const cors = require('cors');
const logDeErros = require('./src/intermediarios/tratamentoDeErros/logDeErros');
const tratamentoDeErros = require('./src/intermediarios/tratamentoDeErros/tratamentoDeErros');

const app = express();

app.use(cors());
app.use(express.json());

app.use(rotas);

app.use(logDeErros);
app.use(tratamentoDeErros);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Servidor rodando na url http://localhost:${port}`));
