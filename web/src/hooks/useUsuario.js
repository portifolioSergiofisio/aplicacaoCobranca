import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from '../servicos/api';
import { adicionarItem, localConfig } from '../utilidades/localStorage';

const config = {
  headers: { authorization: `Bearer ${localConfig.pegarToken()}` },
};

async function pegarUsuario() {
  const jwt = localConfig.checarToken();

  if (jwt.error) {
    console.log('ainda sem token');
    return;
  }

  const resposta = await axios.get('/usuario', localConfig.pegarAutorizacao());
  return resposta.data;
}

export function useUsuario() {
  return useQuery('usuario', pegarUsuario, {
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 5,
    retryDelay: 1500,
  });
}

export function useAtualizarUsuario() {
  const queryClient = useQueryClient();
  let nome;
  const atualizarUsuario = async (usuario) => {
    const { id: usuario_id, ...usuarioAtualizado } = usuario;
    const response = await axios.put('/usuario', usuarioAtualizado, config);
    nome = usuarioAtualizado.nome;
    return response.data;
  };

  const { mutateAsync, isLoading, isError, error } = useMutation(atualizarUsuario, {
    onSuccess: () => {
      queryClient.invalidateQueries('usuario');
      adicionarItem('usuario', nome);
    },
  });

  return { atualizarUsuario: mutateAsync, isLoading, isError, error };
}
