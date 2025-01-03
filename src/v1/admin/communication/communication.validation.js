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
  validateAddMethod: (req, res, next) => validateRequest(addMethodSchema, req.body, res, next),
  validateDeleteMethod: (req, res, next) => validateRequest(deleteMethodSchema, req.params, res, next),
  validateGetMethodByEmail: (req, res, next) => validateRequest(getMethodByEmailSchema, req.params, res, next)
};

function validateRequest(schema, data, res, next) {
  const { error } = schema.validate(data);
  if (error) {
    return res.status(400).json({ success: false, errors: error.details.map(e => e.message) });
  }
  next();
}
