const dotenv = require("dotenv");
dotenv.config();
POSTGRES_URI = process.env.POSTGRES_URI

const Sequelize = require("sequelize")
const sequelize = new Sequelize(POSTGRES_URI)
// const sequelize = new Sequelize('ams', 'postgres', '1234', {
//   host: 'localhost',
//   dialect: 'postgres',
//   logging:false
// });


sequelize.sync() //{force:true}

sequelize
  .authenticate()
  .then(() => console.log("Connection success!"))
  .catch(err => console.log(`Error: ${err.message}`));

module.exports = sequelize;
