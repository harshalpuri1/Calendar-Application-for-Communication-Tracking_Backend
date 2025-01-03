const Joi = require('joi');

const addMethodSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(''),
  sequence: Joi.number().positive().required(),
  mandatory: Joi.boolean().required(),
  adminEmail: Joi.string().email().required()
});

const deleteMethodSchema = Joi.object({
  id: Joi.number().positive().required()
});

const getMethodByEmailSchema = Joi.object({
  email: Joi.string().email().required()
});

module.exports = {
  addMethodSchema,
  deleteMethodSchema,
  getMethodByEmailSchema
}

