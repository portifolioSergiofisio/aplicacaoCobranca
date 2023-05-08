import { useState, useMemo } from 'react';

function useOrdenarPesquisar(dadosFn) {
  const [ordenacao, setOrdenacao] = useState({ tipo: null, crescente: true });
  const [ordenacaoAtual, setOrdenacaoAtual] = useState({ tipo: '', ordem: 'asc' });
  const [pesquisa, setPesquisa] = useState('');

  const dadosOrdenados = dadosFn();

  const ordenarDados = useMemo(() => {
    const comparadores = {
      asc: {
        id: (a, b) => a.id - b.id,
        cliente: (a, b) => a.nome.localeCompare(b.nome),
        vencimento: (a, b) => Date.parse(a.vencimento) - Date.parse(b.vencimento),
      },
      desc: {
        id: (a, b) => b.id - a.id,
        cliente: (a, b) => b.nome.localeCompare(a.nome),
        vencimento: (a, b) => Date.parse(b.vencimento) - Date.parse(a.vencimento),
      },
    };

    if (ordenacao.tipo) {
      dadosOrdenados.sort(comparadores[ordenacao.crescente ? 'asc' : 'desc'][ordenacao.tipo]);
    }

    if (pesquisa) {
      return dadosOrdenados.filter((cliente) => cliente.nome.toLowerCase().includes(pesquisa.toLowerCase()));
    }

    return dadosOrdenados;
  }, [dadosOrdenados, ordenacao, pesquisa]);

  const handleOrdenar = (tipo) => {
    setOrdenacao((prevOrdenacao) => {
      if (prevOrdenacao.tipo === tipo) {
        return { tipo, crescente: !prevOrdenacao.crescente };
      }
      return { tipo, crescente: true };
    });

    setOrdenacaoAtual((prevOrdenacaoAtual) => {
      if (prevOrdenacaoAtual.tipo === tipo) {
        return { tipo, ordem: prevOrdenacaoAtual.ordem === 'asc' ? 'desc' : 'asc' };
      }
      return { tipo, ordem: 'asc' };
    });
  };

  const handlePesquisa = (event) => {
    setPesquisa(event.target.value);
  };

  return { ordenacaoAtual, ordenarDados, handleOrdenar, handlePesquisa, pesquisa };
}

export default useOrdenarPesquisar;
