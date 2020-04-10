const nodemailer = require("nodemailer");
require("@babel/polyfill")
const dotenv = require("dotenv");
dotenv.config();
const { GMAIL_USER_ID,GMAIL_PASSWORD} = process.env;

const transportOptions = {
    host: "smtp.gmail.com",
    port: 465, //secure port encrypted
    secure: true,
    debug: true,
    auth: {
      user: GMAIL_USER_ID,
      pass: GMAIL_PASSWORD
    }
  };

  const mailTransport = nodemailer.createTransport(transportOptions);
  const sendMailToUser = async (email, token) => {
    try {
    const domainName = `http://localhost:1234`;

    html = `<h1>Hi there.</h1>
    <p>You have recently requested for a change in password. Paste this link in POSTMAN along with your email and password(the new one)
      <a href=${domainName}/reset/${token}>here</a> to reset your password or paste this link in the postman app ${domainName}/reset/${token} 
      Dont forget to post email & password in the body. 
       If you didn't initiate the request. Kindly ignore. Thanks :)
    </p>`;
     
        await mailTransport.sendMail({
          from: GMAIL_USER_ID,
          to: email,
          subject:
             "Reset your password",
          html
        });
      } catch (err) {
        console.log(err);
        return err
      }
    };
    
    module.exports = sendMailToUser;