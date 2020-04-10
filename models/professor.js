require("../app")
const sequelize = require("../db");
const Sequelize = require("sequelize");
const{hash} = require("bcrypt")
const User = require("./user")
const Library = require("./Library")

const professorSchema = {
  
    

}


const Professor = sequelize.define('professor', professorSchema);
// Professor.belongsTo(Library)
// Professor.sync()





module.exports = Professor;