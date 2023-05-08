import React, { createContext, useState } from 'react';
import { localConfig } from '../utilidades/localStorage';
import { useCobrancas } from '../hooks/useCobranca';
import { useUsuario } from '../hooks/useUsuario';
import { useCliente } from '../hooks/useCliente';

const ContextoPrincipal = createContext({});

export const PrincipalProvedor = ({ children }) => {
  const { data: usuario, isLoading: isLoadingUsuario } = useUsuario();
  
  const { data: cobrancas,  isLoading: isLoadingCobrancas } = useCobrancas();
  const { data: clientes,  isLoading: isLoadingClientes } = useCliente();
  const [filtroDadosPagina, setFiltroDadosPagina] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(localConfig.pegarPaginaAtual());
  const [mostrarDadosCliente, setMostrarDadosCliente] = useState(false);
  const [clienteAtivoPagina, setIdClienteAtivoPagina] = useState(localConfig.pegarClienteAtivo());

  const value = {
    dadosUsuario: usuario,
    dadosCobrancas: cobrancas,
    dadosClientes: clientes,
    trocarPaginaAtual: setPaginaAtual,
    carregando: isLoadingUsuario || isLoadingCobrancas || isLoadingClientes,
    mostrarDadosCliente,
    setMostrarDadosCliente,
    filtroDadosPagina,
    setFiltroDadosPagina,
    paginaAtual,
    clienteAtivoPagina, setIdClienteAtivoPagina,
  };

  return <ContextoPrincipal.Provider value={value}>{children}</ContextoPrincipal.Provider>;
};

export default ContextoPrincipal;
