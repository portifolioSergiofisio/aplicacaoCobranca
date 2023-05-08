import btnFechar from '../../assets/fechar.svg';
import iconeCobranca from '../../assets/icone-cobranca.svg';
import { definirStatusCobranca, formatarDataParaBrasil, formatarDinheiro } from '../../utilidades/funcoes';
import './styles.css';

export default function ModalDetalhesCobranca({ cobranca, setModalDetalhes }) {
  return (
    <div className="fundoModal">
      <div className="modalDetalhes">
        <div className="cabecalhoDetalhes">
          <div className="iconeTitulo">
            <img src={iconeCobranca} alt="Icone cobrança" />
            <h2 className="tituloModalDetalhes">Detalhe da Cobrança</h2>
          </div>
          <img src={btnFechar} onClick={() => setModalDetalhes(null)} alt="iconeFechar Icone fechar" className="iconeFechar fecharUsuario" />
        </div>
        <div className="corpoDetalhes">
          <div className="nome">
            <h2 className="campo">Nome</h2>
            <h2 className="informacao">{cobranca.nome}</h2>
          </div>
          <div className="descricao">
            <h2 className="campo">Descrição</h2>
            <h2 className="informacao">{cobranca.descricao}</h2>
          </div>
          <div className="vencimentoValor">
            <div className="vencimento">
              <h2 className="campo">Vencimento</h2>
              <h2 className="informacao">{formatarDataParaBrasil(cobranca.vencimento)}</h2>
            </div>
            <div className="valor">
              <h2 className="campo">Valor</h2>
              <h2 className="informacao">{formatarDinheiro(cobranca.valor)}</h2>
            </div>
          </div>
          <div className="IdStatus">
            <div className="IdCobranca">
              <h2 className="campo">ID Cobrança</h2>
              <h2 className="informacao">{cobranca.id}</h2>
            </div>
            <div className="Status">
              <h2 className="campo">Status</h2>
              <h2 className={definirStatusCobranca(cobranca)}>{definirStatusCobranca(cobranca)}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
