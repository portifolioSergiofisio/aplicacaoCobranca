import { useState } from 'react';
import IconFechar from '../../assets/fechar.svg';
import ImgPapel from '../../assets/papel-cadastro-cobranca.svg';
import Input from '../input';
import { useAtualizarCobranca } from '../../hooks/useCobranca';
import { converterParaCentavos, formatarDataParaUtc, formatarDataUtc, formatarDinheiro } from '../../utilidades/funcoes';
import { tratarErros } from '../../schemas/tratamentoErros';
import schemaModalCobrancas from '../../schemas/schemaModalCobrancas';
import './styles.css';
import Botao from '../botao';

export default function ModalEditarCobranca({ cobranca, setEditarCobranca }) {
  const { atualizarCobranca, isLoading } = useAtualizarCobranca();
  const [avisoErro, setAvisoErro] = useState('');
  const [modalInputs, setModalInputs] = useState(cobranca);

  function atualizarDadosCobrancas(event) {
    const { name, value } = event.target;
    setModalInputs({ ...modalInputs, [name]: value });
  }

  function mudarStatusCobranca(event) {
    const statusCobranca = parseInt(event.target.id);
    setModalInputs({ ...modalInputs, status_id: statusCobranca });
  }

  async function handleSubmeter(e) {
    e.preventDefault();

    try {
      const tempCobranca = {
        ...modalInputs,
        valor: converterParaCentavos(modalInputs.valor),
        vencimento: formatarDataParaUtc(modalInputs.vencimento),
      };

      await schemaModalCobrancas.validate(tempCobranca, { abortEarly: false });
      await atualizarCobranca(tempCobranca);

      setTimeout(() => setEditarCobranca(false), 500);
    } catch (erro) {
      tratarErros(erro, setAvisoErro);
    }
  }

  return (
    <div className="fundoModal">
      <div className="modalConteudoCriarCobranca">
        <img className="iconeFechar fecharUsuario" src={IconFechar} onClick={() => setEditarCobranca(null)} alt="Fechar" />
        <div className="tituloCadastroCobranca">
          <img src={ImgPapel} alt="imagem_papel" />
          <h2>{'Edição de Cobrança'}</h2>
        </div>
        <form onSubmit={handleSubmeter} className="fomularioCriarCobranca">
          <Input rotulo="Nome*" classe={`inputCriarCobranca ${'correto'}`} tipo="text" marcador={'nome'} valor={modalInputs.nome} name="nome" disabled={true} />
          <div className="separacaoModalCobranca">
            <label>Descrição*</label>
            <textarea
              name="descricao"
              className={`descricaoCadastroCobranca ${avisoErro.descricao ? 'erro' : 'texareaCorreto'}`}
              placeholder="Digite a descrição"
              onChange={atualizarDadosCobrancas}
              value={modalInputs.descricao}
            />
            {avisoErro.descricao ? <h2 className="mensagem-erro">{avisoErro.descricao}</h2> : ''}
          </div>
          <div className="separacaoModalCobranca subDivDataValor">
            <Input
              rotulo="Data*"
              classe={avisoErro.vencimento ? 'erro' : 'correto'}
              tipo="date"
              marcador="Data de Vencimento"
              name="vencimento"
              onChange={atualizarDadosCobrancas}
              valor={formatarDataUtc(modalInputs.vencimento, 'YYYY-MM-DD')}
              erro={avisoErro.vencimento}
            />
            {
              <Input
                rotulo="Valor*"
                name="valor"
                className={avisoErro.valor ? 'erro' : 'correto'}
                placeholder="R$"
                onChange={atualizarDadosCobrancas}
                value={formatarDinheiro(modalInputs.valor)}
                erro={avisoErro.valor}
              />
            }
          </div>
          <div className="separacaoModalCobranca divStatus">
            <label>Status</label>
            <div className="inputRadio">
              <div id="2" className="divRadio">
                <input id="2" className={`radio ${modalInputs.status_id === 2 ? 'checado' : 'naoChecado'}`} type="checkbox" onChange={mudarStatusCobranca} />
                Cobrança Paga
              </div>
              <div id="1" className="divRadio">
                <input id="1" className={`radio ${modalInputs.status_id === 1 ? 'checado' : 'naoChecado'}`} type="checkbox" onChange={mudarStatusCobranca} />
                Cobrança Pendete
              </div>
            </div>
          </div>
          <div className="botoesCadastroCobranca">
            <button onClick={() => setEditarCobranca(null)} type="button" className="botaoCancelar largoCobranca">
              Cancelar
            </button>
            <Botao type="submit" className="botaoCadastro largoCobranca" texto='Aplicar' carregando={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}
