import { useMutation } from 'react-query';
import { servicosApi } from '../servicos/api.servicos';

export function useCadastrarUsuario() {
  const { mutateAsync, isLoading } = useMutation(servicosApi.cadastrarUsuario);

  return { cadastrarUsuario: mutateAsync, isLoading };
}
