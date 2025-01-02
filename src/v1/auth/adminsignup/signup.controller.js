const bcrypt = require('bcryptjs');
const Boom = require('@hapi/boom');
const {signupSchema} = require('./signup.validation');
const {findUserEmail,createUser} = require('./signup.services');
const{ServerError,ServerSuccess,successResponse} = require('../../../utils/apiResponse');
const { object } = require('joi');


const signup = async (req, res,next) => {
    
    try {
        const { username, email, password } = req.body
        const existingUser = await findUserEmail(email);
        if (existingUser.length > 0) {
            throw Boom.conflict(ServerError.error.emailAlreadyExists);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await createUser(username, email, hashedPassword);
        const message= {
            message:ServerSuccess.success.userAddedSuccess
        }
        const successMessage = await successResponse(true,200,message)
        res.status(200).json(successMessage);
    }
     catch (error) {
       next(error)
     }
};

const validateSignup = (req, res, next) => {
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
     if (error) {
         const firstError = error.details[0]; 
         throw  Boom.badRequest(firstError.message);
    }

    next();
};


module.exports = {signup, validateSignup};
