import { memo } from "react";
import "./styles.css";

function InfoTotalCobranca({ imagem, texto, valor, classe }) {
  return (
    <div className={`infoCobranca ${classe}`}>
      <img src={imagem} width='30px' height='34px' alt="imagem" />
      <div>
        <h2 className="texto">{texto}</h2>
        <h2 className="valor">{valor}</h2>
      </div>
    </div>
  );
}

export default memo(InfoTotalCobranca)