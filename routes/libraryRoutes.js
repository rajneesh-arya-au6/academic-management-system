require("../app")
let { Router } = require("express")
let router = Router()

const { library_data, books_issued, books_added } = require("../controllers/libraryController")


const { authenticateToken, admin_librarian } = require("../middleware/authentication")

//Add Books In Books Schema
router.post("/addbooks", authenticateToken, admin_librarian, books_added);


//Issue books by inserting student Id, Book Id and Date 
router.post("/issuebooks", authenticateToken, admin_librarian, books_issued);


//view library by studentId, you can view student details with book details
router.get("/viewlibrary/:id", authenticateToken, admin_librarian, library_data);


module.exports = router;