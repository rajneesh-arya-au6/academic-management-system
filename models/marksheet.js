const sequelize = require("../db");
const Sequelize = require("sequelize")
const Student = require("./student")


//there are also some foreign key in this schema please see Table on server which comes from Users(belongsTo function)
//and cant be NULL, column like studentId.
const marksheetSchema = {               

    physics:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    chemistry:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    maths:{
        type: Sequelize.INTEGER,
        allowNull:false
    }

}

const Marksheet = sequelize.define('marksheet', marksheetSchema);


//  Marksheet.sync()
module.exports = Marksheet;