import { useContext } from 'react';
import ContextoPrincipal from '../contexto/contextoProvedor';

export default function useContextoPrincipal() {
  return useContext(ContextoPrincipal);
}
