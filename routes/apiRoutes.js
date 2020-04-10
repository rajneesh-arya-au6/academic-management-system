require("../app")
let { Router } = require("express")
let router = Router()


let { User_login, PasswordRecoveryEmailSent, ResetPassword,
    password_changed, User_added, get_student,
} = require("../controllers/apiController")

const { authenticateToken, admin_student, } = require("../middleware/authentication")


/*This is a login route you will get a jwt token after successful login 
which you have to put in auth header for accessing routes*/
router.post("/login", User_login)

/*This is a forgot password route ,this will dent a mail for registered users only */
router.post("/forgotpassword", PasswordRecoveryEmailSent);

/*This is a reset token route for registered users only */
router.post("/reset/:resetToken", ResetPassword);

/*If you are logged in you can update your password for admin and students */
router.post("/changepassword", authenticateToken, admin_student, password_changed);

/*This is a dummy route for mentors to add himself and check all the routes */
router.post("/registeradmin", User_added);

/*This route is for student details nothing much */
router.get("/student/:id", get_student);

// router.get("/issuedBooks",/*auth */view_booksData)


//Exporting all the routes to app.js file
module.exports = router;
