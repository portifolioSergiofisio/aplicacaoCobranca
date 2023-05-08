import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {InputEmail} from '../../componentes/input/email';
import {InputSenha} from '../../componentes/input/senha';
import {useLogin} from '../../hooks/useLogin';
import {feedBemVindo} from '../../utilidades/funcoes';
import {tratarErros} from '../../schemas/tratamentoErros';
import Botao from '../../componentes/botao';
import './styles.css';

export default function Login() {
    const navigateTo = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const {efetuarLogin, dadosUsuario, isLoading} = useLogin();
    const [avisoErro, setAvisoErro] = useState('');
    const [avisoErroGeral, setAvisoErroGeral] = useState('');

    useEffect(() => {
        if (dadosUsuario) {
            feedBemVindo(dadosUsuario.nome);
            setTimeout(() => {
                navigateTo('/home');
            }, 1500);
        }
    }, [navigateTo, dadosUsuario]);

    async function handleSubmeter(e) {
        e.preventDefault();

        const usuario = {
            email,
            senha,
        };

        try {
            await efetuarLogin(usuario);
        } catch (erro) {
            tratarErros(erro, setAvisoErro, setAvisoErroGeral);
        }
    }

    return (
        <div className="containerLogin">
            <div className="esquerdaLogin">
                <h2 className="textoLogin">Gerencie todos os pagamentos da sua empresa em um só lugar.</h2>
            </div>
            <div className="direita">
                <h2>Faça seu login!</h2>
                <form onSubmit={handleSubmeter} className="form_login">
                    <InputEmail
                        className={avisoErro.email ? 'erro' : ''}
                        rotulo="E-mail"
                        placeholder="Digite seu e-mail"
                        onChange={(e) => setEmail(e.target.value.trim())}
                        value={email}
                        erro={avisoErro.email}
                    />
                    <InputSenha
                        className={avisoErro.senha ? 'erro' : ''}
                        rotulo={'Senha*'}
                        placeholder={'Digite sua senha'}
                        onChange={(e) => setSenha(e.target.value.trim())}
                        value={senha}
                        erro={avisoErro.senha}
                        esqueceu={true}
                    />
                    {avisoErroGeral && <span className="mensagem-erro">{avisoErroGeral}</span>}
                    <Botao tipo="submit" classe="botaoCadastro botaoLogin" texto="Entrar" carregando={isLoading}/>
                </form>
                <p className="possuirCadastro">
                    {`Ainda não possui conta? `}
                    <Link className="textoLink" to="/cadastro">
                        {' '}
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </div>
    );
}
