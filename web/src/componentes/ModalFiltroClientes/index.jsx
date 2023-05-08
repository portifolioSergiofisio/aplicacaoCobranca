import { useRef, useState } from 'react';
import { useAoClicarFora } from '../../hooks/useAoClicarFora';
import { ReactPortal } from '../ReactPortal';
import Botao from '../botao';
import SelecionarStatus from '../basicos/SelecionarStatus';
import { filtrarClientes } from '../../utilidades/filtrarClientes';
import useContextoPrincipal from '../../hooks/useContextoPrincipal';
import './styles.css';

export default function ModalFiltroClientes({ setCobrancas, abrirModal, fecharModal }) {
  const modalRef = useRef();

  const { dadosClientes } = useContextoPrincipal();
  const [status, setStatus] = useState();

  function aplicarFiltroStatus() {
    const clientesFiltradas = filtrarClientes.clientesPorStatus(dadosClientes, status);

    setCobrancas(clientesFiltradas);
    setStatus(null);
    fecharModal(false);
  }

  useAoClicarFora(modalRef, fecharModal);

  if (!abrirModal) return;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <div ref={modalRef} className="modalFiltro">
        <div className="conteudoModalStatus">
        <SelecionarStatus opcaoUm='Em dia' opcaoDois='Inadimplente' status={status} setStatus={setStatus} />
          <div className="divBotoesStatus">
            <Botao classe={'botaoCadastro largoStatus'} texto={'Aplicar'} onClick={aplicarFiltroStatus} />
            <Botao classe={'botaoCancelar largoStatus'} texto={'Cancelar'} onClick={() => fecharModal(false)} />
          </div>
        </div>
      </div>
    </ReactPortal>
  );
}
