const Joi = require('@hapi/joi');

// ✅ Validation for fetching companies
const CompanySchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
});

// ✅ Validation for adding a company
const CompanyAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
  }),
  adminEmail: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Admin email is required',
  }),
  location: Joi.string().optional(),
  linkedIn: Joi.string().uri().optional(),
  emails: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string().email())).optional(),
  phoneNumbers: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())).optional(),
  comments: Joi.string().optional(),
  periodicity: Joi.string().optional(),
});

// ✅ Validation for updating a company
const CompanyUpdateSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'ID must be a number',
    'any.required': 'ID is required for updating a company',
  }),
  name: Joi.string().optional(),
  adminEmail: Joi.string().optional(),
  location: Joi.string().optional(),
  linkedIn: Joi.string().uri().optional(),
  emails: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string().email())).optional(),
  phoneNumbers: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())).optional(),
  comments: Joi.string().optional(),
  periodicity: Joi.string().optional(),
});

// ✅ Validation for deleting a company
const CompanyDeleteSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'ID must be a number',
    'any.required': 'ID is required for deleting a company',
  }),
});

module.exports = {
  CompanySchema,
  CompanyAddSchema,
  CompanyUpdateSchema,
  CompanyDeleteSchema,
};
