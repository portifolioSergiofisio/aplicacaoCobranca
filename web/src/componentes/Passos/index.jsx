import IconeConcluido from "../../assets/icone-concluido.svg";
import IconePassoAtual from "../../assets/passo-atual.svg";
import IconePassoOutro from "../../assets/passo-outro.svg";
import "./styles.css";

export default function PassosCadastro({passo}) {
    return (
        <div className="progresso-vertical">
            <div className="progresso-stepper">
                <div className="progresso-step">
                    <div className="progresso-icones">
                        <img
                            src={passo === 1 ? IconePassoAtual : IconeConcluido}
                            alt="icone de progresso"
                        />
                    </div>
                    <div className="progresso-texto">
                        <strong className="step-titulo">Cadastre-se</strong>
                        <p className="step-dialogo">Por favor, escreva seu nome e e-mail</p>
                    </div>
                </div>
                <div className="barra-verde"></div>
                <div className="progresso-step">
                    <div className="progresso-icones">
                        {passo === 1 && (
                            <img src={IconePassoOutro} alt="icone de progresso"/>
                        )}
                        {passo === 2 && (
                            <img src={IconePassoAtual} alt="icone de progresso"/>
                        )}
                        {passo === 3 && (
                            <img src={IconeConcluido} alt="icone de progresso"/>
                        )}
                    </div>
                    <div className="progresso-texto">
                        <strong className="step-titulo">Escolha uma senha</strong>
                        <p className="step-dialogo">Escolha uma senha segura</p>
                    </div>
                </div>
                <div className="barra-verde"></div>
                <div className="progresso-step">
                    <div className="progresso-icones">
                        <img
                            src={passo === 3 ? IconeConcluido : IconePassoOutro}
                            alt="icone de progresso"
                        />
                    </div>
                    <div className="progresso-texto">
                        <strong className="step-titulo">
                            Cadastro realizado com sucesso
                        </strong>
                        <p className="step-dialogo">
                            E-mail e senha cadastrados com sucesso
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
