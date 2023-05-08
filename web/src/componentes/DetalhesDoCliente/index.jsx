import { Fragment, useEffect, useState } from 'react';
import iconeOrganizarCrescente from '../../assets/clientes/organizar-crescente.svg';
import iconeOrganizarDecrescente from '../../assets/clientes/organizar-decrescente.svg';
import iconeOrganizar from '../../assets/clientes/organizar.svg';
import iconeEditar from '../../assets/cobranca/editar-tabela.svg';
import iconeExcluir from '../../assets/cobranca/excluir-tabela.svg';
import iconeCadastro from '../../assets/icone-cadastro.svg';
import { useToggle } from '../../hooks/useToggle';
import { definirStatusCobranca, feedErro, formatarDataParaBrasil, formatarDinheiro } from '../../utilidades/funcoes';
import { localConfig } from '../../utilidades/localStorage';
import ModalCliente from '../ModalCliente';
import ModalCriarCobranca from '../ModalCriarCobranca';
import ModalEditarCobranca from '../ModalEditarCobranca';
import ModalExcuirCobranca from '../ModalExcluirCobranca';
import useContextoPrincipal from '../../hooks/useContextoPrincipal';
import Botao from '../botao';
import SpinnerGeral from '../basicos/SpinnerGeral';
import useOrdenarPesquisar from '../../hooks/useOrdenar';
import './styles.css';

