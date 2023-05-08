import { lazy, useState } from 'react';
import useContextoPrincipal from '../../hooks/useContextoPrincipal';
import './styles.css';

const CardInfoClientes = lazy(() => import('../../componentes/cardInfoClientes'));
const DetalhesDoCliente = lazy(() => import('../../componentes/DetalhesDoCliente'));

export default function PaginaClientes() {
  const [idCliente, setIdCliente] = useState('');
  const { mostrarDadosCliente } = useContextoPrincipal()

  return (
    <>
      <div className="containerClientes">
        <div className="corpo">
          {mostrarDadosCliente ? (
            <DetalhesDoCliente id={idCliente} />
          ) : (
            <CardInfoClientes setId={setIdCliente} id={idCliente} />
          )}
        </div>
      </div>
    </>
  );
}
