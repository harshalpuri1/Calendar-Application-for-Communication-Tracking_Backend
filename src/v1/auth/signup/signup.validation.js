const Joi = require('@hapi/joi');
const{JoiErrors}=require('../../../utils/apiResponse')

const signupSchema = Joi.object({
    username: Joi.string().required().messages({
        'string.base': JoiErrors.error.username,
        'any.required': JoiErrors.error.usernameRequired
    }),
    email: Joi.string().email().required().messages({
        'string.email': JoiErrors.error.email,
        'any.required': JoiErrors.error.emailRequired
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': JoiErrors.error.password,
        'any.required': JoiErrors.error.passwordRequired
    }),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': JoiErrors.error.confirmPassword,
        'any.required': JoiErrors.error.confirmPasswordRequired
    })
});


module.exports = {signupSchema};
