import * as Yup from 'yup';

const schemaModalCobrancas = Yup.object().shape({
  descricao: Yup.string().required('A descrição é obrigatória'),
  vencimento: Yup.date().nullable(false).typeError('A data de vencimento é obrigatória'),
  valor: Yup.string().test('valor', 'O valor é obrigatório', (value) => {
    if (!value) return false;

    const valorSemMascara = value.replace(/\D/g, '');
    if (valorSemMascara.length === 0) return false;

    const valorEmCentavos = parseInt(valorSemMascara);
    return valorEmCentavos > 0;
  }),

  status_id: Yup.number()
    .required('O status é obrigatório')
    .nullable(false)
    .test('has-selected-option', 'Você precisa escolher pelo menos uma opção', (value) => {
      return value === 1 || value === 2;
    }),
});

export default schemaModalCobrancas;
