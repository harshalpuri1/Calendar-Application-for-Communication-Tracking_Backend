const Company = require('./company.model');
const {
  CompanySchema,
  CompanyAddSchema,
  CompanyUpdateSchema,
  CompanyDeleteSchema,
} = require('./company.validation');
const Boom = require('@hapi/boom'); // Ensure Boom is installed and imported

// ✅ Get Companies
const getCompanies = async (req, res) => {
  try {
    const { error } = CompanySchema.validate(req.query, { abortEarly: false });
    if (error) {
      throw Boom.badRequest(error.details[0].message);
    }

    const results = await Company.getCompanies(req.query.email);
    res.json(results);
  } catch (err) {
    res.status(err.isBoom ? err.output.statusCode : 500).json({ error: err.message });
  }
};

// ✅ Add Company
const addCompany = async (req, res) => {
  try {
    const { error } = CompanyAddSchema.validate(req.body, { abortEarly: false });
    if (error) {
      throw Boom.badRequest(error.details[0].message);
    }

    const result = await Company.addCompany(req.body);
    res.status(201).json({ message: 'Company added successfully', id: result.insertId });
  } catch (err) {
    res.status(err.isBoom ? err.output.statusCode : 500).json({ error: err.message });
  }
};

// ✅ Update Company
const updateCompany = async (req, res) => {
  try {
    const { error } = CompanyUpdateSchema.validate(
      { id: req.params.id, ...req.body },
      { abortEarly: false }
    );
    if (error) {
      throw Boom.badRequest(error.details[0].message);
    }

    await Company.updateCompany(req.params.id, req.body);
    res.json({ message: 'Company updated successfully' });
  } catch (err) {
    res.status(err.isBoom ? err.output.statusCode : 500).json({ error: err.message });
  }
};

// ✅ Delete Company
const deleteCompany = async (req, res) => {
  try {
    const { error } = CompanyDeleteSchema.validate({ id: req.params.id });
    if (error) {
      throw Boom.badRequest(error.details[0].message);
    }

    await Company.deleteCompany(req.params.id);
    res.json({ message: 'Company deleted successfully' });
  } catch (err) {
    res.status(err.isBoom ? err.output.statusCode : 500).json({ error: err.message });
  }
};

// ✅ Validate Middleware for Routes (Optional if inline validation is removed)
const validateGetCompany = (req, res, next) => {
  const { error } = CompanySchema.validate(req.query, { abortEarly: false });
  if (error) {
    throw Boom.badRequest(error.details[0].message);
  }
  next();
};

const validateAddCompany = (req, res, next) => {
  const { error } = CompanyAddSchema.validate(req.body, { abortEarly: false });
  if (error) {
    throw Boom.badRequest(error.details[0].message);
  }
  next();
};

const validateUpdateCompany = (req, res, next) => {
  const { error } = CompanyUpdateSchema.validate(
    { id: req.params.id, ...req.body },
    { abortEarly: false }
  );
  if (error) {
    throw Boom.badRequest(error.details[0].message);
  }
  next();
};

const validateDeleteCompany = (req, res, next) => {
  const { error } = CompanyDeleteSchema.validate({ id: req.params.id });
  if (error) {
    throw Boom.badRequest(error.details[0].message);
  }
  next();
};

module.exports = {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
  validateGetCompany,
  validateAddCompany,
  validateUpdateCompany,
  validateDeleteCompany,
};
