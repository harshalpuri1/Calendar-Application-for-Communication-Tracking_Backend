const pool = require('../../../services/database/mysql');

const findUserEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM admin WHERE email = ?', [email]);
    return rows;
};

module.exports = {
    findUserEmail
};
