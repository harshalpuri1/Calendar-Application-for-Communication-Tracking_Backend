const db = require("../../../services/database/mysql");

/**
 * 📝 **Create CommunicationMethods Table if not exists**
 */
const createTable = async () => {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS CommunicationMethods (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        sequence INT NOT NULL,
        mandatory BOOLEAN DEFAULT FALSE,
        adminEmail VARCHAR(255) NOT NULL,  -- Foreign key referencing 'admin.email'
        FOREIGN KEY (adminEmail) REFERENCES admin(email) ON DELETE CASCADE
      );
    `);
    console.log('✅ CommunicationMethods table created or already exists');
  } catch (err) {
    console.error('❌ Error creating CommunicationMethods table:', err.message);
    throw err;
  }
};

/**
 * 📝 **Get All Communication Methods by adminEmail**
 * @param {String} adminEmail - Admin's email to filter the methods
 * @returns {Array} List of communication methods
 */
const getAllMethodsByEmail = async (email) => {
  if (!email) {
    throw new Error("adminEmail is required to fetch communication methods.");
  }

  try {
    const [results] = await db.execute(
      'SELECT * FROM CommunicationMethods WHERE adminEmail = ? ORDER BY sequence', 
      [email]
    );
    return results;
  } catch (err) {
    console.error('❌ Error fetching communication methods by adminEmail:', err.message);
    throw err;
  }
};

/**
 * 📝 **Add a new Communication Method**
 */
const addMethod = async (method) => {
  const { name, description = '', sequence, mandatory = false, adminEmail } = method;

  if (!name || !sequence || !adminEmail) {
    throw new Error('Required fields are missing: name, sequence, or adminEmail.');
  }

  try {
    await db.execute(
      `INSERT INTO CommunicationMethods (name, description, sequence, mandatory, adminEmail) 
       VALUES (?, ?, ?, ?, ?)`,
      [name, description, sequence, mandatory, adminEmail]
    );
  } catch (err) {
    console.error('❌ Error adding method:', err.message);
    throw err;
  }
};

/**
 * 📝 **Delete a Communication Method**
 * @param {Number} id - Method ID
 */
const deleteMethod = async (id) => {
  try {
    const [result] = await db.execute('DELETE FROM CommunicationMethods WHERE id = ?', [id]);
    return result.affectedRows > 0; // Return true if a row was deleted
  } catch (err) {
    console.error('❌ Error deleting communication method:', err.message);
    throw err;
  }
};

module.exports = {
  createTable,
  getAllMethodsByEmail,
  addMethod,
  deleteMethod,
};
