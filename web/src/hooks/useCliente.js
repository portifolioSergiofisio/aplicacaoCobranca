import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from '../servicos/api';
import { localConfig } from '../utilidades/localStorage';
import { servicosApi } from '../servicos/api.servicos';

const config = localConfig.pegarAutorizacao()

async function clienteId(id) {
  const resposta = await axios.get(`/cliente/${id}`, config);
  return resposta.data;
}

export function useCliente() {
  return useQuery('cliente', servicosApi.pegarClientes, {
    staleTime: 2 * 60 * 1000, // 2 minutos
    retry: 3,
    retryDelay: 3000,
  });
}

export function useClienteId(id) {
  return useQuery(['cliente', id], () => clienteId(id));
}

export function useCadastrarCliente() {
  const queryClient = useQueryClient();

  const { refetch } = useCliente();

  const cadastrarCliente = async (cliente) => {
    const response = await axios.post('/cliente', cliente, config);
    return response.data;
  };

  const { mutateAsync, isLoading, isSuccess, isError, error } = useMutation(cadastrarCliente, {
    onSuccess: () => {
      queryClient.invalidateQueries('cliente');
      refetch();
    },
  });

  return { cadastrarCliente: mutateAsync, isLoading, isSuccess, isError, error };
}

export function useAtualizarCliente() {
  const queryClient = useQueryClient();

  const { refetch } = useCliente();

  const atualizarCliente = async (cliente) => {
    const { id, ...clienteAtualizado } = cliente;
    const response = await axios.put(`/cliente/${id}`, clienteAtualizado, config);
    return response.data;
  };

  const { mutateAsync, isLoading, isSuccess, isError, error } = useMutation(atualizarCliente, {
    onSuccess: () => {
      queryClient.invalidateQueries('cliente');
      refetch();
    },
  });

  return { atualizarCliente: mutateAsync, isLoading, isSuccess, isError, error };
}

function useDeletarCliente() {
  const queryClient = useQueryClient();

  const { refetch } = useCliente();

  const [mutate] = useMutation(
    async (id) => {
      const response = await fetch(`https://api.example.com/cliente/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      return data;
    },
    {
      onSuccess: () => {
        queryClient.removeQueries('cliente');
        refetch();
      },
    }
  );

  return mutate;
}
