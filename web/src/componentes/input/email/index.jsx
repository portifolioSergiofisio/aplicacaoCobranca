import style from "./input.module.css";

export function InputEmail({ rotulo, erro, classe, ...inputProps }) {
  return (
    <div>
      <label className={style.inputSenhaLabel}>{rotulo}</label>
      <div className={`${style.container} ${classe}`}>
        <input type="email" id={rotulo} {...inputProps} />
      </div>
      {erro && <span className={style.mensagemErro}>{erro}</span>}
    </div>
  );
}
