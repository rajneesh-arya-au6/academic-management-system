require("../app")
const sequelize = require("../db");
const Sequelize = require("sequelize")

const eventSchema = {
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    description:{
        type:Sequelize.STRING,
        allowNull: false
    },
    day: {
        type: Sequelize.DATEONLY,
        allowNull:false,
        unique: true
        // get: function() {
        //     return moment.utc(this.getDataValue('day')).format('YYYY-MM-DD');
        //   }
    }
}
//add isadmin

const Eventt = sequelize.define('eventt', eventSchema);
// Eventt.sync()
module.exports = Eventt;