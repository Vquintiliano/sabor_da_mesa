const Joi = require('joi');

class UserValidator {
  validateRegister(data) {
    const schema = Joi.object({
      name: Joi.string().required().messages({
        'string.empty': 'Nome é obrigatório',
        'any.required': 'Nome é obrigatório'
      }),
      email: Joi.string().email().required().messages({
        'string.email': 'Email inválido',
        'string.empty': 'Email é obrigatório',
        'any.required': 'Email é obrigatório'
      }),
      password: Joi.string().min(6).required().messages({
        'string.min': 'Senha deve ter no mínimo 6 caracteres',
        'string.empty': 'Senha é obrigatória',
        'any.required': 'Senha é obrigatória'
      }),
      phone: Joi.string().required().messages({
        'string.empty': 'Telefone é obrigatório',
        'any.required': 'Telefone é obrigatório'
      }),
      address: Joi.string().required().messages({
        'string.empty': 'Endereço é obrigatório',
        'any.required': 'Endereço é obrigatório'
      }),
      role: Joi.string().valid('customer', 'chef', 'admin').default('customer')
    });

    return schema.validate(data);
  }

  validateLogin(data) {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        'string.email': 'Email inválido',
        'string.empty': 'Email é obrigatório',
        'any.required': 'Email é obrigatório'
      }),
      password: Joi.string().required().messages({
        'string.empty': 'Senha é obrigatória',
        'any.required': 'Senha é obrigatória'
      })
    });

    return schema.validate(data);
  }

  validateCreateUser(data) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      address: Joi.string().required(),
      role: Joi.string().valid('customer', 'chef', 'admin'),
      password: Joi.string().min(6).required()
    });

    return schema.validate(data);
  }

  validateUpdateUser(data) {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
      address: Joi.string()
    }).min(1);

    return schema.validate(data);
  }
}

module.exports = new UserValidator();
