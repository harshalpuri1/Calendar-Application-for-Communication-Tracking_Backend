const Boom = require('@hapi/boom');

/**
 * Middleware to validate request data using Joi schemas.
 * @param {object} schema - The Joi validation schema.
 * @returns {function} Middleware function for validation.
 */
const validate = (schema) => {    
  return (req, res, next) => {    
    // Validate request body
    if (schema.body) {
      const { error } = schema.body.validate(req.body);
      if (error) {
        return next(Boom.badRequest(error.details[0].message));
      }
    }

    // Validate request query
    if (schema.query) {
      const { error } = schema.query.validate(req.query);
      if (error) {
        return next(Boom.badRequest(error.details[0].message));
      }
    }

    // Validate request params
    if (schema.params) {
      const { error } = schema.params.validate(req.params);
      if (error) {
        return next(Boom.badRequest(error.details[0].message));
      }
    }    
    next();
  };
};

module.exports = validate;
