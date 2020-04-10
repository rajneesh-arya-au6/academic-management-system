const sequelize = require("../db");
const Sequelize = require("sequelize");
const Professor = require("./professor")
const Student = require("./student")
const Book = require("./book")
const Librarian = require("./librarian")





const librarySchema = {

    date: {
        type: Sequelize.DATEONLY,
        allowNull:false
        // get: function() {
        //     return moment.utc(this.getDataValue('day')).format('YYYY-MM-DD');
        //   }
    },
    bookId: {
        type:Sequelize.INTEGER,
        allowNull:false,
        references:  {
            model: Book,
            key : 'id'
        }
    },
    
    // professorId: {
    //     type:Sequelize.INTEGER,
    //     allowNull:false,
    //     references:  {
    //         model: Professor,
    //         key : 'id'
    //     }
    // }
}


const Library = sequelize.define('library', librarySchema);
// Library.belongsTo(Professor)
// Library.sync()
module.exports = Library