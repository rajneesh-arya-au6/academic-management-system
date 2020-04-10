require("../app")
let { Router } = require("express")
let router = Router()

const{student_added,professor_added,librarian_added,
    eventt_created,eventt_deleted, marksheet_added, attendance_created, get_attendance} = require("../controllers/adminController")

const {authenticateToken,admin_only,admin_professor,} = require("../middleware/authentication")

/*This route is for adding student you should have valid login token and permission for access this route */
router.post("/addstudent",authenticateToken,admin_professor, student_added);  //authenticateToken,

/*This route is for adding professor you should have valid login token and only admin can access this route */
router.post("/addprofessor",authenticateToken,admin_only,professor_added);

/*This route is for adding librairan you should have valid login token and only admin can access this route */
router.post("/addlibrarian",authenticateToken,admin_only, librarian_added);

/*This route is for creating event you should have valid login token and only admin can access this route */
router.post("/createevent",authenticateToken,admin_only, eventt_created);

/*This route is for removing librairan you should have valid login token and only admin can access this route */
router.post("/deleteevent",authenticateToken,admin_only, eventt_deleted);

/*This route is for adding librairan you should have valid login token and only admin and professor can access this route */
router.post("/addmarksheet",authenticateToken,admin_professor, marksheet_added);

/*This route is for creating a  attendance link for students you should have valid login token 
and only admin and professor can access this route */
router.get("/createattendance",authenticateToken,admin_professor,attendance_created);

/*This route is for viewing attendances you should have valid login token and only admin and professor can access this route */
router.get("/viewattendance",admin_professor, get_attendance)


module.exports = router;