const Joi = require('@hapi/joi');
const{JoiErrors}=require('../../../utils/apiResponse')

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': JoiErrors.error.email,
        'any.required': JoiErrors.error.emailRequired
    }),
    otp: Joi.string().required().messages({
        'any.required': JoiErrors.error.otpRequired
    })
});


const sendOtpPasswordSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': JoiErrors.error.email,
        'any.required': JoiErrors.error.emailRequired
    }),
});



module.exports = {forgotPasswordSchema,sendOtpPasswordSchema};
