require("../app")
const { sign, decode, verify } = require("jsonwebtoken")
const User = require("../models/user")
const Student = require("../models/student")
const Eventt = require("../models/event")
const Marksheet = require("../models/marksheet")
const Studentattendance = require("../models/studentAttendance")

//You can view student marksheet by providing studentId in params
const view_marksheet = async (req, res) => {
  //extracting studentId from params and find in db
  let Id = req.params.studentId;
  if (Id == null) return res.status(400).send("Bad request")
  try {
    var marksheetArr = [];
    let marksheet = await Marksheet.findAll({
      where:
        { studentId: Id },
      include: {
        model: Student, include: [User]
        }
    })
    if (marksheet.length == 0) return res.send(404).send("User not found")
    for (let i = 0; i < marksheet.length; i++) {
     
      //getting allthe data from database and putting in var
      var status = '';
      var { name, email } = marksheet[i].toJSON().student.user
      var physics = parseInt(marksheet[i].physics)
      var chemistry = parseInt(marksheet[i].chemistry)
      var maths = parseInt(marksheet[i].maths)
      var studentRollNo = marksheet[i].studentId
      var TotalMarks = parseInt(physics + chemistry + maths)
      var TotalPercentage = Math.round((TotalMarks) / 3)

      if (TotalPercentage < 35) { status = "Fail" }
      else { status = "Pass" }
      // push all the required details in the array and send array as a json
      marksheetArr.push({
        name: name,
        Roll_no: studentRollNo,
        Email: email,
        MonthlyTest: i + 1,
        MarksInPhysics: physics,
        MarksInChemistry: chemistry,
        MarksInMathematics: maths,
        TotalMarks,
        TotalPercentage,
        Status: status
      })
    }
    await res.json(marksheetArr)
  }
  catch (err) {
    console.log(err);
    if (err.name === "SequelizeValidationError")
      return res.status(400).send(`Validation Error: ${err.message}`);
  }
}

//extract date from params and check for event on perticular date and sends details of that event
const view_eventt = async (req, res) => {
  let day = req.params.day;
  if (day == null) return res.status(400).send("Bad request")
  try {
    let eventt = await Eventt.findOne({
      where:
        { day }
    })
    // console.log(eventt.day)
    if (!eventt) return res.status(404).send("No event on this day, Make sure you have entered date format as YYYY-MM-DD")
    res.json({
      Name: eventt.name,
      Description: eventt.description,
      On: eventt.day
    })
  }
  catch (err) {
    console.log(err);
    if (err.name === "SequelizeValidationError")
      return res.status(400).send(`Validation Error: ${err.message}`);
  }

}

//if auth successful by google then sneding login token as json
const fetchUserFromGoogle = async (req, res) => {
  console.log(req.user.dataValues)
  const user = req.user;
  const accessToken = await user.generatedToken()

  res.json({
    LoginToken: accessToken,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
  });;
}


const attendance_marked = async (req, res) => {
  //Extracting attendance token from params and verrify
  const token = req.params.token
  if (!token) return res.status(400).send("Bad request")

  const attendance = await verify(token, process.env.JWT_SECRET_KEY)
  if (!attendance) return res.status(401).send("token is not valid or expired")
  const { id } = attendance
  // console.log(id)

  //Extracting studntss details from auth Header by bearer token and verify
  const authHeader = await req.headers['authorization'];
  const newtoken = authHeader.split(' ')[1];
  const student = decode(newtoken, process.env.JWT_SECRET_KEY);

  const { userId } = student;
  console.log(userId)


  let studentattendance = await Studentattendance.create({ userId: userId, attendanceId: id })

  if (!studentattendance) return res.status(400).send(`Validation Error`);

  res.json({ Succes: `Your attendance has been registered successfully` })

}






module.exports = {
  view_marksheet, view_eventt, fetchUserFromGoogle,
  attendance_marked
}


