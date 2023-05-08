import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import concluido from '../../assets/concluido.svg';
import { useCadastrarUsuario } from '../../hooks/useCadastrarUsuario';
import { schemaCadastroPrimeiroPasso, schemaCadastroSegundoPasso } from '../../schemas/schemaClienteModal';
import { tratarErros } from '../../schemas/tratamentoErros';
import ProgressoInferior from './../ProgressoInferior';
import Botao from './../botao';
import Input from './../input';
import InputNome from '../input/nome';
import { InputEmail } from '../input/email';
import { InputSenha } from '../input/senha';
import './styles.css';

export default function CadastrarCliente({ passo, proximoPasso }) {
  const { cadastrarUsuario } = useCadastrarUsuario();

  const [avisoErro, setAvisoErro] = useState('');
  const [avisoErroGeral, setAvisoErroGeral] = useState('');
  const [inputsUsuario, setInputsUsuario] = useState({ nome: '', email: '', senha: '', confirmarSenha: '' });

  function atualizarDadosUsuario(e) {
    const { name, value } = e.target;
    setInputsUsuario((anterior) => ({ ...anterior, [name]: value }));
  }

  function limparErrosFocus() {
    setAvisoErro('');
    setAvisoErroGeral('');
  }

  async function confirmarCadastro(e) {
    e.preventDefault();

    try {
      const { nome, email, senha, confirmarSenha } = inputsUsuario;

      await schemaCadastroSegundoPasso.validate({ senha, confirmarSenha }, { abortEarly: false });

      await cadastrarUsuario({ nome, email, senha });

      proximoPasso(3);
    } catch (erro) {
      tratarErros(erro, setAvisoErro, setAvisoErroGeral);
    }
  }

  async function confirmarNomeEmail(e) {
    e.preventDefault();

    const { nome, email } = inputsUsuario;
    try {
      await schemaCadastroPrimeiroPasso().validate({ nome, email }, { abortEarly: false });

      return proximoPasso(2);
    } catch (erro) {
      tratarErros(erro, setAvisoErro, setAvisoErroGeral);
    }
  }

  return (
    <Fragment>
      {passo === 1 && (
        <div className="containerDados nomeEmail">
          <h1>Adicione seus dados</h1>
          <form className="formularioCadastro">
            <InputNome
              rotulo="Nome*"
              classe={avisoErro.nome ? 'erro' : 'correto'}
              name="nome"
              placeholder="Digite seu nome"
              value={inputsUsuario.nome}
              onChange={atualizarDadosUsuario}
              onFocus={limparErrosFocus}
              erro={avisoErro.nome}
            />
            <InputEmail
              classe={avisoErro.email ? 'erro' : 'correto'}
              rotulo="E-mail*"
              name="email"
              placeholder="Digite seu e-mail"
              value={inputsUsuario.email}
              onChange={atualizarDadosUsuario}
              onFocus={limparErrosFocus}
              erro={avisoErro.email}
            />
            <div className="containerContinuar">
              <Botao tipo="button" classe="botaoCadastro" onClick={confirmarNomeEmail} texto="Continuar" />
              <span>
                {`Já possui uma conta? Faça seu `}
                <Link to="/" className="textoLink">
                  <h2>Login</h2>
                </Link>
              </span>
            </div>
          </form>
          {avisoErroGeral && <span style={{ color: 'red' }}>{avisoErroGeral}</span>}
          <ProgressoInferior passo={passo} />
        </div>
      )}
      {passo === 2 && (
        <div className="containerDados nomeEmail">
          <h1>Escolha uma senha</h1>
          <form className="formularioCadastro">
            <InputSenha
              classe={`${avisoErro.senha ? 'erro' : ''}`}
              name="senha"
              placeholder="Senha*"
              value={inputsUsuario.senha}
              onChange={atualizarDadosUsuario}
              onFocus={limparErrosFocus}
              erro={avisoErro.senha}
            />

            <InputSenha
              classe={`${avisoErro.confirmarSenha ? 'erro' : ''}`}
              name="confirmarSenha"
              placeholder="Repita a senha*"
              onChange={atualizarDadosUsuario}
              onFocus={limparErrosFocus}
              value={inputsUsuario.confirmarSenha}
              erro={avisoErro.confirmarSenha}
            />

            {/* {avisoErro.confirmarSenha && <span className="mensagem-erro">{avisoErro.confirmarSenha}</span>} */}
            <div className="containerContinuar">
              <Botao tipo="submit" classe="botaoCadastro" onClick={confirmarCadastro} texto="Continuar" />
              <span>
                {`Já possui uma conta? Faça seu `}
                <Link to="/" className="textoLink">
                  <h2>Login</h2>
                </Link>
              </span>
            </div>
          </form>
          <ProgressoInferior passo={passo} />
        </div>
      )}
      {passo === 3 && (
        <div className="containerDados containerSucesso">
          <div className="sucesso">
            <div className="infoSucesso">
              <img src={concluido} alt="imagem cadastro concluido" />
              <h2>Cadastro realizado com sucesso!</h2>
            </div>
          </div>
          <Link to="/login" className="botaoIrLogin">
            Ir para Login
          </Link>
          <ProgressoInferior passo={passo} />
        </div>
      )}
    </Fragment>
  );
}
