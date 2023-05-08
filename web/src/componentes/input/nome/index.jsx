import style from './input.module.css';

export default function InputNome({ rotulo, erro, classe, ...inputProps }) {
  return (
    <div className="container">
      <label className={style.inputCpfLabel}>{rotulo}</label>
      <div className={`${style.container} ${classe}`}>
        <input type="text" id={rotulo} {...inputProps} />
      </div>
      {erro && <span className={style.mensagemErro}>{erro}</span>}
    </div>
  );
}
