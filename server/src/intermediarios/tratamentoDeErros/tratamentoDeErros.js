function tratamentoDeErros(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400) {
    const mensagem = "O corpo da requisição é inválido. Verifique os dados enviados e tente novamente.";
    res.status(400).json({ mensagem });
    return;
  }

  const mensagem = err.mensagem || "Erro interno no servidor";
  const codigoHttp = Number(err.codigoHttp) || 500;
  res.status(codigoHttp).json({ mensagem });
}

module.exports = tratamentoDeErros;
