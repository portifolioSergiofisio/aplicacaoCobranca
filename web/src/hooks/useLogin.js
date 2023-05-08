import axios from '../servicos/api';
import { useMutation, useQueryClient } from 'react-query';
import { adicionarItem, limparLocalStorage } from '../utilidades/localStorage';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const queryClient = useQueryClient();
  const login = async (usuario) => {
    const resposta = await axios.post('/login', usuario);
    return resposta.data;
  };

  const { mutateAsync, data, isLoading, isError, error } = useMutation(login, {
    onSuccess: (dados) => {
      queryClient.invalidateQueries('usuario');

      adicionarItem('token', dados.token);
      adicionarItem('usuario', dados.nome);
      adicionarItem('id', dados.id);
    },
  });

  return { efetuarLogin: mutateAsync, dadosUsuario: data, isLoading, isError, error };
}

export function useFinalizarLogin() {
  const navigate = useNavigate();

  const finalizarLogin = () => {
    setTimeout(() => {
      limparLocalStorage();
      navigate('/');
    }, 500);
  };

  return finalizarLogin;
}
