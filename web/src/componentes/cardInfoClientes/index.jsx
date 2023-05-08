import { Fragment, useEffect, useState } from 'react';
import botaoFiltro from '../../assets/clientes/botao-filtro.svg';
import iconeCriarCobranca from '../../assets/clientes/criar-cobranca-tabela.svg';
import iconeOrganizarCrescente from '../../assets/clientes/organizar-crescente.svg';
import iconeOrganizarDecrescente from '../../assets/clientes/organizar-decrescente.svg';
import iconeOrganizar from '../../assets/clientes/organizar.svg';
import imgPesquisa from '../../assets/clientes/pesquisar.svg';
import iconeClientes from '../../assets/icone-cadastro.svg';
import pesquisaNula from '../../assets/pesquisaNula.svg';
import Botao from '../../componentes/botao/index';
import useContextoPrincipal from '../../hooks/useContextoPrincipal';
import useOrdenarPesquisar from '../../hooks/useOrdenar';
import { useToggle } from '../../hooks/useToggle';
import { filtrarClientes } from '../../utilidades/filtrarClientes';
import { adicionarItem } from '../../utilidades/localStorage';
import ModalCliente from '../ModalCliente';
import ModalCriarCobranca from '../ModalCriarCobranca/';
import ModalFiltroClientes from '../ModalFiltroClientes';
import './styles.css';
import SpinnerGeral from '../basicos/SpinnerGeral';

export default function CardInfoClientes({ setId, id }) {
  const { dadosClientes, setMostrarDadosCliente, filtroDadosPagina, carregando } = useContextoPrincipal();

  const [listaClientes, setListaClientes] = useState([]);
  const [modalCriarCobranca, setModalCriarCobranca] = useToggle();
  const [clienteAtual, setClienteAtual] = useState('');
  const [modalStatus, setModalStatus] = useToggle();
  const [modalCadastroCliente, setModalCadastroCliente] = useToggle();
  const { ordenacaoAtual, handleOrdenar, handlePesquisa, pesquisa } = useOrdenarPesquisar(() => listaClientes);

  useEffect(() => {
    if (!Array.isArray(dadosClientes)) return;

    const filtros = {
      1: filtrarClientes.clientesEmDia,
      2: filtrarClientes.clientesInadimplentes,
    };

    const listaCobrancas = filtros[filtroDadosPagina] ? filtros[filtroDadosPagina](dadosClientes) : dadosClientes;

    setListaClientes(listaCobrancas);
  }, [filtroDadosPagina, dadosClientes]);

  function handleMotrarCliente(e, id) {
    e.stopPropagation();
    e.preventDefault();
    adicionarItem('clienteAtivo', true);
    setId(id);
    setMostrarDadosCliente(true);
  }

  function handleAbrirModalCobranca(e, id, cliente) {
    e.preventDefault();
    e.stopPropagation();
    setClienteAtual(cliente);
    setId(id);
    setModalCriarCobranca(true);
  }

  if (carregando) {
    return <SpinnerGeral />;
  }

  return (
    <Fragment>
      <div className="cabecalhoCard">
        <div className="cabecalhoInfoCliente">
          <img src={iconeClientes} alt="icone Clientes" />
          <h2 className="h2Cliente">Clientes</h2>
        </div>
        <div className="botoesPesquisa">
          <Botao onClick={setModalCadastroCliente} classe="botaoCadastro largo" tipo="button" texto="+ Adicionar cliente" />
          <img id="modal-root" onClick={setModalStatus} src={botaoFiltro} alt="botão filtro" />
          <ModalFiltroClientes setCobrancas={setListaClientes} abrirModal={modalStatus} fecharModal={setModalStatus} />

          <div className="inputPesquisaClientes">
            <input placeholder="Pesquisa" onChange={handlePesquisa} value={pesquisa} />
            <img src={imgPesquisa} alt="" />
          </div>
        </div>
      </div>
      <div className="containerCard">
        <div className="tabela">
          <div className="cabecalhoCliente">
            <div className="itemCabecalhoCliente item1CardInfo" onClick={() => handleOrdenar('cliente')}>
              {ordenacaoAtual.tipo === 'cliente' && (
                <Fragment>
                  {ordenacaoAtual.ordem === 'asc' && <img src={iconeOrganizarDecrescente} width="15px" height="24px" alt="Ordem crescente" />}
                  {ordenacaoAtual.ordem === 'desc' && <img src={iconeOrganizarCrescente} width="15px" height="24px" alt="Ordem decrescente" />}
                </Fragment>
              )}
              {ordenacaoAtual.tipo !== 'cliente' && <img src={iconeOrganizar} width="15px" height="24px" alt="Ordem" />}
              <h2>Cliente</h2>
            </div>
            <div className="itemCabecalhoCliente item2CardInfo">
              <h2>CPF</h2>
            </div>
            <div className="itemCabecalhoCliente item3CardInfo emailTabelaCliente">
              <h2>E-mail</h2>
            </div>
            <div className="itemCabecalhoCliente item4CardInfo">
              <h2>Telefone</h2>
            </div>
            <div className="itemCabecalhoCliente item5CardInfo">
              <h2>Status</h2>
            </div>
            <div className="itemCabecalhoCliente item6CardInfo">
              <h2>Criar Cobrança</h2>
            </div>
          </div>
          <div className={listaClientes ? 'corpoTabela' : 'divpesquisaNula'}>
            {!!listaClientes
              ? listaClientes?.map((cliente, key) => {
                  return (
                    <div key={key}>
                      <h2 onClick={(e) => handleMotrarCliente(e, cliente.id)} className="nomeTabelaCliente itemCorpoTabelaCliente item1CardInfo">
                        {cliente.nome}
                      </h2>
                      <h2 className="itemCorpoTabelaCliente item2CardInfo">{cliente.cpf}</h2>
                      <h2 className="itemCorpoTabelaCliente emailTabelaCliente item3CardInfo">{cliente.email}</h2>
                      <h2 className="itemCorpoTabelaCliente item4CardInfo">{cliente.telefone}</h2>
                      <div className="itemCorpoTabelaCliente item5CardInfo">
                        <h2 className={`status ${cliente.status === 2 ? 'Inadimplente' : ''} ${cliente.status === 1 ? 'dia' : ''}`}>
                          {cliente.status === 2 && 'Inadimplente'}
                          {cliente.status === 1 && 'Em dia'}
                        </h2>
                      </div>
                      <div className="itemCorpoTabelaCliente item6CardInfo">
                        <img onClick={(e) => handleAbrirModalCobranca(e, id, cliente)} src={iconeCriarCobranca} alt="Criar Cobrança" />
                      </div>
                    </div>
                  );
                })
              : ''}
            {listaClientes <= 0 ? <img className="pesquisaNula" src={pesquisaNula} alt="imagem pesquisa nula" /> : ''}
          </div>
        </div>
      </div>
      {modalCriarCobranca ? <ModalCriarCobranca id={clienteAtual.id} modalCobrancas={setModalCriarCobranca} infoCliente={clienteAtual} /> : ''}
      {modalCadastroCliente && <ModalCliente titulo="Cadastrar cliente" fecharModal={setModalCadastroCliente} />}
    </Fragment>
  );
}
