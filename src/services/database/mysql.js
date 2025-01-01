const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT, 
    database: process.env.DATABASE_NAME
});

async function checkConnection(){
    try {
        const connection = await pool.getConnection();
        console.log('✅ MySQL connected successfully');
        
    }
    catch(error){
        console.log(error);
        console.error('❌ Error connecting to MySQL:', error.message);
    }
}
checkConnection(); 
 
 
module.exports = pool;
