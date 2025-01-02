const db = require("../../../services/database/mysql");

// Helper function to format array or undefined values into strings
const formatToString = (value) => {
  if (Array.isArray(value)) {
    return value.join(",");
  }
  return value || "";
};

// ✅ Get all companies by admin email
const getCompanies = async (email) => {
  if (!email) {
    throw new Error("Email is required to fetch companies.");
  }

  console.log("Fetching companies for email:", email);
  try {
    const [rows] = await db.query(
      "SELECT * FROM companies WHERE adminEmail = ?",
      [email]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

// ✅ Add a new company
const addCompany = async (company) => {
  const {
    name,
    adminEmail,
    location,
    linkedIn,
    emails,
    phoneNumbers,
    comments,
    periodicity,
  } = company;

  if (!name || !adminEmail || !location) {
    throw new Error("Name, adminEmail, and location are required fields.");
  }

  console.log("Adding new company:", { name, adminEmail, location });

  const [adminRows] = await db.query("SELECT * FROM admin WHERE email = ?", [
    adminEmail,
  ]);

  if (adminRows.length === 0) {
    throw new Error(`Admin with email ${adminEmail} does not exist.`);
  }

  const formattedEmails = formatToString(emails);
  const formattedPhoneNumbers = formatToString(phoneNumbers);

  const [result] = await db.query(
    "INSERT INTO companies (name, adminEmail, location, linkedIn, emails, phoneNumbers, comments, periodicity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      name,
      adminEmail,
      location,
      linkedIn || "",
      formattedEmails,
      formattedPhoneNumbers,
      comments || "",
      periodicity || "",
    ]
  );

  console.log("Company added successfully:", result);
  return result;
};

// ✅ Update a company
const updateCompany = async (id, company) => {
  const {
    name,
    location,
    linkedIn,
    emails,
    phoneNumbers,
    comments,
    periodicity,
  } = company;

  if (!id) {
    throw new Error("Company ID is required for updating.");
  }

  console.log("Updating company:", { id, name, location });

  const formattedEmails = formatToString(emails);
  const formattedPhoneNumbers = formatToString(phoneNumbers);

  const [result] = await db.query(
    "UPDATE companies SET name=?, location=?, linkedIn=?, emails=?, phoneNumbers=?, comments=?, periodicity=? WHERE id=?",
    [
      name || "",
      location || "",
      linkedIn || "",
      formattedEmails,
      formattedPhoneNumbers,
      comments || "",
      periodicity || "",
      id,
    ]
  );

  console.log("Company updated successfully:", result);
  return result;
};

// ✅ Delete a company
const deleteCompany = async (id) => {
  if (!id) {
    throw new Error("Company ID is required for deletion.");
  }

  console.log("Deleting company with ID:", id);

  const [result] = await db.query("DELETE FROM companies WHERE id=?", [id]);

  console.log("Company deleted successfully:", result);
  return result;
};

module.exports = { getCompanies, addCompany, updateCompany, deleteCompany };
