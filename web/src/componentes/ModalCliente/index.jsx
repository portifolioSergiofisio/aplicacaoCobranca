import {useEffect, useRef, useState} from 'react';
import IconFechar from '../../assets/fechar.svg';
import IconeCadastro from '../../assets/icone-cadastro.svg';

import {useAtualizarCliente, useCadastrarCliente} from '../../hooks/useCliente';
import {feedSucesso} from '../../utilidades/funcoes';
import {useAoClicarFora} from '../../hooks/useAoClicarFora';
import {schemaClienteModal} from '../../schemas/schemaClienteModal';
import {tratarErros} from '../../schemas/tratamentoErros';
import {servicosApi} from '../../servicos/api.servicos';
import Botao from '../botao/index';
import Input from '../input/index';
import './styles.css';

export default function ModalCliente({titulo, infoCliente, fecharModal}) {
    const {cadastrarCliente, isLoading: cadastrandoCliente} = useCadastrarCliente();
    const {atualizarCliente, isLoading: atualizandoCliente} = useAtualizarCliente();

    const modalRef = useRef();

    const [erroCep, setErroCep] = useState('');
    const [avisoErro, setAvisoErro] = useState('');
    const [avisoErroGeral, setAvisoErroGeral] = useState('');
    const [clienteInputs, setClienteInputs] = useState({
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
    });

    const [clienteEnderecoInputs, setClienteEnderecoInputs] = useState({
        logradouro: '',
        complemento: '',
        cep: '',
        bairro: '',
        cidade: '',
        estado: '',
    });

    const carregando = cadastrandoCliente || atualizandoCliente;

    function limparErrosFocus() {
        setAvisoErro('');
        setAvisoErroGeral('');
        setErroCep('');
    }

    function atualizarDadosCliente(event) {
        const {name, value} = event.target;
        setClienteInputs({...clienteInputs, [name]: value});
    }

    function atualizarEnderecoCliente(event) {
        const {name, value} = event.target;
        setClienteEnderecoInputs({...clienteEnderecoInputs, [name]: value});
    }

    async function atualizarDadosEnderecoCep() {
        const cepNumerico = clienteEnderecoInputs.cep.toString().replace(/\D/g, '');

        if (cepNumerico.length === 8) {
            const endereco = await servicosApi.buscarEndereco(cepNumerico);

            if (!endereco) {
                setErroCep('CEP inválido');
                return;
            }

            setClienteEnderecoInputs({
                logradouro: endereco.logradouro,
                complemento: endereco.complemento,
                cep: clienteEnderecoInputs.cep,
                bairro: endereco.bairro,
                cidade: endereco.localidade,
                estado: endereco.uf,
            });
        }
    }

    function limparCampos() {
        setClienteInputs({});
        setClienteEnderecoInputs({});
    }

    async function enviarCadastraoCliente(e) {
        e.preventDefault();

        try {
            const cliente = {...clienteInputs, endereco: {...clienteEnderecoInputs}};

            await schemaClienteModal().validate(cliente, {abortEarly: false});
            await cadastrarCliente(cliente);

            feedSucesso('Cadastro concluído com sucesso');
            limparCampos();
            fecharModal();
        } catch (erro) {
            tratarErros(erro, setAvisoErro, setAvisoErroGeral);
        }
    }

    async function enviarEditarCliente(e) {
        e.preventDefault();

        try {
            const clienteAtualizado = {
                id: infoCliente.id,
                ...clienteInputs,
                endereco: {
                    ...clienteEnderecoInputs,
                },
            };

            await schemaClienteModal(infoCliente.id).validate(clienteAtualizado, {abortEarly: false});
            await atualizarCliente(clienteAtualizado);

            setTimeout(() => {
                fecharModal();
            }, 500);
        } catch (erro) {
            tratarErros(erro, setAvisoErro, setAvisoErroGeral);
        }
    }

    useEffect(() => {
        if (infoCliente) {
            const {status, ...cliente} = infoCliente;
            setClienteInputs(cliente);
            setClienteEnderecoInputs(infoCliente.endereco);
        }
    }, [infoCliente]);

    useAoClicarFora(modalRef, fecharModal);

    return (
        <div className="fundoModal">
            <div ref={modalRef} className="modalConteudo">
                <div className="subModalConteudo">
                    <div className="divTitulo">
                        <div>
                            <img src={IconeCadastro} alt="icone cadastro"/>
                            <h1>{titulo}</h1>
                        </div>
                        <img className="iconeFechar" src={IconFechar} onClick={fecharModal} alt="fechar modal"/>
                    </div>
                    <div className="divFormulario">
                        <form className="formularioCliente"
                              onSubmit={!infoCliente ? enviarCadastraoCliente : enviarEditarCliente}>
                            <Input
                                rotulo="Nome*"
                                classe={avisoErro.nome ? 'erro' : 'correto'}
                                tipo="text"
                                marcador="Digite o nome"
                                valor={clienteInputs.nome}
                                name="nome"
                                onChange={atualizarDadosCliente}
                                onFocus={limparErrosFocus}
                                erro={avisoErro.nome}
                            />
                            <Input
                                rotulo="E-mail*"
                                classe={avisoErro.email ? 'erro' : 'correto'}
                                tipo="email"
                                marcador="Digite o e-mail"
                                valor={clienteInputs.email}
                                name="email"
                                onChange={atualizarDadosCliente}
                                onFocus={limparErrosFocus}
                                erro={avisoErro.email}
                            />
                            <div className="doisInputs">
                                <Input
                                    rotulo="CPF*"
                                    classe={avisoErro.cpf ? 'erro' : 'correto'}
                                    tipo="text"
                                    marcador="Digite o CPF"
                                    valor={clienteInputs.cpf}
                                    name="cpf"
                                    onChange={atualizarDadosCliente}
                                    onFocus={limparErrosFocus}
                                    erro={avisoErro.cpf}
                                />
                                <Input
                                    rotulo="Telefone*"
                                    classe={avisoErro.telefone ? 'erro' : 'correto'}
                                    tipo="text"
                                    marcador="Digite o telefone"
                                    valor={clienteInputs.telefone}
                                    name="telefone"
                                    onChange={atualizarDadosCliente}
                                    onFocus={limparErrosFocus}
                                    erro={avisoErro.telefone}
                                />
                            </div>
                            <Input
                                rotulo="Endereço"
                                classe={'correto'}
                                tipo="text"
                                marcador="Digite o endereço"
                                valor={clienteEnderecoInputs.logradouro}
                                name="logradouro"
                                onChange={atualizarEnderecoCliente}
                                onFocus={limparErrosFocus}
                            />
                            <Input
                                rotulo="Complemento"
                                classe={'correto'}
                                tipo="text"
                                marcador="Digite o complemento"
                                valor={clienteEnderecoInputs.complemento}
                                name="complemento"
                                onChange={atualizarEnderecoCliente}
                                onFocus={limparErrosFocus}
                            />
                            <div className="doisInputs">
                                <Input
                                    rotulo="CEP"
                                    classe={erroCep ? 'erro' : 'correto'}
                                    tipo="text"
                                    marcador="Digite o CEP"
                                    valor={clienteEnderecoInputs.cep}
                                    name="cep"
                                    onChange={atualizarEnderecoCliente}
                                    onFocus={limparErrosFocus}
                                    onBlur={atualizarDadosEnderecoCep}
                                    erro={erroCep}
                                />
                                <Input
                                    rotulo="Bairro"
                                    classe={'correto'}
                                    tipo="text"
                                    marcador="Digite o bairro"
                                    valor={clienteEnderecoInputs.bairro}
                                    name="bairro"
                                    onChange={atualizarEnderecoCliente}
                                    onFocus={limparErrosFocus}
                                />
                            </div>
                            <div className="doisInputs">
                                <Input
                                    rotulo="Cidade"
                                    classe={'correto'}
                                    tipo="text"
                                    marcador="Digite a cidade"
                                    valor={clienteEnderecoInputs.cidade}
                                    tamanho={'inputGrande'}
                                    name="endereco.cidade"
                                    onChange={atualizarEnderecoCliente}
                                    onFocus={limparErrosFocus}
                                />
                                <Input
                                    rotulo="UF"
                                    classe={'correto'}
                                    tipo="text"
                                    marcador="Digite a UF"
                                    valor={clienteEnderecoInputs.estado}
                                    tamanho={'inputPequeno'}
                                    name="endereco.estado"
                                    onChange={atualizarEnderecoCliente}
                                    onFocus={limparErrosFocus}
                                />
                            </div>
                            {avisoErroGeral && <span style={{color: 'red'}}>{avisoErroGeral}</span>}
                            <div className="divBotoes">
                                <Botao tipo="button" onClick={fecharModal} classe="botaoCancelar " texto="Cancelar"/>
                                <Botao tipo="submit" classe="botaoCadastro" texto="Aplicar" carregando={carregando}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
