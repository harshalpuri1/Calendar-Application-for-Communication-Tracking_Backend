var nodemailer = require('nodemailer');
const ejs = require('ejs');
const { constantsString } = require('./constants');


// functions for transporter to send email to user
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "hrp3102002@gmail.com",
    pass: "qhho yngs wvod jtrq",
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP Configuration Error:", error);
  } else {
    console.log("SMTP server is ready to send emails");
  }
});
//   function for send otp email
  const sendOtpEmail = async (email,otp)=>{
    try{
        const data = await ejs.renderFile(__dirname + "/mailTemplate/otpTemplate.ejs", { email: email, otp: otp });
        var mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: constantsString.otpString,
            html :  data
        };
        await transporter.sendMail(mailOptions);
    }
    catch(error){
        throw error;
    }
  } 
  
//   function for send new password on email
  const sendEmail = async (email,password)=>{
    try {
        const data = await ejs.renderFile(__dirname + "/mailTemplate/passwordTemplate.ejs", { email: email, password: password });
        var mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: constantsString.forgotPassword,
            html :  data
          };
        await transporter.sendMail(mailOptions);
    }
    catch(error){
      throw error;
    }
  }

  module.exports = {sendEmail,sendOtpEmail,transporter}