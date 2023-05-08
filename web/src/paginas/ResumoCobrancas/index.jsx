import { memo, useCallback, useEffect, useState } from 'react';
import cobrancaPaga from '../../assets/home/cobranca-paga.svg';
import cobrancaPendente from '../../assets/home/cobranca-pendente.svg';
import cobrancaVencida from '../../assets/home/cobranca-vencida.svg';
import InfoTotalCobranca from '../../componentes/InfoTotalCobranca';
import SpinnerGeral from '../../componentes/basicos/SpinnerGeral';
import CardInfoStatusClientes from '../../componentes/cardInfoStatusClientes';
import CardInfoStatusCobranca from '../../componentes/cardInfoStatusCobrancas';
import useContextoPrincipal from '../../hooks/useContextoPrincipal';
import { filtrarClientes } from '../../utilidades/filtrarClientes';
import { filtrarCobrancas } from '../../utilidades/filtrarCobrancas';
import { formatarDinheiro } from '../../utilidades/funcoes';
import './styles.css';

function ResumoCobrancas() {
  const { dadosCobrancas, dadosClientes, carregando } = useContextoPrincipal();
  const [cobrancasPagas, setCobrancasPagas] = useState('');
  const [cobrancasPedentes, setCobrancasPedentes] = useState('');
  const [cobrancasVencidas, setCobrancasVencidas] = useState('');
  const [todosClientesEmDia, setClientesEmDia] = useState('');
  const [todosClientesInadimplentes, setClientesInadimplentes] = useState('');

  const obterClientes = useCallback(async () => {
    const listClientesEmDia = filtrarClientes.clientesEmDia(dadosClientes);
    const listaClientesInadimplente = filtrarClientes.clientesInadimplentes(dadosClientes);

    const cobrancasPagas = filtrarCobrancas.cobrancasPagas(dadosCobrancas);
    const cobrancasVencidas = filtrarCobrancas.cobrancasVencidas(dadosCobrancas);
    const cobrancasPendentes = filtrarCobrancas.cobrancasPendentes(dadosCobrancas);

    setCobrancasVencidas(cobrancasVencidas);
    setCobrancasPedentes(cobrancasPendentes);
    setCobrancasPagas(cobrancasPagas);
    setClientesEmDia(listClientesEmDia);
    setClientesInadimplentes(listaClientesInadimplente);
  }, [dadosCobrancas, dadosClientes]);

  useEffect(() => {
    obterClientes();
  }, [dadosCobrancas, obterClientes]);

  function somarValoresTabela(valores) {
    if (!Array.isArray(valores)) return 0;

    const soma = valores.reduce((valorAcumulado, valorAtual) => valorAcumulado + Number(valorAtual.valor), 0).toString();

    const valorFormatado = formatarDinheiro(soma);

    return valorFormatado;
  }

  if (carregando) {
    return <SpinnerGeral />;
  }

  return (
    <div className="containerResumoCobrancas">
      <div className="corpoResumoCobranca">
        <div className="totais">
          <InfoTotalCobranca imagem={cobrancaPaga} texto="Cobraças Pagas" valor={somarValoresTabela(cobrancasPagas)} classe="pagas" />
          <InfoTotalCobranca imagem={cobrancaVencida} texto="Cobranças Vencidas" valor={somarValoresTabela(cobrancasVencidas)} classe="vencidas" />
          <InfoTotalCobranca imagem={cobrancaPendente} texto="Cobranças Previstas" valor={somarValoresTabela(cobrancasPedentes)} classe="previstas" />
        </div>
        <div className="cardsInfoCobrancas">
          <div className="infoSuperior">
            <CardInfoStatusCobranca titulo="Cobranças vencidas" infoCliente={cobrancasVencidas} cabecalho="vencidas" />
            <CardInfoStatusCobranca titulo="Cobranças previstas" infoCliente={cobrancasPedentes} cabecalho="previstas" />
            <CardInfoStatusCobranca titulo="Cobranças pagas" infoCliente={cobrancasPagas} cabecalho="pagas" />
          </div>
          <div className="infoInferior">
            <CardInfoStatusClientes titulo="Clientes Inadimplentes" infoCliente={todosClientesInadimplentes} cabecalho="inadimplentes" />
            <CardInfoStatusClientes titulo="Clientes em dia" infoCliente={todosClientesEmDia} cabecalho="dia" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ResumoCobrancas);
