import {useState} from 'react';
import PassosCadastro from '../../componentes/Passos';
import CadastrarCliente from '../../componentes/cadastrarCliente';
import './styles.css';

export default function Cadastro() {
    const [passo, setPasso] = useState(1)

    function proximoPasso(passo) {
        setPasso(passo)
    }

    return (
        <div className='containerCadastro'>
            <div className="esquerdaCadastro">
                <PassosCadastro passo={passo}/>
            </div>
            <div className="direita">
                <CadastrarCliente
                    passo={passo}
                    proximoPasso={proximoPasso}
                />
            </div>
        </div>
    )
}