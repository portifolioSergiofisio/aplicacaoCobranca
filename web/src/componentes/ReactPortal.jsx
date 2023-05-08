import { createPortal } from 'react-dom';
import { useState, useLayoutEffect } from 'react';

function createWrapperAndAppendToBody(wrapperId) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

/**
 * Função encontrada mundo a fora


 * Renderiza os componentes filhos em um portal React envolvido por um elemento div anexado ao corpo do documento HTML.
 * 
 * @function ReactPortal
 * @param {object} props - O objecto props que contém os componentes filhos e o ID do invólucro opcional.
 * @param {ReactNode} props.children - Os componentes filhos a serem apresentados no portal.
 * @param {string} [props.wrapperId='react-portal-wrapper'] - O ID do elemento div do wrapper. O valor padrão é 'react-portal-wrapper'.
 * @returns {ReactNode} Os componentes filhos renderizados no portal.
 */
export function ReactPortal({ children, wrapperId = 'react-portal-wrapper' }) {
  const [wrapperElement, setWrapperElement] = useState(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}
