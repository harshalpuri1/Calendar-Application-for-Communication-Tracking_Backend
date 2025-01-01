const bcrypt = require('bcryptjs');
const Boom = require('@hapi/boom');
const { findUserEmail } = require('./login.services');
const{loginSchema} = require('./login.validation');
const{ServerError, ServerSuccess,successResponse}= require('../../../utils/apiResponse');
const {signToken}= require('../../../services/auth/jwt.services');
const redis = require('../../../services/database/redis');
require('dotenv').config();
const expireTime = process.env.SESSION_EX_TIME;

const login = async (req, res,next) => {
    const { email, password } = req.body;

    try {
        const users = await findUserEmail(email);
        if (users.length === 0) {
            throw Boom.unauthorized(ServerError.error.invalidEmailOrPassword);
        }
        const user = users[0];
        
        const isMatch = await bcrypt.compare(password, user.password);
       
        if (!isMatch) {
            throw Boom.unauthorized(ServerError.error.invalidEmailOrPassword);
        }
        const session = await redis.get(user.id)
    
        if(session){
            redis.del(user.id, (err, reply) => {
                if (err) {
                    return next(Boom.internal(ServerError.error.sessionNotRemoved));
                }} );
        }
        const sessionId1 = await redis.get("sessionCounter");

        sessionCount = process.env.SESSION_START;

        if(!sessionId1){
            await redis.set("sessionCounter" , sessionCount, 'ex', expireTime,(err, reply)=>{
                if(err){
                    throw Boom.unauthorized(ServerError.error.sessionNotSet);  
                }}); 
        }else{

            const sessionId = parseInt(sessionId1)+1;

            await redis.set("sessionCounter" , sessionId, 'ex', expireTime,(err, reply)=>{
                if(err){
                    throw Boom.unauthorized(ServerError.error.sessionNotSet);  
                }});  
        }
        
        const sessionId = await redis.get("sessionCounter")
        
        const Token = signToken({...user,...{sessionId : sessionId} }) 
        
        redis.set(user.id , Token, 'ex', expireTime,(err, reply)=>{
        if(err){
            throw Boom.unauthorized(ServerError.error.sessionNotSet);  
        }});
       
    
   
        const message= {
        message:ServerSuccess.success.userLoginSuccess,
        "token" : Token
    }
    const successMessage = await successResponse(true,200,message)
    res.status(200).json(successMessage);

     
    } catch (error) {
      next(error);
    }
};

const validateLogin = (req, res, next) =>{
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
     if (error) {
         const firstError = error.details[0]; 
         throw  Boom.badRequest(firstError.message);
    }

    next();
};
module.exports = { login, validateLogin };
