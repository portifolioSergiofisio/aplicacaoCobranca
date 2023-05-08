import ImgExluirCobranca from '../../assets/excluir-cobranca.svg';
import { useDeletarCobranca } from '../../hooks/useCobranca';
import { feedSucesso } from '../../utilidades/funcoes';
import Botao from '../botao';
import './styles.css';

export default function ModalExcuirCobranca({ id, setModalExcuir }) {
  const { deletarCobranca, isLoading } = useDeletarCobranca();

  function fecharModalExluirCobranca() {
    setModalExcuir('');
  }

  async function handleDeletarCobranca(e) {
    e.preventDefault();

    deletarCobranca(id);
    feedSucesso('Cobrança excluída com sucesso!');
    fecharModalExluirCobranca();
  }

  return (
    <div className="fundoModal">
      <div className="modalExcluirCobranca">
        <img src={ImgExluirCobranca} alt="alerta excuir" />
        <span className="spanExcluirCobranca">Tem certeza que deseja excluir essa cobrança?</span>
        <div className="divBotaoExluirCobranca">
          <button onClick={fecharModalExluirCobranca} className="botaoNao">
            Não
          </button>
          <Botao className="botaoSim" onClick={handleDeletarCobranca} texto='Sim' carregando={isLoading} />
        </div>
      </div>
    </div>
  );
}
