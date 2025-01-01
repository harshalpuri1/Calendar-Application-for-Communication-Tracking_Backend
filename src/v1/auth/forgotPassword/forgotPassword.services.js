const pool  = require("../../../services/database/mysql")

const findUserEmail = async(email)=>{
    try{
        const [rows] = await pool.query('SELECT * FROM admin WHERE email = ?',[email])
        return rows;
    }
    catch(error){
        throw error;
    }
   
}

const setPassword = async(email,password)=>{
      try {
        await pool.query('UPDATE admin SET password= ? where email = ?',[password,email]) 
      }
      catch(error){
        throw error;
      }
}

module.exports ={
    findUserEmail,
    setPassword
}