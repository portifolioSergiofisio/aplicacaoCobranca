import { Fragment, useEffect, useState } from 'react';
import imgFiltro from '../../assets/clientes/botao-filtro.svg';
import iconeOrganizarCrescente from '../../assets/clientes/organizar-crescente.svg';
import iconeOrganizarDecrescente from '../../assets/clientes/organizar-decrescente.svg';
import iconeOrganizar from '../../assets/clientes/organizar.svg';
import imgPesquisa from '../../assets/clientes/pesquisar.svg';
import iconeEditar from '../../assets/cobranca/editar-tabela.svg';
import iconeExcluir from '../../assets/cobranca/excluir-tabela.svg';
import imgCobranca from '../../assets/icone-cobranca.svg';
import pesquisaNula from '../../assets/pesquisaNula.svg';
import ModalDetalhesCobranca from '../../componentes/ModalDetalhesCobranca';
import ModalEditarCobranca from '../../componentes/ModalEditarCobranca';
import ModalExcuirCobranca from '../../componentes/ModalExcluirCobranca';
import ModalFiltroCobrancas from '../../componentes/ModalFiltroCobrancas';
import useContextoPrincipal from '../../hooks/useContextoPrincipal';
import useOrdenarPesquisar from '../../hooks/useOrdenar';
import SpinnerGeral from '../../componentes/basicos/SpinnerGeral';
import { useToggle } from '../../hooks/useToggle';
import { filtrarCobrancas } from '../../utilidades/filtrarCobrancas';
import { definirStatusCobranca, feedErro, formatarDataBrasil, formatarDinheiro } from '../../utilidades/funcoes';
import './styles.css';

