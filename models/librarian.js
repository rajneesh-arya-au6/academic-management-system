require("../app")
const sequelize = require("../db");
const Sequelize = require("sequelize");
const{hash} = require("bcrypt")
const User = require("./user")

const librarianSchema = {
  
    
   

}


const Librarian= sequelize.define('librarian', librarianSchema);
// Librarian.sync()

// Admin.init(adminSchema, {
//     sequelize,
//     tableName: "admin"
//   });



module.exports = Librarian;