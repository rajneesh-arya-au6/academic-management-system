const sequelize = require("../db");
const Sequelize = require("sequelize");
const Student = require("./student")
const Library = require("./Library")


const bookSchema = {
    name:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    subject:
        {type: Sequelize.STRING,
        allowNull: false},
    isIssued: {
        type: Sequelize.BOOLEAN,
        allowNull: false    //if book issued then studen yes(how to do it)
    }
    // issued_for:{
    //     type: Sequelize.INTEGER, //
    //     allowNull : false,
    //         references: {
    //         model: Student,
    //         key: 'id'
    //      }
    // }
    
}

const Book = sequelize.define('book', bookSchema);

// Book.sync()
// Library.belongsTo(Book)



// Book.belongsTo(student,{as:"student_id"})


module.exports = Book