require("../app")
const sequelize = require("../db");
const Sequelize= require("sequelize");
const Student = require("./student")
const User = require("./user")
const Attendance = require("./attendance")

const studentattendanceSchema = {
    // attendee:{
    //     type: Sequelize.INTEGER,
    //     allowNull: true,
    //     references:{
    //         model: User,
    //         key: 'id'
    //     }
    // },
    // dateId:{
    //     type: Sequelize.INTEGER,
    //     allowNull:true,
    //     references:{
    //         model:Attendance,
    //         key: 'id'
    //     }
    // }
}

const StudentAttendance = sequelize.define('studentattendance', studentattendanceSchema);
User.belongsToMany(Attendance,{through:"studentattendance"})
Attendance.belongsToMany(User,{through:"studentattendance"})
User.hasMany(StudentAttendance);
StudentAttendance.belongsTo(User);
Attendance.hasMany(StudentAttendance);
StudentAttendance.belongsTo(Attendance);

// StudentAttendance.sync()
module.exports = StudentAttendance;