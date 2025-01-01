const redis = require('../../../services/database/redis')
const boom = require('@hapi/boom');
const {verifyToken}= require('../../../services/auth/jwt.services')
const {ServerError}= require('../../../utils/apiResponse')

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw boom.unauthorized(ServerError.error.tokenNotFound);
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw boom.unauthorized(ServerError.error.tokenNotFound);
        }
        const decoded = verifyToken(token, process.env.SECRET_KEY);
        const session = await redis.get(decoded.userId);
        const decoded2 = verifyToken(session, process.env.SECRET_KEY);

        if (!session) {
            throw boom.unauthorized(ServerError.error.sessionNotFound);
        }
        if(decoded.sessionId != decoded2.sessionId){
            throw boom.unauthorized(ServerError.error.sessionExpired);
        }
        req.client = decoded;
        next();
    } catch (error) {
       next(error)
    }
};

module.exports = authenticate;
