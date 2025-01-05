const CommunicationModel = require('./communication.model');
const {
  addMethodSchema,
  deleteMethodSchema,
  getMethodByEmailSchema
} = require('./communication.validation');
const redisClient = require('../../../services/database/redis');
const Boom = require('@hapi/boom'); // Ensure Boom is installed and imported

// ✅ Get Communication Methods by adminEmail
const getAllMethodsByEmail = async (req, res) => {
  try {
    const { error } = getMethodByEmailSchema.validate(req.query, { abortEarly: false });
    if (error) {
      throw Boom.badRequest(error.details[0].message);
    }
    const email = req.query.email;
    const cacheKey = `communication_methods:${email}`;

        // Check Redis Cache
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
          return res.status(200).json({
            success: true,
            message: 'Communication methods fetched from cache.',
            data: JSON.parse(cachedData),
          });
        }

    const methods = await CommunicationModel.getAllMethodsByEmail(req.query.email);
    await redisClient.set(cacheKey, JSON.stringify(methods), {
      EX: 3600, // Cache expiration (1 hour)
    });

    return res.status(200).json({
      success: true,
      message: 'Communication methods fetched successfully.',
      data: methods,
    });
  } catch (err) {
    res.status(err.isBoom ? err.output.statusCode : 500).json({ error: err.message });
  }
};

// ✅ Add Communication Method
const addMethod = async (req, res) => {
  try {
    const { error } = addMethodSchema.validate(req.body, { abortEarly: false });
    if (error) {
      throw Boom.badRequest(error.details[0].message);
    }

    const { name, description, sequence, mandatory, adminEmail } = req.body;

    await CommunicationModel.addMethod({
      name,
      description,
      sequence,
      mandatory,
      adminEmail
    });
    await redisClient.del(`communication_methods:${adminEmail}`);

    return res.status(201).json({
      success: true,
      message: 'Method added successfully',
    });
  } catch (error) {
    res.status(error.isBoom ? error.output.statusCode : 500).json({ error: error.message });
  }
};

// ✅ Update Communication Method
const updateMethod = async (req, res) => {
  try {
    const { error } = addMethodSchema.validate(
      { id: req.params.id, ...req.body },
      { abortEarly: false }
    );
    if (error) {
      throw Boom.badRequest(error.details[0].message);
    }

    await CommunicationModel.updateMethod(req.params.id, req.body);
    
    await redisClient.del(`communication_methods:${req.body.adminEmail}`);
    
    res.json({ message: 'Method updated successfully' });
  } catch (err) {
    res.status(err.isBoom ? err.output.statusCode : 500).json({ error: err.message });
  }
};

// ✅ Delete Communication Method
const deleteMethod = async (req, res) => {
  try {
    const { error } = deleteMethodSchema.validate({ id: req.params.id });
    if (error) {
      throw Boom.badRequest(error.details[0].message);
    }
    const method = await CommunicationModel.getMethodById(req.params.id);

    await CommunicationModel.deleteMethod(req.params.id);
    await redisClient.del(`communication_methods:${method.adminEmail}`);

    res.json({ message: 'Communication method deleted successfully' });
  } catch (err) {
    res.status(err.isBoom ? err.output.statusCode : 500).json({ error: err.message });
  }
};

// ✅ Validate Middleware for Routes
const validateGetMethodByEmail = (req, res, next) => {
  const { error } = getMethodByEmailSchema.validate(req.query, { abortEarly: false });
  if (error) {
    throw Boom.badRequest(error.details[0].message);
  }
  next();
};

const validateAddMethod = (req, res, next) => {
  const { error } = addMethodSchema.validate(req.body, { abortEarly: false });
  if (error) {
    throw Boom.badRequest(error.details[0].message);
  }
  next();
};

const validateUpdateMethod = (req, res, next) => {
  const { error } = addMethodSchema.validate(
    { id: req.params.id, ...req.body },
    { abortEarly: false }
  );
  if (error) {
    throw Boom.badRequest(error.details[0].message);
  }
  next();
};

const validateDeleteMethod = (req, res, next) => {
  const { error } = deleteMethodSchema.validate({ id: req.params.id });
  if (error) {
    throw Boom.badRequest(error.details[0].message);
  }
  next();
};

module.exports = {
  getAllMethodsByEmail,
  addMethod,
  updateMethod,
  deleteMethod,
  validateGetMethodByEmail,
  validateAddMethod,
  validateUpdateMethod,
  validateDeleteMethod,
};
