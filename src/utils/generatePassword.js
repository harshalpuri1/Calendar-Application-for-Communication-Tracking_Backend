const generator = require('generate-password');

const  passwordGenerate =()=>{
  try{
    return  generator.generate({
      length: 10,
      numbers: true,
    })
  }
  catch(error){
    throw error;
  }
}

const  generateOtp =()=>{
  try {
    const randomNum = Math.random() * 9000
    return Math.floor(1000 + randomNum)
  }
  catch(error){
    throw error;
  }

}

module.exports = {passwordGenerate, generateOtp}