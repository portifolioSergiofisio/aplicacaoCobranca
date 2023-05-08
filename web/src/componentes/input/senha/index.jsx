import { useState } from "react";
import olhoAberto from "../../../assets/olho-aberto.svg";
import olhoFechado from "../../../assets/olho-fechado.svg";
import style from "./input.module.css";

export function InputSenha({ rotulo, classe, erro, esqueceu, ...inputProps }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function handleMostrarSenha() {
    setMostrarSenha(!mostrarSenha);
  }

  return (
    <div>
      <div className={style.labelPassword}>
        <label>{rotulo}</label>
        {esqueceu && <span className='textoLink'>Esqueceu a senha?</span>}
      </div>
      <div className={`${style.container} ${classe}`}>
        <input
          type={mostrarSenha ? "text" : "password"}
          autoComplete="off"
          {...inputProps}
        />

        <img
          src={mostrarSenha ? olhoAberto : olhoFechado}
          className={mostrarSenha ? "" : style.olhoFechado}
          onClick={handleMostrarSenha}
          alt="icone visualizar senha"
        />
      </div>
      {erro && <span className={style.mensagemErro}>{erro}</span>}
    </div>
  );
}
