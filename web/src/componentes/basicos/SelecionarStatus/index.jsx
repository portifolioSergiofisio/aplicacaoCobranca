import React from 'react';
import style from './styles.module.css';

function SelecionarStatus({ opcaoUm, opcaoDois, status, setStatus }) {
  const mudarStatusCobranca = (event) => {
    const novoStatus = parseInt(event.target.id);
    setStatus(novoStatus);
  };

  return (
    <div className={style.selecionarInput}>
      <span>Status</span>
      <div className={style.divStatusRadio}>
        <input
          id="1"
          className={`${style.radioStatus} ${status === 1 ? style.statusChecado : style.statusNaoChecado}`}
          type="radio"
          checked={status === 1}
          onChange={mudarStatusCobranca}
        />
        <span>{opcaoUm}</span>
      </div>
      <div className={style.divStatusRadio}>
        <input
          id="2"
          className={`${style.radioStatus} ${status === 2 ? style.statusChecado : style.statusNaoChecado}`}
          type="radio"
          checked={status === 2}
          onChange={mudarStatusCobranca}
        />
        <span>{opcaoDois}</span>
      </div>
    </div>
  );
}

export default SelecionarStatus;