export default function DetalhesDoCliente({ id }) {
  const { dadosClientes, dadosCobrancas, clienteAtivoPagina, carregando } = useContextoPrincipal();

  const [modalExcluir, setModalExcuir] = useState(false);
  const [modalEditarCliente, setModalEditarCliente] = useToggle();
  const [modalCriarCobranca, setModalCriarCobranca] = useToggle();
  const [editarCobranca, setEditarCobranca] = useState('');
  const [cobrancasCliente, setCobrancasCliente] = useState('');
  const [cliente, setCliente] = useState('');
  const [idCobranca, setIdCobranca] = useState('');
  const { ordenacaoAtual, handleOrdenar } = useOrdenarPesquisar(() => cobrancasCliente);

  function handleEditarCobranca(e, cobranca) {
    e.preventDefault();
    e.stopPropagation();
    setEditarCobranca(cobranca);
  }

  function handleExcluirCobranca(e, { id, vencimento, status_id }) {
    e.preventDefault();

    if ((status_id === 1 && new Date(vencimento) < new Date()) || status_id === 2) {
      return feedErro('Esta cobrança não pode ser excluída!');
    }

    setIdCobranca(id);
    return setModalExcuir(true);
  }

  useEffect(() => {
    localConfig.pegarClienteAtivo(clienteAtivoPagina);
  }, [clienteAtivoPagina]);

  useEffect(() => {
    const cob = dadosCobrancas.filter((cobranca) => cobranca.cliente_id === id) ?? [];
    setCobrancasCliente(cob);
    const c = dadosClientes.find((cliente) => cliente.id === id);
    setCliente(c);
  }, [dadosCobrancas, dadosClientes, id]);

  if (carregando || !cliente) {
    return <SpinnerGeral />;
  }

  return (
    <Fragment>
      <div className="DadosCliente">
        <div className="nomeDoCliente">
          <img src={iconeCadastro} alt="icone csadastro" />
          <h2 className="h2NomeCliente">{cliente.nome}</h2>
        </div>
        <div className="containerDetalhesCliente">
          <div className="containerDivs">
            <div className="primeiraDiv">
              <h2 className="h2Titulo">Dados do cliente</h2>
              <Botao classe={'botaoCancelar botaoCliente'} texto={'Editar Cliente'} onClick={setModalEditarCliente} />
            </div>
            <div className="segundaDiv">
              <div className="divDadosSuperior">
                <div className="primeiroDado">
                  <span className="spanDadosCliente">Email</span>
                  <p className="pDadosCliente">{cliente.email}</p>
                </div>
                <div className="segundoDado">
                  <span className="spanDadosCliente">Telefone</span>
                  <p className="pDadosCliente">{cliente.telefone}</p>
                </div>
                <div className="terceiroDado">
                  <span className="spanDadosCliente">CPF</span>
                  <p className="pDadosCliente">{cliente.cpf}</p>
                </div>
                <div className="quartoDado">
                  <span className="spanDadosCliente"></span>
                  <p className="pDadosCliente">{''}</p>
                </div>
                <div className="quintoDado">
                  <span className="spanDadosCliente"></span>
                  <p className="pDadosCliente">{''}</p>
                </div>
                <div className="sextoDado">
                  <span className="spanDadosCliente"></span>
                  <p className="pDadosCliente">{''}</p>
                </div>
              </div>
              <div className="divDadosInferior">
                <div className="primeiroDado">
                  <span className="spanDadosCliente">Endereço</span>
                  <p className="pDadosCliente">{cliente.endereco.logradouro}</p>
                </div>
                <div className="segundoDado">
                  <span className="spanDadosCliente">Bairro</span>
                  <p className="pDadosCliente">{cliente.endereco.bairro}</p>
                </div>
                <div className="terceiroDado">
                  <span className="spanDadosCliente">Complemento</span>
                  <p className="pDadosCliente">{cliente.endereco.complemento}</p>
                </div>
                <div className="quartoDado">
                  <span className="spanDadosCliente">CEP</span>
                  <p className="pDadosCliente">{cliente.endereco.cep}</p>
                </div>
                <div className="quintoDado">
                  <span className="spanDadosCliente">Cidade</span>
                  <p className="pDadosCliente">{cliente.endereco.cidade}</p>
                </div>
                <div className="sextoDado">
                  <span className="spanDadosCliente">UF</span>
                  <p className="pDadosCliente">{cliente.endereco.estado}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dadosCobrancaCliente">
          <div className="cabecalhoCobranca">
            <h2>Cobranças do Cliente </h2>
            <Botao texto="Nova cobrança" classe="btnCadastroCobranca botaoCadastro" onClick={setModalCriarCobranca} />
          </div>
          <div className="dadosTodasCobrancas">
            <div className="cabecalhoCobranca">
              <div className="itemCabecalhoCobranca item1" onClick={() => handleOrdenar('id')}>
                {ordenacaoAtual.tipo === 'id' && (
                  <Fragment>
                    {ordenacaoAtual.ordem === 'asc' && <img src={iconeOrganizarCrescente} width="15px" height="24px" alt="Ordem crescente" />}
                    {ordenacaoAtual.ordem === 'desc' && <img src={iconeOrganizarDecrescente} width="15px" height="24px" alt="Ordem decrescente" />}
                  </Fragment>
                )}
                {ordenacaoAtual.tipo !== 'id' && <img src={iconeOrganizar} width="15px" height="24px" alt="Ordem" />}
                <h2>ID Cob.</h2>
              </div>
              <div className="itemCabecalhoCobranca item2" onClick={() => handleOrdenar('vencimento')}>
                {ordenacaoAtual.tipo === 'vencimento' && (
                  <Fragment>
                    {ordenacaoAtual.ordem === 'asc' && <img src={iconeOrganizarCrescente} width="15px" height="24px" alt="Ordem crescente" />}
                    {ordenacaoAtual.ordem === 'desc' && <img src={iconeOrganizarDecrescente} width="15px" height="24px" alt="Ordem decrescente" />}
                  </Fragment>
                )}
                {ordenacaoAtual.tipo !== 'vencimento' && <img src={iconeOrganizar} width="15px" height="24px" alt="Ordem" />}
                <h2>Data de venc.</h2>
              </div>
              <div className="itemCabecalhoCobranca item3">
                <h2>Valor</h2>
              </div>
              <div className="itemCabecalhoCobranca item4">
                <h2>Status</h2>
              </div>
              <div className="itemCabecalhoCobranca item5">
                <h2>Descrição</h2>
              </div>
              <div className="itemCabecalhoCobranca item6">
                <h2></h2>
              </div>
            </div>
            <div className="corpoTabelaDetalhesCobranca">
              {cobrancasCliente
                ? cobrancasCliente.map((cobranca, key) => {
                    return (
                      <div className="itensCorpo" key={key}>
                        <div className="itemCorpoCobranca item1">
                          <h3>{cobranca.id}</h3>
                        </div>
                        <div className="itemCorpoCobranca item2">
                          <h3>{formatarDataParaBrasil(cobranca.vencimento)}</h3>
                        </div>
                        <div className="itemCorpoCobranca item3">
                          <h3>{formatarDinheiro(cobranca.valor)}</h3>
                        </div>
                        <div className="itemCorpoCobranca item4">
                          <h2 className={definirStatusCobranca(cobranca)}>{definirStatusCobranca(cobranca)}</h2>
                        </div>
                        <div className="itemCorpoCobranca item5">
                          <h3>{cobranca.descricao}</h3>
                        </div>
                        <div className="itemCorpoCobranca item6">
                          <img onClick={(e) => handleEditarCobranca(e, cobranca)} src={iconeEditar} alt="Icone Editar Cobrança" />
                          <img onClick={(e) => handleExcluirCobranca(e, cobranca)} src={iconeExcluir} alt="Icone Excluir Cobrança" />
                        </div>
                      </div>
                    );
                  })
                : ''}
            </div>
          </div>
        </div>
      </div>
      {editarCobranca ? <ModalEditarCobranca cobranca={editarCobranca} setEditarCobranca={setEditarCobranca} /> : ''}
      {modalExcluir ? <ModalExcuirCobranca id={idCobranca} setModalExcuir={setModalExcuir} /> : ''}
      {modalCriarCobranca ? <ModalCriarCobranca modalCobrancas={setModalCriarCobranca} infoCliente={cliente} /> : ''}
      {modalEditarCliente ? <ModalCliente titulo="Editar cliente" fecharModal={setModalEditarCliente} infoCliente={cliente} /> : ''}
    </Fragment>
  );
}
