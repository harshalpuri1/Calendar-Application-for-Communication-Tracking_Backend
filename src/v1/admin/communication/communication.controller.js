const CommunicationModel = require('./communication.model');
const Boom = require('@hapi/boom');

/**
 * 📝 **Initialize Communication Table**
 */
(async () => {
  try {
    await CommunicationModel.createTable();
    console.log('✅ Communication table initialized successfully');
  } catch (err) {
    console.error('❌ Failed to initialize communication table:', err.message);
  }
})();

/**
 * 📝 **Get All Communication Methods**
 */
const getAllMethods = async (req, res, next) => {
  try {
    const methods = await CommunicationModel.getAllMethods();
    return res.status(200).json({
      success: true,
      message: 'Communication methods fetched successfully.',
      data: methods,
    });
  } catch (err) {
    console.error('❌ Error fetching methods:', err.message);
    next(Boom.internal('Failed to fetch communication methods'));
  }
};

/**
 * 📝 **Add a Communication Method**
 */
const addMethod = async (req, res) => {
  try {
    const { name, description, sequence, mandatory, adminEmail } = req.body;

    await CommunicationModel.addMethod({
      name,
      description,
      sequence,
      mandatory,
      adminEmail
    });

    return res.status(201).json({
      success: true,
      message: 'Method added successfully',
    });
  } catch (error) {
    console.error('❌ Error adding method:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * 📝 **Delete a Communication Method**
 */
const deleteMethod = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await CommunicationModel.deleteMethod(id);
    if (!deleted) {
      throw Boom.notFound('Communication method not found.');
    }

    return res.status(200).json({
      success: true,
      message: 'Communication method deleted successfully.',
    });
  } catch (err) {
    console.error('❌ Error deleting method:', err.message);
    next(err.isBoom ? err : Boom.internal('Failed to delete communication method'));
  }
};

/**
 * 📝 **Get Communication Method by Email**
 */
const getMethodByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;

    const method = await CommunicationModel.getMethodByEmail(email);
    if (!method) {
      throw Boom.notFound('Communication method not found.');
    }

    return res.status(200).json({
      success: true,
      message: 'Communication method fetched successfully.',
      data: method,
    });
  } catch (err) {
    console.error('❌ Error fetching method by email:', err.message);
    next(err.isBoom ? err : Boom.internal('Failed to fetch communication method'));
  }
};

module.exports = {
  getAllMethods,
  addMethod,
  deleteMethod,
  getMethodByEmail,
};
