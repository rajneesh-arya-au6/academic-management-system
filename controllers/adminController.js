require("../app")
const User = require("../models/user")
const dotenv = require("dotenv");
dotenv.config();
const {sign,verify,decode} = require("jsonwebtoken")
const Eventt = require("../models/event")
const Student = require("../models/student")
const Professor = require("../models/professor")
const Librarian = require("../models/librarian")
const Marks = require("../models/marksheet")
const Studentattendance = require("../models/studentAttendance")
const Attendance = require("../models/attendance")



const student_added = async(req,res) => 
{ const{email,password} = req.body
  if(!email || !password) return res.status(400).send("Bad request");
  try {
    
    const user = await User.create({ ...req.body });
    console.log(user.toJSON())
   const student = await Student.create({userId : user.id})
  
    res.json({Success:`Student added successfully`})
  }
  catch (err) {
    console.log(err);
      return res.status(400).send(`Validation Error: ${err.message}`);
  }

};

const professor_added = async(req,res) => {
    const{email,password} = req.body
    if(!email || !password) return res.status(400).send("Bad request");
    try {
      console.log(req.body)
      
      const user = await User.create({ ...req.body });
      console.log(user.toJSON())
     const professor = await Professor.create({userId : user.id})
    
      res.json({Success:`Professor added successfully`})
    }
    catch (err) {
      console.log(err);
      
        return res.status(400).send(`Validation Error: ${err.message}`);
    }
  
  };


  const librarian_added = async(req,res) => {
    const{email,password} = req.body
    if(!email || !password) return res.status(400).send("Bad request");
    try {
      console.log(req.body)
      
      const user = await User.create({ ...req.body });
      console.log(user.toJSON())
     await Librarian.create({userId : user.id})
    
      res.json({Success:`Librarian added successfully`})
    }
    catch (err) {
      console.log(err);
      
        return res.status(400).send(`Validation Error: ${err.message}`);
    }
  
  };

  const eventt_deleted = async(req, res) => {
    let {name, day} = req.body
    if(!name || !day) return res.status(400).send("Bad request");
    try{
      const eventt = await Eventt.destroy({
        where: {
          day
        }
      })
      if(!eventt) res.status(404).send("event not found")
      res.json({Success:`Event of ${day} is successfully deleted`})
    }
    catch (err) {
      console.log(err);
      
        return res.status(400).send(`Validation Error: ${err.message}`);
    }
  }

  const eventt_created = async (req, res) => {
    // let { email, password } = req.body;
    try {
      await Eventt.create({ ...req.body });
      res.json({Success:"Event successfully created"})
    }
    catch (err) {
      console.log(err);
      
        return res.status(400).send(`Validation Error: ${err.message}`);
    }
  };


  const marksheet_added = async (req, res) => {
    try {
      await Marks.create({ ...req.body });
      res.json({Success:"Marksheet added succesfully"})
    }
    catch (err) {
      console.log(err);
      
        return res.status(400).send(`Validation Error: ${err.message}`);
    }
  }

  

const get_attendance = async(_,res) => {
  try{
  const abc = await Studentattendance.findAll({include:[{model:User},{model:Attendance}]})  //,include:[Attendance]
  const arr = []
  for(var i=0;i<abc.length;i++)
  { let {name, email} = abc[i].user.dataValues
    // email = abc[i].user.dataValues.email
    let date = abc[i].attendance.date
    arr.push({StudentName:name,StudentEmail:email,Date:date})
  }
 
  await res.json({Attendance:arr})
}
catch (err) {
  console.log(err);
    return res.status(400).send(`Validation Error: ${err.message}`);
}
}



const attendance_created = async(req,res) => {
    let authHeader = await req.headers['authorization'];
      let token = authHeader.split(' ')[1];
      let user = decode(token,process.env.JWT_SECRET_KEY);

    try {
      let newDate = new Date()
      let newDay = newDate.getDate()
      let newMonth = newDate.getMonth()
      let newYear = newDate.getFullYear()
        // let newwDate = `${newDay}-${newMonth}-${newYear}`
        let newwDate = `05-05-2020`
  
      console.log(newwDate)
      await Attendance.create({ date:newwDate });
     const attendance = await Attendance.findOne({where:{date:newwDate}})
     console.log(attendance.id)
      let attendanceToken = await sign({user:user.name,id:attendance.id},
        process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15m"
    });
      res.json({
        message: `Attendance token link sent successfully by ${user.name}`,
        link: `paste this link in browser http://localhost:1234/attendance/${attendanceToken}`
      });
    }
    catch (err) {
      console.log(err);
        return res.status(400).send(`Validation Error: ${err.message}`);
    }
  
    
  }
  

  module.exports = {eventt_created,eventt_deleted,librarian_added,professor_added,
    
        student_added, marksheet_added, attendance_created,get_attendance}