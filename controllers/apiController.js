require("../app")
const {sign,verify} = require("jsonwebtoken")
const User = require("../models/user")
const dotenv = require("dotenv");
dotenv.config();
const Student = require("../models/student")
const { compareSync } = require("bcrypt")
// const { IssuedBook, Book } = require("../models/book")


//when user login successfully this controller will send a jwt token including payload as user.role so that 
//while verifying we will know if the user is student,professsor,librarian, guuest or admin
let User_login = async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({    
    where:{email}
    
  });
  console.log(user.password)
  if (!user) {
    console.log(user)
    return res.status(400).send("User not found");
  }
  if (compareSync(password, user.password)) {
    console.log("heree")
    let token = await sign({userId: user.id, role: user.role, name: user.name, email: user.email },
        /*process.env.JWT_SECRET_KEY,*/process.env.JWT_SECRET_KEY,
      {
        expiresIn: "24h"
      });

    res.json({
      token,
      message: "token sent successfully"
    });
  } else {
    res.status(401).json({
      message: "Unauthenticated"
    });
  }
}

//after getting mail this will check the reset token and if match change the password
const ResetPassword = async (req, res) => {
  const { resetToken } = req.params;
  console.log(resetToken)
  try {
    let user = await User.findOne({ where:{ resetToken  }  
                           
    });
    if (!user) return res.status(400).send("User not found");

    const secretKey = `${user.getDataValue("email")}-${new Date(
      user.getDataValue("createdAt")          //making secretkey
    ).getTime()}`;

    const payload = await verify(resetToken, secretKey);      //verifying token
    console.log(payload)
    if (payload) {

      const { password, email } = req.body;
      try {
        await user.update(
          { password, resetToken: "" },       //reset token again to null
          { where: { email }, individualHooks: true } //you can change password in renderreset password this not needed
        );
        return res.json({ Success: "Please log-in again with your new password" });
      }
      catch (err) {
        console.log(err);
        res.status(500).send(err.message);
      }
    }
  }
  catch (err) {
    console.log(err);
    if (err.name === "TokenExpiredError") {
      return res.json({ Err: "Please get a new reset password email" });
    }
    res.status(500).send("Server Error");
  }
}


async function PasswordRecoveryEmailSent(req, res) {
  let { email } = req.body;
  if (!email) return res.status(400).send("Email is required!")
  try {
    let user = await User.findOne({ where:
        {email}   // !User is should  be search for student and prof as well
      
    });
    if (!user) return res.status(400).send("User not found!");
   await user.generateToken();
  
    res.json({Success:"Email sent successfully. Check your inbox"});
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }

}

const password_changed = async (req, res) => {
  const { email, oldpassword, newpassword } = req.body;
  if (!email || !oldpassword || !newpassword)
    return res.status(400).send("Bad request");
  try {
    const user = await User.findOne({  where:{email}   //changed Student to User
        
    });
    if (!user) return res.status(401).send("Incorrect credentials");
    const isMatched = await compareSync(oldpassword, user.password);

    if (!isMatched) return res.status(401).send("Incorrect credentials");
    console.log("heyy")
     await user.update({password:newpassword})

    return res.json({ Success: "Your Password has been changed" })
  }
  catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
}


const User_added = async(req,res) => {
  const{email,password} = req.body
  if(!email || !password) return res.status(400).send("Bad request");
  try {
    
    await User.create({ ...req.body });
    res.send("User added successfully")
  }
  catch (err) {
    console.log(err);
    
      return res.status(500).send(`Validation Error: ${err.message}`);
  }

};


const get_student = async(req, res) => {
  const{id} = req.params;
  // console.log()
  const student = await Student.findOne({where: {id}, include:User})
  console.log(student)
  res.send(student)
}





module.exports = {
  User_login,
  ResetPassword,
  PasswordRecoveryEmailSent,
  password_changed,
  User_added,
  get_student
}