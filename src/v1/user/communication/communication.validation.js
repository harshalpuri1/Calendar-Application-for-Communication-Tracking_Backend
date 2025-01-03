const Joi = require('@hapi/joi');

// ✅ Validation for fetching communications
const CommunicationSchema = Joi.object({
  companyId: Joi.number().integer().required().messages({
    'number.base': 'Company ID must be a number',
    'any.required': 'Company ID is required',
  }),
});

// ✅ Validation for adding a communication
const CommunicationAddSchema = Joi.object({
  companyId: Joi.number().integer().required().messages({
    'number.base': 'Company ID must be a number',
    'any.required': 'Company ID is required',
  }),
  type: Joi.string().required().messages({
    'any.required': 'Type of communication is required',
  }),
  date: Joi.string().required().messages({
    'any.required': 'Date of communication is required',
  }),
  notes: Joi.string().optional(),
});

// ✅ Validation for updating a communication
const CommunicationUpdateSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'Communication ID must be a number',
    'any.required': 'Communication ID is required',
  }),
  type: Joi.string().optional(),
  date: Joi.string().optional(),
  notes: Joi.string().optional(),
});

// ✅ Validation for deleting a communication
const CommunicationDeleteSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'Communication ID must be a number',
    'any.required': 'Communication ID is required',
  }),
});

module.exports = {
  CommunicationSchema,
  CommunicationAddSchema,
  CommunicationUpdateSchema,
  CommunicationDeleteSchema,
};
