const Communication = require('');

exports.getAllCommunications = async (req, res) => {
  try {
    const communications = await Communication.find().populate('companyId');
    res.status(200).json(communications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCommunication = async (req, res) => {
  try {
    const newCommunication = new Communication(req.body);
    await newCommunication.save();
    res.status(201).json(newCommunication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
