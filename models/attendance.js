require("../app")
const sequelize = require("../db");
const Sequelize= require("sequelize");
const Student = require("./student")

const attendanceSchema = {
    
    date:{
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
        
    }
}

const Attendance = sequelize.define('attendance', attendanceSchema);

module.exports = Attendance;