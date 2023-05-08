import { useState } from 'react';
import IconFechar from '../../assets/fechar.svg';
import ImgPapel from '../../assets/papel-cadastro-cobranca.svg';
import Botao from '../botao';
import Input from '../input';
import InputNome from '../input/nome';
import { useCadastrarCobranca } from '../../hooks/useCobranca';
import { converterParaCentavos, formatarDataParaUtc, formatarDinheiro } from '../../utilidades/funcoes';
import schemaModalCobrancas from '../../schemas/schemaModalCobrancas';
import { tratarErros } from '../../schemas/tratamentoErros';
import './styles.css';

export default function ModalCriarCobranca({ modalCobrancas, infoCliente }) {
  const { cadastrarCobranca, isLoading } = useCadastrarCobranca();
  const [avisoErro, setAvisoErro] = useState('');
  const [modalInputs, setModalInputs] = useState({
    descricao: '',
    valor: '',
    vencimento: '',
    status_id: null,
  });

  function atualizarDadosCobrancas(event) {
    const { name, value } = event.target;
    setModalInputs({ ...modalInputs, [name]: value });
  }

  function mudarStatusCobranca(event) {
    const statusCobranca = parseInt(event.target.id);
    setModalInputs({ ...modalInputs, status_id: statusCobranca });
  }

  function limparErrosFocus() {
    setAvisoErro('');
  }

  async function enviarCadastrarCobranca(e) {
    e.preventDefault();

    try {
      const tempCobranca = {
        ...modalInputs,
        valor: converterParaCentavos(modalInputs.valor),
        vencimento: formatarDataParaUtc(modalInputs.vencimento),
      };

      await schemaModalCobrancas.validate(tempCobranca, { abortEarly: false });

      await cadastrarCobranca({
        ...tempCobranca,
        cliente_id: infoCliente.id,
      });

      setTimeout(() => {
        modalCobrancas();
      }, 500);
    } catch (erro) {
      tratarErros(erro, setAvisoErro);
    }
  }

  return (
    <div className="fundoModal">
      <div className="modalConteudoCriarCobranca">
        <img className="iconeFechar fecharUsuario" src={IconFechar} onClick={modalCobrancas} alt="Fechar" />
        <div className="tituloCadastroCobranca">
          <img src={ImgPapel} alt="imagem_papel" />
          <h2>{'Cadastro de Cobrança'}</h2>
        </div>
        <form onSubmit={enviarCadastrarCobranca} className="fomularioCriarCobranca">
          <div>
            <InputNome
              rotulo="Nome*"
              onChange={atualizarDadosCobrancas}
              value={infoCliente.nome}
              disabled={true}
            />
            <div className="separacaoModalCobranca">
              <label>Descrição*</label>
              <textarea
                name="descricao"
                className={`descricaoCadastroCobranca ${avisoErro.descricao ? 'erro' : 'texareaCorreto'}`}
                placeholder="Digite a descrição"
                value={modalInputs.descricao}
                onChange={atualizarDadosCobrancas}
                onFocus={limparErrosFocus}
              />
              {avisoErro.descricao && <span className="mensagem-erro">{avisoErro.descricao}</span>}
            </div>
            <div className="separacaoModalCobranca subDivDataValor">
              <Input
                rotulo="Data*"
                classe={`inputDataValor ${avisoErro.vencimento ? 'erro' : 'correto'}`}
                tipo="date"
                marcador="Data de Vencimento"
                name="vencimento"
                onChange={atualizarDadosCobrancas}
                onFocus={limparErrosFocus}
                valor={modalInputs.vencimento}
                erro={avisoErro.vencimento}
              />

              <Input
                rotulo="Valor*"
                name="valor"
                className={avisoErro.valor ? 'erro' : 'correto'}
                placeholder="R$"
                onChange={atualizarDadosCobrancas}
                onFocus={limparErrosFocus}
                value={formatarDinheiro(modalInputs.valor)}
                erro={avisoErro.valor}
              />
            </div>
            <div className="separacaoModalCobranca divStatus">
              <label>Status</label>
              <div className="inputRadio">
                <div className={`divRadio ${avisoErro.status_id ? 'erro' : 'correto'}`}>
                  <input id="2" className={`radio ${modalInputs.status_id === 2 ? 'checado' : 'naoChecado'}`} type="checkbox" onChange={mudarStatusCobranca} />{' '}
                  Cobrança Paga
                </div>
                <div className={`divRadio ${avisoErro.status_id ? 'erro' : 'correto'}`}>
                  <input id="1" className={`radio ${modalInputs.status_id === 1 ? 'checado' : 'naoChecado'}`} type="checkbox" onChange={mudarStatusCobranca} />
                  Cobrança Pendete
                </div>
              </div>
              {avisoErro.status_id && <span className="mensagem-erro">{avisoErro.status_id}</span>}
            </div>
          </div>
          <div className="botoesCadastroCobranca">
            <button onClick={modalCobrancas} type="button" className="botaoCancelar largoCobranca">
              Cancelar
            </button>
            <Botao tipo="submit" classe="botaoCadastro largoCobranca" texto="Aplicar" carregando={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}
