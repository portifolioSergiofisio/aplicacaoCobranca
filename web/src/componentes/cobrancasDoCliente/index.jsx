import IconeOrganizar from '../../assets/clientes/organizar.svg'
import IconeEditar from '../../assets/cobranca/editar-tabela.svg'
import IconeEcluir from '../../assets/cobranca/excluir-tabela.svg'
import DadosCobranca from '../../cobrancaDoClienteDados'
import ModalExcuirCobranca from '../ModalExcluirCobranca'
import Botao from '../botao'
import './styles.css'

export default function CobrancasDoCliente() {
    return (
        <div className='containerCobrancaDoCliente'>
            <div className='tituloEBotao'>
                <h2 className='tituloCobrancaDoCliente'>Cobranças do Cliente</h2>
                <Botao
                    classe={'botaoCadastro novaCobranca'}
                    texto={'+ Nova Cobrança'}
                />
            </div>
            <div className='corpoCobrancaCliente'>
                <div className='linhaDaTabela'>
                    <span className='spanLinhaTabela cabecaDaTabela' >
                        <div className='idEData'>
                            <img src={IconeOrganizar} />
                            <h2> ID Cob.</h2>
                        </div>
                    </span>
                    <span className='spanLinhaTabela cabecaDaTabela'>
                        <div className='idEData'>
                            <img src={IconeOrganizar} />
                            <h2> Data de Venc.</h2>
                        </div>
                    </span>
                    <span className='spanLinhaTabela cabecaDaTabela'>Valor</span>
                    <span className='spanLinhaTabela cabecaDaTabela'>Status</span>
                    <span className='spanLinhaTabela cabecaDaTabela'>Descrição</span>
                </div>
                <div className='dadosCarregadosCliente'>
                    {DadosCobranca.length && DadosCobranca.map((itens) => {
                        return (

                            <div className='linhaDaTabela'>
                                <span className='spanLinhaTabela dadosDoCliente'>{itens.id}</span>
                                <span className='spanLinhaTabela dadosDoCliente'>{itens.data}</span>
                                <span className='spanLinhaTabela dadosDoCliente'>{itens.valor}</span>
                                <span className='spanLinhaTabela dadosDoCliente'>{itens.status}</span>
                                <span className='spanLinhaTabela descricaoDaCobranca dadosDoCliente'>{itens.descricao}</span>
                                <div className='iconesDaTabela'>
                                    <img
                                        className='spanLinhaTabela iconeTabelaCobranca'
                                        src={IconeEditar}
                                    />
                                    <img
                                        className='spanLinhaTabela iconeTabelaCobranca'
                                        src={IconeEcluir}
                                        onClick={abrirModalExluir}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {modalExcluir && <ModalExcuirCobranca setModalExcuir={setModalExcuir} />}
        </div>
    )
};