const joi = require('joi');

const nomeSchema = joi
  .string()
  .pattern(/^[\p{L} ]+$/u)
  .min(3)
  .max(60)
  .trim()
  .normalize()
  .required()
  .messages({
    'string.empty': 'O campo nome é obrigatório',
    'string.min': 'O campo nome deve ter pelo menos {#limit} caracteres',
    'string.max': 'O campo nome deve ter no máximo {#limit} caracteres',
    'string.pattern.base': 'O campo nome deve conter apenas letras',
    'any.required': 'O campo nome é obrigatório',
  });

const emailSchema = joi
  .string()
  .email({ tlds: { allow: false }, minDomainSegments: 2 })
  .trim()
  .normalize()
  .required()
  .messages({
    'string.empty': 'O campo e-mail é obrigatório',
    'string.email': 'O email informado não é válido',
    'any.required': 'O campo e-mail é obrigatório',
  });

const senhaSchema = joi.string().pattern(/^\S+$/).min(3).max(30).required().messages({
  'string.empty': 'O campo senha é obrigatório',
  'string.pattern.base': 'A senha não pode conter espaços em branco',
  'string.min': 'A senha deve ter no mínimo {#limit} caracteres',
  'string.max': 'A senha deve ter no máximo {#limit} caracteres',
  'any.required': 'O campo senha é obrigatório',
});

const cpfSchema = joi
  .string()
  .length(14)
  .pattern(/^[\d.-]+$/)
  .required()
  .messages({
    'string.empty': 'O campo CPF é obrigatório',
    'string.base': 'O CPF deve ser uma string',
    'string.length': 'O CPF deve estar no formato "xxx.xxx.xxx-xx"',
    'string.pattern.base': 'O CPF deve conter apenas dígitos',
    'any.required': 'O campo CPF é obrigatório',
  });

const telefoneSchema = joi
  .string()
  .pattern(/^\(\d{2}\) \d{5}-\d{4}$/)
  .required()
  .messages({
    'string.empty': 'O campo telefone é obrigatório',
    'string.base': 'O telefone deve ser uma string',
    'string.pattern.base': 'O telefone deve ter o formato (xx) xxxxx-xxxx',
    'any.required': 'O campo telefone é obrigatório',
  })
  .messages({
    unknown: 'Campo não permitido',
  });

const enderecoSchema = joi.object({
  logradouro: joi.string().optional().allow(''),
  complemento: joi.string().optional().allow(''),
  cep: joi
    .string()
    .pattern(/^\d{5}-\d{3}$/)
    .optional()
    .allow('')
    .messages({
      'string.pattern.base': 'O campo cep deve estar no formato "XXXXX-XXX"',
    }),
  bairro: joi.string().optional().allow(''),
  cidade: joi.string().optional().allow(''),
  estado: joi.string().length(2).optional().allow('').messages({
    'string.length': 'O campo estado deve ter exatamente {#limit} caracteres',
  }),
});

const statusSchema = joi.number().integer().required().messages({
  'any.required': 'O campo status é obrigatório',
  'number.base': 'O campo status deve ser um número',
  'number.integer': 'O campo status deve ser um número inteiro',
  'number.only': 'O campo status deve ser 1 ou 2',
  'any.only': 'O campo status deve ter o valor 1 ou 2',
});

const cobrancaSchema = joi.object({
  cliente_id: joi.number().integer().required().messages({
    'any.required': 'O ID do cliente é obrigatório',
    'number.base': 'O ID do cliente deve ser um número inteiro',
  }),
  descricao: joi.string().required().messages({
    'any.required': 'A descrição da cobrança é obrigatória',
    'string.base': 'A descrição da cobrança deve ser uma string',
  }),
  vencimento: joi.date().iso().required().messages({
    'any.required': 'A data de vencimento é obrigatória',
    'date.base': 'O campo deve ser uma data válida',
    'date.format': 'O campo deve estar no formato ISO 8601',
  }),
  valor: joi.number().integer().required().messages({
    'any.required': 'O valor da cobrança é obrigatório',
    'number.base': 'O valor da cobrança deve ser um número inteiro',
  }),
  status_id: statusSchema.valid(1, 2, 3).messages({
    'number.only': 'O campo status deve ser 1, 2 ou 3',
    'any.only': 'O campo status deve ter o valor 1, 2 ou 3',
  }),
});

const inicioCadastroUsuarioSchema = joi.object({
  nome: nomeSchema,
  email: emailSchema,
});

const cadastroUsuarioSchema = joi.object({
  nome: nomeSchema,
  email: emailSchema,
  senha: senhaSchema,
});

const loginUsuarioSchema = joi.object({
  email: emailSchema,
  senha: senhaSchema,
});

const autalizarUsuarioSchema = joi.object({
  nome: nomeSchema,
  email: emailSchema,
  senha: senhaSchema,
  cpf: cpfSchema.optional().allow('').allow(null),
  telefone: telefoneSchema.optional().allow('').allow(null),
});

const cadastrarClienteSchema = joi
  .object({
    nome: nomeSchema,
    email: emailSchema,
    cpf: cpfSchema,
    telefone: telefoneSchema,
    endereco: enderecoSchema.optional().messages({
      'object.base': 'O campo endereco deve ser um objeto',
    }),
  })
  .unknown(false)
  .messages({
    'object.unknown': 'O campo {#key} não é permitido',
  });

const clienteStatusSchema = joi.object({
  status: statusSchema.valid(1, 2).messages({
    'number.only': 'O campo status deve ser 1 ou 2',
    'any.only': 'O campo status deve ter o valor 1 ou 2',
  }),
});

const validarEmailSchema = joi.object({
  email: emailSchema,
});

module.exports = {
  cadastroUsuarioSchema,
  loginUsuarioSchema,
  autalizarUsuarioSchema,
  inicioCadastroUsuarioSchema,
  cadastrarClienteSchema,
  clienteStatusSchema,
  validarEmailSchema,
  cobrancaSchema,
};
