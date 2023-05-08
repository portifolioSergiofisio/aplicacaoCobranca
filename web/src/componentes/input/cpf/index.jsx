import InputMask from "react-input-mask";
import style from "./input.module.css";

export function InputCpf({ rotulo, erro, classe, ...inputProps }) {
  return (
    <div className="container">
      <label className={style.inputCpfLabel}>{rotulo}</label>
      <div className={`${style.container} ${classe}`}>
        <InputMask
          mask="999.999.999-99"
          type='text'
          id={rotulo}
          autoComplete="off"
          {...inputProps}
        />
      </div>
      {erro && <span className={style.mensagemErro}>{erro}</span>}
    </div>
  );
}