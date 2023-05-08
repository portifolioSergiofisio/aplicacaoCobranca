import { useRef, useState } from 'react';
import IconFechar from '../../assets/fechar.svg';
import { useAoClicarFora } from '../../hooks/useAoClicarFora';
import { useAtualizarUsuario } from '../../hooks/useUsuario';
import { InputCpf } from '../input/cpf';
import { InputEmail } from '../input/email';
import { InputSenha } from '../input/senha';
import { InputTelefone } from '../input/telefone';
import useContextoPrincipal from '../../hooks/useContextoPrincipal';
import { tratarErros } from '../../schemas/tratamentoErros';
import { schemaEditarUsuario } from '../../schemas/schemaClienteModal';
import { localConfig } from '../../utilidades/localStorage';
import Botao from '../botao';
import InputNome from '../input/nome';
import SpinnerGeral from '../basicos/SpinnerGeral';
import './styles.css';

export default function ModalUsuario({ fecharModal }) {
  const { dadosUsuario, carregando } = useContextoPrincipal();
  const { atualizarUsuario, isLoading } = useAtualizarUsuario();

  const [modalInputs, setModalInputs] = useState({ ...dadosUsuario, senha: '', confirmarSenha: '' });
  const [avisoErro, setAvisoErro] = useState('');

  const modalRef = useRef();

  function atualizarDadosUsuario(e) {
    const { name, value } = e.target;
    setModalInputs((anterior) => ({ ...anterior, [name]: value }));
  }

  function limparErrosFocus() {
    setAvisoErro('');
  }

  async function handleEditarUsuario(e) {
    e.preventDefault();

    try {
      await schemaEditarUsuario(localConfig.pegarIdUsuario()).validate(modalInputs, { abortEarly: false });

      const { confirmarSenha, ...usuario } = modalInputs;
      await atualizarUsuario(usuario);

      setModalInputs({});
      fecharModal();
    } catch (erro) {
      tratarErros(erro, setAvisoErro);
    }
  }

  useAoClicarFora(modalRef, fecharModal);

  if (carregando || !dadosUsuario) {
    return <SpinnerGeral />;
  }

  return (
    <div className="fundoModalUsuario">
      <div ref={modalRef} className="modalConteudoUsuario">
        <img className="iconeFechar fecharUsuario" src={IconFechar} onClick={fecharModal} alt="Fechar" />
        <div className="subModalConteudoUsuario">
          <h1>Edite seu cadastro</h1>
          <form onSubmit={handleEditarUsuario} className="formularioUsuario">
            <InputNome
              rotulo="Nome*"
              classe={`${avisoErro.nome ? 'erro' : ''}`}
              name="nome"
              placeholder="Digite o nome"
              value={modalInputs.nome}
              onChange={atualizarDadosUsuario}
              onFocus={limparErrosFocus}
              erro={avisoErro.nome}
            />
            <InputEmail
              rotulo="E-mail*"
              classe={`${avisoErro.email ? 'erro' : ''}`}
              name="email"
              placeholder="Digite o e-mail"
              value={modalInputs.email}
              onChange={atualizarDadosUsuario}
              erro={avisoErro.email}
            />

            <div className="doisInputs">
              <InputCpf
                rotulo="CPF*"
                classe={`${avisoErro.cpf ? 'erro' : ''}`}
                name="cpf"
                onChange={atualizarDadosUsuario}
                onFocus={limparErrosFocus}
                value={modalInputs.cpf}
                erro={avisoErro.cpf}
              />

              <InputTelefone
                rotulo="Telefone*"
                classe={`${avisoErro.telefone ? 'erro' : ''}`}
                name="telefone"
                value={modalInputs.telefone}
                onChange={atualizarDadosUsuario}
                onFocus={limparErrosFocus}
                erro={avisoErro.telefone}
              />
            </div>
            <InputSenha
              rotulo="Nova Senha*"
              classe={`${avisoErro.senha ? 'erro' : ''}`}
              name="senha"
              placeholder="Digite a nova senha"
              value={modalInputs.senha}
              onChange={atualizarDadosUsuario}
              onFocus={limparErrosFocus}
              erro={avisoErro.senha}
            />
            <InputSenha
              rotulo="Confirmar Senha*"
              classe={`${avisoErro.confirmarSenha ? 'erro' : ''}`}
              name="confirmarSenha"
              placeholder="Confirme sua senha"
              value={modalInputs.confirmarSenha}
              onChange={atualizarDadosUsuario}
              onFocus={limparErrosFocus}
              erro={avisoErro.confirmarSenha}
            />
            <div className="divBotao">
              <Botao classe="botaoCadastro" tipo="submit" texto="Aplicar" carregando={isLoading} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
