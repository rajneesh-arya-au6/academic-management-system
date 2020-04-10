require("../app")
const {sign,verify,decode} = require("jsonwebtoken")


//This middleware is to check wheather you are logged or not, THis will check your token provided at the time of login
const authenticateToken = async (req, res, next) => {
    // console.log(req.headers.authorization)
    let authHeader = await req.headers['authorization']
    
    let token = authHeader.replace('Bearer ','')
    // console.log(token)
    if(token == null) return res.sendStatus(401) //not have token
        verify(token, process.env.JWT_SECRET_KEY,
        (err) => {
            // console.log('i m here')
            if (err) return res.sendStatus(403) //have token but not valid
            return next() }
           )
}


// This is a middleware only accessible only Admin.Make sure you have valid token :)
// if this middleware is used in any routes that means that can only accessible by admin.
const admin_only = async(req,res,next) =>
      {
          try{
    let authHeader = await req.headers['authorization'];
    let token = authHeader.split(' ')[1];
    let user = decode(token,process.env.JWT_SECRET_KEY);
    
        if (!user) {
        throw Error("User not found");
          }
        if(user.role=="student" || user.role =="professor" || user.role =="librarian"){
            throw Error("Sorry! you are not allowed")
        }
        if(user.role=="admin"){
            next()
        }
        else{ return res.status(401).send("Incorrect credentials");
        }
    } 
    catch(err){console.log(err)}
  }

  // This is a middleware only accessible to professors AND Admin.Make sure you have valid token :)
  // if this middleware is used in any routes that means that can only accessible by admin and professors.
  const admin_professor = async(req,res,next) =>
      {try{
        //   console.log(req.headers)
    let authHeader = await req.headers['authorization'];
    // console.log(`authhdr${authHeader}`)
    let token = authHeader.split(' ')[1];
    console.log(token)
    let user =await verify(token, process.env.JWT_SECRET_KEY);
    // console.log(user)
        if (!user) {
        throw Error("User not found");
          }
        if(user.role=="student" || user.role =="librarian"){
            throw Error("Student not allowed")
        }
        if(user.role=="admin" || user.role =="professor"){
            next()
        }
        else{ return res.status(401).send("Incorrect credentials");
        }
        } 
        catch(err){
            console.log(err)
            res.status(401).send(err.message)}
  }


  // This is a middleware only accessible to librarians AND Admin.Make sure you have valid token :)
  // if this middleware is used in any routes that means that can only accessible by admin and librarians.
  const admin_librarian = async(req,res,next) =>
      { try{
    let authHeader = await req.headers['authorization'];
    let token = authHeader.split(' ')[1];
    let user = decode(token);
        if (!user) {
        throw Error("User not found");
          }
        if(user.role=="student" || user.role=="professor"){
            throw Error("Student not allowed")
        }
        if(user.role=="admin" || user.role=="librarian"){
            next()
        }
        else{ return res.status(401).send("Incorrect credentials");
        }
    }
    catch(err){console.log(err)}
  }


  // This is a middleware only accessible to student AND Admin.Make sure you have valid token :)
  // if this middleware is used in any routes that means that can only accessible by admin and students.
  const admin_student = async(req,res,next) =>
      {
        try {
    let authHeader = await req.headers['authorization'];
    let token = authHeader.split(' ')[1];
    let user = decode(token);
        if (!user) {
        throw Error("User not found");
          }
        if(user.role=="librarian" || user.role=="professor"){
            throw Error("Student not allowed")
        }
        if(user.role=="admin" || user.role=="student"){
            next()
        }
        else{ return res.status(401).send("Incorrect credentials");
        }
  }
  catch(err){console.log(err)}
}

module.exports = {authenticateToken,
        admin_only,
    admin_professor,
    admin_librarian,
    admin_professor,
admin_student
}