export default function PaginaCobrancas() {
  const { dadosCobrancas, filtroDadosPagina, carregando } = useContextoPrincipal();
  
  const [modalExcluir, setModalExcuir] = useState(false);
  const [cobrancaParaEditar, setCobrancaParaEditar] = useState('');
  const [modalDetalhes, setModalDetalhes] = useState(false);
  const [todasCobrancas, setTodasCobrancas] = useState('');
  const [modalStatus, setModalStatus] = useState(false);
  const [modalEditarCobranca, setModalEditarCobranca] = useToggle();
  const { ordenacaoAtual, handleOrdenar, handlePesquisa, pesquisa } = useOrdenarPesquisar(() => todasCobrancas);

  useEffect(() => {
    if (!Array.isArray(dadosCobrancas)) return;

    const filtros = {
      1: filtrarCobrancas.cobrancasPendentes,
      2: filtrarCobrancas.cobrancasPagas,
      3: filtrarCobrancas.cobrancasVencidas,
    };

    const listaCobrancas = filtros[filtroDadosPagina] ? filtros[filtroDadosPagina](dadosCobrancas) : dadosCobrancas;

    setTodasCobrancas(listaCobrancas);
  }, [filtroDadosPagina, dadosCobrancas]);

  function handleEditarCobranca(e, cobranca) {
    e.preventDefault();

    setCobrancaParaEditar(cobranca);
    setModalEditarCobranca();
  }

  function handleExcluirCobranca(e, cobranca) {
    e.preventDefault();
    e.stopPropagation();
    if ((cobranca.status_id === 1 && new Date(cobranca.vencimento) < new Date()) || cobranca.status_id === 2) {
      return feedErro('Esta cobrança não pode ser excluída!');
    }
    setCobrancaParaEditar(cobranca);
    return setModalExcuir(true);
  }

  function handleAbrirModalDetalhes(e, cobranca) {
    e.preventDefault();
    e.stopPropagation();

    setCobrancaParaEditar(cobranca);
    setModalDetalhes(true);
  }

  if (carregando) {
    return <SpinnerGeral />;
  }

  return (
    <div className="paginaCobranca">
      <div className="cabecalhoCard">
        <div className="divEsquerda">
          <img src={imgCobranca} alt="icone Clientes" />
          <h2 className="h2Cobranca">Cobranças</h2>
        </div>
        <div className="divDireita">
          <img
            id="modal-root"
            style={{ position: 'relative' }}
            onClick={() => setModalStatus(!modalStatus)}
            src={imgFiltro}
            width="40px"
            height="40px"
            alt="botão filtro"
          />
          <ModalFiltroCobrancas setCobrancas={setTodasCobrancas} abrirModal={modalStatus} fecharModal={setModalStatus} />
          <div className="inputPesquisaClientes">
            <input placeholder="Pesquisa" onChange={handlePesquisa} value={pesquisa} />
            <img src={imgPesquisa} alt="" />
          </div>
        </div>
      </div>
      <div className="corpoCobranca">
        <div className="cabecalhoTabelaCobranca">
          <div className="itemCabecalhoCobranca item1Cobranca" onClick={() => handleOrdenar('cliente')}>
            {ordenacaoAtual.tipo === 'cliente' && (
              <Fragment>
                {ordenacaoAtual.ordem === 'asc' && <img src={iconeOrganizarCrescente} width="15px" height="24px" alt="Ordem crescente" />}
                {ordenacaoAtual.ordem === 'desc' && <img src={iconeOrganizarDecrescente} width="15px" height="24px" alt="Ordem decrescente" />}
              </Fragment>
            )}
            {ordenacaoAtual.tipo !== 'cliente' && <img src={iconeOrganizar} width="15px" height="24px" alt="Ordem" />}
            <h2>Cliente</h2>
          </div>
          <div onClick={() => handleOrdenar('id')} className="itemCabecalhoCobranca item2Cobranca">
            {ordenacaoAtual.tipo === 'id' && (
              <Fragment>
                {ordenacaoAtual.ordem === 'asc' && <img src={iconeOrganizarCrescente} width="15px" height="24px" alt="Ordem crescente" />}
                {ordenacaoAtual.ordem === 'desc' && <img src={iconeOrganizarDecrescente} width="15px" height="24px" alt="Ordem decrescente" />}
              </Fragment>
            )}
            {ordenacaoAtual.tipo !== 'id' && <img src={iconeOrganizar} width="15px" height="24px" alt="Ordem" />}
            <h2>ID Cob.</h2>
          </div>
          <div className="itemCabecalhoCobranca item3Cobranca emailTabelaCliente">
            <h2>Valor</h2>
          </div>
          <div className="itemCabecalhoCobranca item4Cobranca">
            <h2>Data de venc.</h2>
          </div>
          <div className="itemCabecalhoCobranca item5Cobranca">
            <h2>Status</h2>
          </div>
          <div className="itemCabecalhoCobranca item6Cobranca">
            <h2>Descrição</h2>
          </div>
          <div className="itemCabecalhoCobranca item7Cobranca">
            <h2></h2>
          </div>
        </div>
        <div className="corpoTabelaCobranca">
          {todasCobrancas ? (
            todasCobrancas.map((cobranca, key) => {
              return (
                <div className="divCobranca" key={key}>
                  <div onClick={(e) => handleAbrirModalDetalhes(e, cobranca)} className="itemCorpoCobranca item1Cobranca">
                    <h2>{cobranca.nome}</h2>
                  </div>
                  <div onClick={(e) => handleAbrirModalDetalhes(e, cobranca)} className="itemCorpoCobranca item2Cobranca">
                    {' '}
                    <h2>{cobranca.id}</h2>
                  </div>
                  <div onClick={(e) => handleAbrirModalDetalhes(e, cobranca)} className="itemCorpoCobranca item3Cobranca emailTabelaCliente">
                    <h3>{formatarDinheiro(cobranca.valor)}</h3>
                  </div>
                  <div onClick={(e) => handleAbrirModalDetalhes(e, cobranca)} className="itemCorpoCobranca item4Cobranca">
                    <h3>{formatarDataBrasil(cobranca.vencimento)}</h3>
                  </div>
                  <div onClick={(e) => handleAbrirModalDetalhes(e, cobranca)} className="itemCorpoCobranca item5Cobranca">
                    <h2 className={definirStatusCobranca(cobranca)}>{definirStatusCobranca(cobranca)}</h2>
                  </div>
                  <div onClick={(e) => handleAbrirModalDetalhes(e, cobranca)} className="itemCorpoCobranca item6Cobranca">
                    <h2>{cobranca.descricao}</h2>
                  </div>
                  <div className="itemCorpoCobranca item7Cobranca">
                    <img onClick={(e) => handleEditarCobranca(e, cobranca)} src={iconeEditar} width="22px" height="32px" alt="icone editar" />
                    <img onClick={(e) => handleExcluirCobranca(e, cobranca)} src={iconeExcluir} width="25px" height="31px" alt="icone excluir" />
                  </div>
                </div>
              );
            })
          ) : (
            <h2 className="h2Cobranca">Não há cobranças cadastradas no sistema</h2>
          )}
          {todasCobrancas <= 0 ? <img className="pesquisaNula" src={pesquisaNula} alt="imagem pesquisa nula" /> : ''}
        </div>
      </div>
      {modalDetalhes && <ModalDetalhesCobranca cobranca={cobrancaParaEditar} setModalDetalhes={setModalDetalhes} />}
      {modalEditarCobranca && <ModalEditarCobranca cobranca={cobrancaParaEditar} setEditarCobranca={setModalEditarCobranca} />}
      {modalExcluir && <ModalExcuirCobranca id={cobrancaParaEditar.id} setModalExcuir={setModalExcuir} />}
    </div>
  );
}
