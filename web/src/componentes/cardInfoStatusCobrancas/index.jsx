import { memo } from 'react';
import useContextoPrincipal from '../../hooks/useContextoPrincipal';
import { BotaoTransparente } from '../botao';
import './styles.css';

function CardInfoStatusCobranca({ titulo, classe, cabecalho, infoCliente }) {
  const { trocarPaginaAtual, setFiltroDadosPagina } = useContextoPrincipal();

  function formatarValor(valor) {
    const formatar = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return formatar;
  }

  function listaTodasCobrancas() {
    let filtro;
    switch (cabecalho) {
      case 'previstas':
        filtro = 1;
        break;
      case 'pagas':
        filtro = 2;
        break;
      case 'vencidas':
        filtro = 3;
        break;
      default:
        filtro = null;
    }
    setFiltroDadosPagina(filtro);
    trocarPaginaAtual('cobranças');
  }

  if (!infoCliente) return;

  return (
    <div className="cardInfo pequeno">
      <div className="cabecalhoCard">
        <div className="tituloIcone">
          <h2 className="cabecalhoCardInfo">{titulo}</h2>
        </div>
        <h2 className={`contagemCobranca ${cabecalho}Info`}>{infoCliente.length < 10 ? `0${infoCliente.length}` : infoCliente.length}</h2>
      </div>
      <div className="tabelaCobranca">
        <div className={`cabecalhoTabela`}>
          <h2 className="nomeCliente cabecalhoTabelaCobrancaItem1">Cliente</h2>
          <h2 className="nomeCliente cabecalhoTabelaCobrancaItem2">ID da cob.</h2>
          <h2 className="nomeCliente cabecalhoTabelaCobrancaItem3">Valor</h2>
        </div>
        <div className="tabelaClientes">
          {infoCliente.length ? (
            infoCliente.slice(0, 4).map(({ nome, id, vencimento, valor, cpf, cliente_id, status }, key) => {
              return (
                <div key={key} className="cliente">
                  <h2 className="nomeCliente cabecalhoTabelaCobrancaItem1">{nome}</h2>
                  <h2 className="nomeCliente cabecalhoTabelaCobrancaItem2">{id}</h2>
                  <h2 className="nomeCliente cabecalhoTabelaCobrancaItem3grande">{formatarValor(valor / 100)}</h2>
                </div>
              );
            })
          ) : (
            <h2 className="semCadastro">Não há cobranças cadastradas </h2>
          )}
        </div>
      </div>
      <BotaoTransparente className="linkTabelaBotao" onClick={listaTodasCobrancas}>
        Ver Todos
      </BotaoTransparente>
    </div>
  );
}

export default memo(CardInfoStatusCobranca);