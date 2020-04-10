require("../app")
const sequelize = require("../db");
const { Sequelize, Model } = require("sequelize");
const{hash} = require("bcrypt");
const Student = require("./student");
const Professor =  require("./professor");
const Librarian = require("./librarian");
const Book = require("./book");
const sendMailToUser = require("../utlis/emailSending");
const {sign} = require("jsonwebtoken");


//Generating accesstokens
class User extends Model {
    async generateToken() {
    
        const secretKey = `${this.getDataValue("email")}-${new Date(
            this.getDataValue("createdAt")
        ).getTime()}`;
        const token = await sign({ id: this.getDataValue("id") }, secretKey, {
            expiresIn: (1000 * 60 * 10).toString()
        });
        console.log(token)
        this.setDataValue("resetToken", token);
        await this.save();
        await sendMailToUser(this.getDataValue("email"), token);
    } // This is a method for grnerate token and change token value to generated token


    async generatedToken () {
        const user = this;
        let accessToken = await sign({ role: this.getDataValue("role"), name: this.getDataValue("name"), email: this.getDataValue("email") },
            /*process.env.JWT_SECRET_KEY,*/process.env.JWT_SECRET_KEY,
          {
            expiresIn: "24h"
          });
        user.setDataValue("accessToken", accessToken)
        await user.save();
        console.log(user)
        return accessToken;
      };
}

const userSchema =  {
    name:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: Sequelize.STRING,
        allowNull: function(){
            const isLocalUser = this.isLocalUser
            return !isLocalUser;
        }
    },

    isLocalUser:{
        type: Sequelize.BOOLEAN,
        allowNull:true,
        defaultValue: true
    },
    
    role: {
        type: Sequelize.ENUM,
        values: ['admin', 'student', 'librarian','professor','guest'],
        allowNull: false,
    },
    resetToken: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ""
      }
        
    }



User.init(userSchema, {
    sequelize,
    modelName: "user"
  });

//These are the references to foreign keys
Student.belongsTo(User)
Professor.belongsTo(User)
Book.belongsTo(User)
Librarian.belongsTo(User)


// User.sync()  //{force:true}

//This hook is used to hash passwrod before inserting new user
User.beforeCreate(async user => {
    try{
    const hashedPassword = await hash(user.password, 10);
    user.password = hashedPassword;
  }
  catch(err){
      console.log(err)
      throw err
  }
});


//This hook is used to hash passwrod before updating user password
User.beforeUpdate(async user => {
    try{
        if (user.changed("password")){
            const hashedPassword = await hash(user.password, 10); 
        user.password = hashedPassword;  
        }
                       
  }
  catch(err){
      console.log(err)
      throw err
  }
});

module.exports = User;