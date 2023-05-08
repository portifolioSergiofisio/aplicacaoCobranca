import { memo } from 'react';
import iconeEmDia from '../../assets/home/cliente-em-dia.svg';
import iconeInadimplente from '../../assets/home/cliente-inadimplente.svg';
import useContextoPrincipal from '../../hooks/useContextoPrincipal';
import { BotaoTransparente } from '../botao';
import './styles.css';

function CardInfoStatusClientes({ titulo, cabecalho, infoCliente }) {
  const { trocarPaginaAtual, setFiltroDadosPagina } = useContextoPrincipal();

  function listarTodosClientes() {
    let filtro;
    switch (cabecalho) {
      case 'dia':
        filtro = 1;
        break;
      case 'inadimplentes':
        filtro = 2;
        break;
      default:
        filtro = null;
    }
    setFiltroDadosPagina(filtro);
    trocarPaginaAtual('clientes');
  }

  if (!infoCliente) return;

  return (
    <div className="cardInfo grande">
      <div className="cabecalhoCard">
        <div className="tituloIcone">
          {<img src={cabecalho === 'dia' ? iconeEmDia : iconeInadimplente} alt="Situação do cliente" />}
          {<h2 className="cabecalhoCardInfo">{titulo}</h2>}
        </div>
        <h2 className={`contagemCobranca ${cabecalho}Info`}>{infoCliente.length < 10 ? `0${infoCliente.length}` : infoCliente.length}</h2>
      </div>
      <div className="tabelaCobranca">
        <div className={`cabecalhoTabelaCliente`}>
          <h2 className="nomeCliente cabecalhoTabelaItem1grande">Cliente</h2>
          <h2 className="nomeCliente cabecalhoTabelaItem2grande">ID do clie.</h2>
          <h2 className="nomeCliente cabecalhoTabelaItem3grande">CPF</h2>
        </div>
        <div className="tabelaClientes">
          {infoCliente.length ? (
            infoCliente.slice(0, 4).map((cliente, key) => {
              return (
                <div key={key} className="cliente_grande">
                  <h2 className="nomeCliente cabecalhoTabelaItem1grande">{cliente.nome}</h2>
                  <h2 className="nomeCliente cabecalhoTabelaItem2grande">{cliente.id}</h2>
                  <h2 className="nomeCliente cabecalhoTabelaItem3grande">{cliente.cpf}</h2>
                </div>
              );
            })
          ) : (
            <h2 className="semCadastro">Não há cobranças cadastradas </h2>
          )}
        </div>
      </div>
      <BotaoTransparente className="linkTabelaBotao" onClick={listarTodosClientes}>
        Ver Todos
      </BotaoTransparente>
    </div>
  );
}

export default memo(CardInfoStatusClientes);
