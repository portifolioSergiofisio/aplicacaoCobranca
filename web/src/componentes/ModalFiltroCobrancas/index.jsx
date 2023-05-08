import { useRef, useState } from 'react';
import { useAoClicarFora } from '../../hooks/useAoClicarFora';
import { ReactPortal } from '../ReactPortal';
import { filtrarCobrancas } from '../../utilidades/filtrarCobrancas';
import useContextoPrincipal from '../../hooks/useContextoPrincipal';
import Botao from '../botao';
import Input from '../input';
import './styles.css';
import SelecionarStatus from '../basicos/SelecionarStatus';

export default function ModalFiltroCobrancas({ setCobrancas, abrirModal, fecharModal }) {
  const modalRef = useRef();

  const { dadosCobrancas } = useContextoPrincipal();
  const [status, setStatus] = useState();
  const [data, setData] = useState('');

  function aplicarFiltroStatus() {
    const cobrancasFiltradas = filtrarCobrancas.cobrancasPorStatusEData(dadosCobrancas, status, data);

    setCobrancas(cobrancasFiltradas);
    setStatus(null);
    setData('');
    fecharModal(false);
  }

  useAoClicarFora(modalRef, fecharModal);

  if (!abrirModal) return;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <div ref={modalRef} className="modalFiltro">
        <div className="conteudoModalStatus">
        <SelecionarStatus opcaoUm='Pendentes' opcaoDois='Pagas' status={status} setStatus={setStatus} />
          <div className="divData">
            <Input rotulo="Data*" classe={`inputDataValor correto`} tipo="date" onChange={(e) => setData(e.target.value)} valor={data} />
          </div>
          <div className="divBotoesStatus">
            <Botao classe={'botaoCadastro largoStatus'} texto={'Aplicar'} onClick={aplicarFiltroStatus} />
            <Botao classe={'botaoCancelar largoStatus'} texto={'Cancelar'} onClick={() => fecharModal(false)} />
          </div>
        </div>
      </div>
    </ReactPortal>
  );
}
