import { useEffect } from "react";

/**
* Hook que permite detectar cliques fora de um elemento referenciado pelo usuário e executar uma função de retorno.
* 
* @function
* @name useAoClicarFora
* @param {React.RefObject} ref - Referência para o elemento que o usuário deseja detectar cliques fora.
* @param {Function} callback - Função de retorno que deve ser executada quando ocorrer um clique fora do elemento referenciado.
* @returns {void}
*/
export function useAoClicarFora(ref, callback) {
  useEffect(() => {
    const ouvinte = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      callback(e);
    };
    document.addEventListener("mousedown", ouvinte);
    document.addEventListener("touchstart", ouvinte);
    return () => {
      document.removeEventListener("mousedown", ouvinte);
      document.removeEventListener("touchstart", ouvinte);
    };
  }, [ref, callback]);
}
