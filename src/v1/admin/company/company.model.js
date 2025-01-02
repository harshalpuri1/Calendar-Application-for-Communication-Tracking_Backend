const db = require('../../../services/database/mysql');

// Get all companies
const getCompanies = async (email) => {
  const [rows] = await db.query('SELECT * FROM companies WHERE adminEmail = ?', [email]);
  return rows;
};

// Add a new company
const addCompany = async (company) => {
  const { name, adminEmail, location, linkedIn, emails, phoneNumbers, comments, periodicity } = company;

  // Check if the adminEmail exists in the admin table
  const [adminRows] = await db.query('SELECT * FROM admin WHERE email = ?', [adminEmail]);

  // If admin doesn't exist, throw an error
  if (adminRows.length === 0) {
    throw new Error(`Admin with email ${adminEmail} does not exist.`);
  }

  // Insert the new company if adminEmail exists
  const [result] = await db.query(
    'INSERT INTO companies (name, adminEmail, location, linkedIn, emails, phoneNumbers, comments, periodicity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [name, adminEmail, location, linkedIn, emails, phoneNumbers, comments, periodicity]
  );
  return result;
};

// Update a company
const updateCompany = async (id, company) => {
  const { name, location, linkedIn, emails, phoneNumbers, comments, periodicity } = company;
  const [result] = await db.query(
    'UPDATE companies SET name=?, location=?, linkedIn=?, emails=?, phoneNumbers=?, comments=?, periodicity=? WHERE id=?',
    [name, location, linkedIn, emails, phoneNumbers, comments, periodicity, id]
  );
  return result;
};

// Delete a company
const deleteCompany = async (id) => {
  const [result] = await db.query('DELETE FROM companies WHERE id=?', [id]);
  return result;
};

module.exports = { getCompanies, addCompany, updateCompany, deleteCompany };
