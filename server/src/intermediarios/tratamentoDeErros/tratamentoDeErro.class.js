class TratamentoDeErro extends Error {
  constructor(mensagem, codigoHttp) {
    super(mensagem);
    this.mensagem = mensagem;
    this.codigoHttp = codigoHttp;
  }
}

module.exports = TratamentoDeErro;
