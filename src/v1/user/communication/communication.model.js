const db = require("../../../services/database/mysql");

// Helper function to format array or undefined values into strings
const formatToString = (value) => {
  if (Array.isArray(value)) {
    return value.join(",");
  }
  return value || "";
};

// ✅ Get communications by company ID
const getCommunications = async (companyId) => {
  if (!companyId) {
    throw new Error("Company ID is required to fetch communications.");
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM communications WHERE companyId = ?",
      [companyId]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

// ✅ Add a new communication
const addCommunication = async (communication) => {
  const { companyId, type, date, notes } = communication;

  if (!companyId || !type || !date) {
    throw new Error("Company ID, type, and date are required fields.");
  }

  const [result] = await db.query(
    "INSERT INTO communications (companyId, type, date, notes) VALUES (?, ?, ?, ?)",
    [companyId, type, date, notes || ""]
  );

  return result;
};

// ✅ Update communication
const updateCommunication = async (id, communication) => {
  const { type, date, notes } = communication;

  if (!id) {
    throw new Error("Communication ID is required for updating.");
  }

  const [result] = await db.query(
    "UPDATE communications SET type=?, date=?, notes=? WHERE id=?",
    [type || "", date || "", notes || "", id]
  );

  return result;
};

// ✅ Delete communication
const deleteCommunication = async (id) => {
  if (!id) {
    throw new Error("Communication ID is required for deletion.");
  }

  const [result] = await db.query("DELETE FROM communications WHERE id=?", [id]);

  return result;
};

module.exports = {
  getCommunications,
  addCommunication,
  updateCommunication,
  deleteCommunication,
};
