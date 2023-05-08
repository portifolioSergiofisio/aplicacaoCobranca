import { useState } from 'react';
import InputMask from 'react-input-mask';
import pesquisa from '../../assets/clientes/pesquisar.svg';
import olhoAberto from '../../assets/olho-aberto.svg';
import olhoFechado from '../../assets/olho-fechado.svg';
import './styles.css';

export default function Input({ tamanho, classeDivInput, classe, classe2, rotulo, tipo, marcador, valor, erro, ...inputProps }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function handleMostrarSenha() {
    setMostrarSenha(!mostrarSenha);
  }

  return (
    <div className={`${tamanho} todoInput`}>
      <div className={`labelEsqueceu ${classe2 === 'esqueceu' && 'esqueceu'}`}>
        <label htmlFor="">{rotulo}</label>
        {classe2 === 'esqueceu' ? <span className="esquecerSenha textoLink">Esqueceu a senha?</span> : ''}
      </div>
      <div className={`divInput ${classeDivInput}`}>
        {rotulo === 'CPF*' || rotulo === 'CPF' ? (
          <InputMask
            mask="999.999.999-99"
            className={classe}
            type={tipo}
            id={rotulo}
            placeholder={marcador}
            value={valor}
            {...inputProps}
          />
        ) : rotulo === 'Telefone*' || rotulo === 'Telefone' ? (
          <InputMask
            mask="(99) 99999-9999"
            className={classe}
            type={tipo}
            id={rotulo}
            placeholder={marcador}
            value={valor}
            {...inputProps}
          />
        ) : rotulo === 'CEP*' || rotulo === 'CEP' ? (
          <InputMask
            mask="99999-999"
            className={classe}
            type={tipo}
            id={rotulo}
            placeholder={marcador}
            value={valor}
            {...inputProps}
          />
        ) : rotulo === 'UF' ? (
          <input
            className={classe}
            type={tipo}
            id={rotulo}
            placeholder={marcador}
            maxLength={2}
            value={valor}
            {...inputProps}
          />
        ) : rotulo === 'Valor*' ? (
          <input
          type="text"
          {...inputProps}       
        />
        ) : (
          <input
            className={classe}
            type={
              rotulo === 'Senha*' || rotulo === 'Repita a senha*' || rotulo === 'Confirmar Senha*' || rotulo === 'Nova Senha*'
                ? mostrarSenha
                  ? 'text'
                  : 'password'
                : tipo
            }
            id={rotulo}
            placeholder={marcador}
            autoComplete="off"
            value={valor}
            {...inputProps}
          />
        )}
        {(rotulo === 'Senha*' || rotulo === 'Repita a senha*' || rotulo === 'Confirmar Senha*' || rotulo === 'Nova Senha*') && (
          <img
            src={mostrarSenha ? olhoAberto : olhoFechado}
            className={mostrarSenha ? '' : 'olho-fechado'}
            onClick={handleMostrarSenha}
            alt="icone visualizar senha"
          />
        )}
        {marcador === 'Pesquisa' ? <img src={pesquisa} alt="icone pesquisar" /> : ''}
      </div>
      {erro && <span className="mensagem-erro">{erro}</span>}
    </div>
  );
}
