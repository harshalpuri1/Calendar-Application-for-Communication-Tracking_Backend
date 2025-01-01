const Company = require('./company.model');

// Get all companies
const getCompanies = (req, res) => {
  Company.getCompanies((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Add a company
const addCompany = async (req, res) => {
  try {
    const result = await Company.addCompany(req.body);
    if (!result || !result.insertId) {
      console.error('Insert failed:', result);
      return res.status(500).json({ error: 'Failed to add company.' });
    }

    res.status(201).json({
      message: 'Company added successfully',
      id: result.insertId,
    });
  } catch (err) {
    console.error('Error adding company:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Update a company
const updateCompany = (req, res) => {
  Company.updateCompany(req.params.id, req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Company updated successfully' });
  });
};

// Delete a company
const deleteCompany = (req, res) => {
  Company.deleteCompany(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Company deleted successfully' });
  });
};

module.exports = { getCompanies, addCompany, updateCompany, deleteCompany };
