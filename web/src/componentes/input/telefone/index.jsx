import InputMask from "react-input-mask";
import style from "./input.module.css";

export function InputTelefone({ rotulo, erro, classe, ...inputProps }) {
  return (
    <div className="container">
      <label>{rotulo}</label>
      <div className={`${style.container} ${classe}`}>
        <InputMask
          mask="(99) 99999-9999"
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