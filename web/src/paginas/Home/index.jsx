import { lazy, useEffect, useRef } from 'react';
import clientesAtivo from '../../assets/barra-lateral/clientes-ativo.svg';
import clientesInativo from '../../assets/barra-lateral/clientes-inativo.svg';
import cobrancaAtivo from '../../assets/barra-lateral/cobranca-ativo.svg';
import cobrancaInativo from '../../assets/barra-lateral/cobranca-inativo.svg';
import homeAtivo from '../../assets/barra-lateral/home-ativo.svg';
import homeInativo from '../../assets/barra-lateral/home-inativo.svg';
import IconeEditar from '../../assets/home/editar.svg';
import IconeSair from '../../assets/home/sair.svg';
import IconeVetor from '../../assets/home/vetor-baixo.svg';
import ModalUsuario from '../../componentes/ModalUsuario';
import { useAoClicarFora } from '../../hooks/useAoClicarFora';
import { useFinalizarLogin } from '../../hooks/useLogin';
import { useToggle } from '../../hooks/useToggle';
import { localConfig, removerItem } from '../../utilidades/localStorage';
import PaginaClientes from '../PaginaClientes/index';
import PaginaCobrancas from '../cobrancas';
import ResumoCobrancas from '../ResumoCobrancas';
import useContextoPrincipal from '../../hooks/useContextoPrincipal';
import './styles.css';

export default function Home() {
  const clienteAtivoPagina = localConfig.pegarClienteAtivo();

  const [usuario] = localConfig.pegarNomeUsuario();
  const editModalRef = useRef();
  const miniMenuRef = useRef();

  const [abrirMiniMenu, setAbrirMiniMenu] = useToggle();
  const [abrirModalEdite, setAbrirModalEdite] = useToggle();

  const finalizarLogin = useFinalizarLogin();
  const { paginaAtual, trocarPaginaAtual, setFiltroDadosPagina, setMostrarDadosCliente, carregando } = useContextoPrincipal();

  const paginasMain = {
    home: <ResumoCobrancas />,
    clientes: <PaginaClientes />,
    cobranças: <PaginaCobrancas />,
  };

  const trocarPagina = (e, pagina) => {
    e.preventDefault();

    removerItem('clienteAtivo');
    setMostrarDadosCliente(false);
    trocarPaginaAtual(pagina);
    setFiltroDadosPagina(null);
  };

  const abrirModalUsuario = () => {
    if (carregando) return;

    setAbrirMiniMenu();
    setAbrirModalEdite();
  };

  useEffect(() => {
    localConfig.adicionarPaginaAtual(paginaAtual);
  }, [paginaAtual]);

  useAoClicarFora(editModalRef, setAbrirMiniMenu);
  useAoClicarFora(miniMenuRef, setAbrirMiniMenu);

  return (
    <div className="containerHome">
      <div className="barraLateralCabecalho">
        <div className="barraLateral">
          <div className={`img`}>
            <img
              id="home"
              onClick={(e) => trocarPagina(e, 'home')}
              src={paginaAtual === 'home' ? homeAtivo : homeInativo}
              width="49px"
              height="74px"
              alt="icone Home"
            />
          </div>
          <div className={`img`}>
            <img
              id="clientes"
              onClick={(e) => trocarPagina(e, 'clientes')}
              src={paginaAtual === 'clientes' ? clientesAtivo : clientesInativo}
              width="59px"
              height="74px"
              alt="icone clientes"
            />
          </div>
          <div className={`img`}>
            <img
              id="cobranças"
              onClick={(e) => trocarPagina(e, 'cobranças')}
              src={paginaAtual === 'cobranças' ? cobrancaAtivo : cobrancaInativo}
              width="77px"
              height="74px"
              alt="icone cobranças"
            />
          </div>
        </div>
        <div style={{ width: 'calc(100% - 108px)' }}>
          <header>
            <div className="cabecalho">
              <h2 className="h2Cabecalho">{paginaAtual === 'home' && 'Resumo das cobranças'}</h2>
              <div className="usuarioLogado">
                <div className="nomeUsuarioLogado">
                  <div className="letraENome">
                    <h2 className="letraNome">{usuario[0]}</h2>
                    <span>{usuario}</span>
                    <img style={{ cursor: 'pointer', padding: '2px' }} onClick={setAbrirMiniMenu} src={IconeVetor} alt="abrir mini menu" />
                  </div>
                  {abrirMiniMenu && (
                    <div ref={miniMenuRef} className="modalCabecalho">
                      <img className="iconeModalTriangulo" src={IconeEditar} onClick={abrirModalUsuario} alt="editar usuario" />
                      <img className="iconeModalTriangulo" src={IconeSair} onClick={finalizarLogin} alt="sair" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {paginaAtual === 'clientes' && !clienteAtivoPagina ? <h2 className="clienteAtivo">Clientes</h2> : ''}
            {paginaAtual === 'cobranças' ? <h2 className="clienteAtivo">Cobranças</h2> : ''}
            {paginaAtual === 'clientes' && clienteAtivoPagina ? (
              <h2 className="clienteAtivo">
                <span onClick={(e) => trocarPagina(e, 'clientes')} className="spanverde">
                  Clientes
                </span>{' '}
                <span className="separador spancinza">{'>'}</span> <span className="spancinza">Detalhes do cliente</span>
              </h2>
            ) : (
              ''
            )}
          </header>
          <div className="corpoHome">{paginasMain[paginaAtual]}</div>
        </div>
      </div>
      {abrirModalEdite && <ModalUsuario fecharModal={setAbrirModalEdite} fecharMenu={setAbrirMiniMenu} />}
    </div>
  );
}
