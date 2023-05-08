//import { validate } from 'gerador-validador-cpf';
import * as Yup from 'yup';
import { servicosApi } from '../servicos/api.servicos';

const nome = Yup.string().min(3, 'O nome deve ter pelo menos 3 caracteres').required('O nome é obrigatório');

const email = (id, alvo) =>
  Yup.string()
    .email('O e-mail deve ser um endereço válido')
    .matches(/^\S+@\S+\.\S+$/, 'Insira um email válido')
    .test('email', 'Este e-mail já está cadastrado', async (email) => {
      if (!email) return false;

      try {
        const campoBusca = 'email';
        const valorBusca = email;
        const campoId = id;
        await servicosApi.verificarCampo(campoBusca, valorBusca, campoId, alvo);
        return true;
      } catch (error) {
        return false;
      }
    })
    .required('O e-mail é obrigatório');

const cpf = (id, alvo) =>
  Yup.string()
    .length(14, 'O CPF deve ter 14 dígitos.')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido.')
    /* .test('cpf', 'CPF inválido', (cpf) => validate(cpf)) */
    .test('cpf', 'Este CPF já está cadastrado', async (cpf) => {
      if (!cpf) return false;

      try {
        const campoBusca = 'cpf';
        const valorBusca = cpf;
        const campoId = id;
        await servicosApi.verificarCampo(campoBusca, valorBusca, campoId, alvo);
        return true;
      } catch (error) {
        return false;
      }
    })
    .required('O CPF é obrigatório.');

const telefone = (id, alvo) =>
  Yup.string()
    .length(15, 'O telefone deve ter 15 dígitos.')
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido.')
    .test('telefone', 'Este telefone já está cadastrado', async (telefone) => {
      if (!telefone) return false;

      try {
        const campoBusca = 'telefone';
        const valorBusca = telefone;
        const campoId = id;
        await servicosApi.verificarCampo(campoBusca, valorBusca, campoId, alvo);
        return true;
      } catch (error) {
        return false;
      }
    })
    .required('O telefone é obrigatório.');

const senha = Yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('A senha é obrigatória');

const confirmarSenha = Yup.string()
  .oneOf([Yup.ref('senha'), null], 'As senhas precisam ser iguais')
  .required('A confirmação de senha é obrigatória');

export const schemaEditarUsuario = (id) => {
  const alvo = 'usuario';
  return Yup.object().shape({
    nome: nome,
    email: email(id, alvo),
    cpf: cpf(id, alvo),
    telefone: telefone(id, alvo),
    senha: senha,
    confirmarSenha: confirmarSenha,
  });
};

export const schemaClienteModal = (id) => {
  const alvo = 'cliente';
  return Yup.object().shape({
    nome: nome,
    email: email(id, alvo),
    cpf: cpf(id, alvo),
    telefone: telefone(id, alvo),
  });
};

export const schemaCadastroPrimeiroPasso = (id) =>
  Yup.object().shape({
    nome: Yup.string().min(3, 'O nome deve ter pelo menos 3 caracteres').required('O nome é obrigatório'),
    email: email(id, 'usuario'),
  });

export const schemaCadastroSegundoPasso = Yup.object().shape({
  senha: Yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('A senha é obrigatória'),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref('senha'), null], 'As senhas precisam ser iguais')
    .required('A confirmação de senha é obrigatória'),
});
