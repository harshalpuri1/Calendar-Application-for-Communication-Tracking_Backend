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
        adminEmail VARCHAR(255) NOT NULL,
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
 * 📝 **Get All Communication Methods**
 */
const getAllMethods = async () => {
  try {
    const [results] = await db.execute('SELECT * FROM CommunicationMethods ORDER BY sequence');
    return results;
  } catch (err) {
    console.error('❌ Error fetching communication methods:', err.message);
    throw err;
  }
};

/**
 * 📝 **Add a Communication Method**
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
 */
const deleteMethod = async (id) => {
  try {
    const [result] = await db.execute('DELETE FROM CommunicationMethods WHERE id = ?', [id]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error('❌ Error deleting communication method:', err.message);
    throw err;
  }
};

/**
 * 📝 **Get Communication Method by Email**
 */
const getMethodByEmail = async (email) => {
  try {
    const [rows] = await db.execute("SELECT * FROM CommunicationMethods WHERE adminEmail = ?", [email]);
    return rows[0] || null;
  } catch (err) {
    console.error('❌ Error fetching communication method by Email:', err.message);
    throw err;
  }
};

module.exports = {
  createTable,
  getAllMethods,
  addMethod,
  deleteMethod,
  getMethodByEmail,
};
