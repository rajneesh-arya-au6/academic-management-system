require("./app")
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
var GoogleStrategy = require('passport-google-oauth20').Strategy;
let User = require("./models/user")

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, } = process.env;


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:1234/google/redirect`  
  },
  async (_, _1, googleProfile, done) => {
    //   try{
          //nested destructuring to get user data
          const {_json:{email, name}} = googleProfile

            let user = await User.findOne({
                where: 
                {email}
                })
            
            if(!user)user = await User.create({email,name,role:"guest", isLocalUser: false});
            return done(null,user)
    //   }
    //   catch(err){
    //     if(err.name==="Error"){
    //        return done(err);
    //     }
    //   }
    // await User.findOrCreate({where:{ googleId: profile.id }}, function (err, user) {
    //   return cb(err, user);
    // });
  }
));