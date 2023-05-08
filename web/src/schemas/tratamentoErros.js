export const tratarErros = (err, setAvisoErro, setAvisoGeral) => {
  const erros = {};

  if (err.response?.data?.mensagem) {
    return setAvisoGeral(err.response.data.mensagem);
  }

  if (err.name === 'ValidationError') {
    err.inner.forEach((erro) => {
      erros[erro.path] = erro.message;
    });
    return setAvisoErro(erros);
  }

  setAvisoGeral('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.');
};
