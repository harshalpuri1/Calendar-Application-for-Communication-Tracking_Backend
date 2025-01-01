const Boom = require('@hapi/boom');
const redis = require('../../../services/database/redis');
const { successResponse } = require('../../../utils/apiResponse');
const { ServerError, ServerSuccess } = require('../../../utils/apiResponse');


const logout = async (req, res, next) => {
    try {
        const userId = req.client.userId;

        redis.del(userId, (err, reply) => {
            if (err) {
                return next(Boom.internal(ServerError.error.sessionNotRemoved));
            }
            if (reply === 0) {
                return next(Boom.unauthorized(ServerError.error.sessionNotFound));
            }

        });
        const successMessage = await successResponse(true, 200, { message: ServerSuccess.success.userLogoutSuccess });
        return res.status(200).json(successMessage);
    } catch (error) {
        return next(error);
    }
};
module.exports = { logout };
