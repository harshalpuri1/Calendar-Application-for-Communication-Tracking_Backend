const Communication = require('./communication.model');
const {
  CommunicationSchema,
  CommunicationAddSchema,
  CommunicationUpdateSchema,
  CommunicationDeleteSchema,
} = require('./communication.validation');
const Boom = require('@hapi/boom');

// ✅ Get Communications by Company ID
const getCommunications = async (req, res) => {
  try {
    const { error } = CommunicationSchema.validate(req.query, { abortEarly: false });
    if (error) {
      throw Boom.badRequest(error.details[0].message);
    }

    const results = await Communication.getCommunications(req.query.companyId);
    res.json(results);
  } catch (err) {
    res.status(err.isBoom ? err.output.statusCode : 500).json({ error: err.message });
  }
};

// ✅ Add Communication
const addCommunication = async (req, res) => {
  try {
    const { error } = CommunicationAddSchema.validate(req.body, { abortEarly: false });
    if (error) {
      throw Boom.badRequest(error.details[0].message);
    }

    const result = await Communication.addCommunication(req.body);
    res.status(201).json({ message: 'Communication added successfully', id: result.insertId });
  } catch (err) {
    res.status(err.isBoom ? err.output.statusCode : 500).json({ error: err.message });
  }
};

// ✅ Update Communication
const updateCommunication = async (req, res) => {
  try {
    const { error } = CommunicationUpdateSchema.validate(
      { id: req.params.id, ...req.body },
      { abortEarly: false }
    );
    if (error) {
      throw Boom.badRequest(error.details[0].message);
    }

    await Communication.updateCommunication(req.params.id, req.body);
    res.json({ message: 'Communication updated successfully' });
  } catch (err) {
    res.status(err.isBoom ? err.output.statusCode : 500).json({ error: err.message });
  }
};

// ✅ Delete Communication
const deleteCommunication = async (req, res) => {
  try {
    const { error } = CommunicationDeleteSchema.validate({ id: req.params.id });
    if (error) {
      throw Boom.badRequest(error.details[0].message);
    }

    await Communication.deleteCommunication(req.params.id);
    res.json({ message: 'Communication deleted successfully' });
  } catch (err) {
    res.status(err.isBoom ? err.output.statusCode : 500).json({ error: err.message });
  }
};

// ✅ Validate Middleware for Routes
const validateGetCommunication = (req, res, next) => {
  const { error } = getMethodByEmailSchema.validate(req.query, { abortEarly: false });
  if (error) {
    throw Boom.badRequest(error.details[0].message);
  }
  next();
};

const validateAddCommunication = (req, res, next) => {
  const { error } = addMethodSchema.validate(req.body, { abortEarly: false });
  if (error) {
    throw Boom.badRequest(error.details[0].message);
  }
  next();
};

const validateUpdateCommunication = (req, res, next) => {
  const { error } = addMethodSchema.validate(
    { id: req.params.id, ...req.body },
    { abortEarly: false }
  );
  if (error) {
    throw Boom.badRequest(error.details[0].message);
  }
  next();
};

const validateDeleteCommunication = (req, res, next) => {
  const { error } = deleteMethodSchema.validate({ id: req.params.id });
  if (error) {
    throw Boom.badRequest(error.details[0].message);
  }
  next();
};


module.exports = {
  getCommunications,
  addCommunication,
  updateCommunication,
  deleteCommunication,
  validateGetCommunication,
  validateAddCommunication,
  validateUpdateCommunication,
  validateDeleteCommunication,
};
