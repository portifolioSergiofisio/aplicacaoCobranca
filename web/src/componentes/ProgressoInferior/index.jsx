import "./styles.css";

export default function ProgressoInferior({passo}) {
    return (
        <div className="containerProgressoInferior">
            <div
                className={"barraProgresso" + (passo === 1 ? " verde" : " ")}
            ></div>
            <div
                className={"barraProgresso" + (passo === 2 ? " verde" : " ")}
            ></div>
            <div
                className={"barraProgresso" + (passo === 3 ? " verde" : " ")}
            ></div>
        </div>
    );
}

