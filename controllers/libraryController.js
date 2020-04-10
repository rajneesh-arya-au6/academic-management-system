require("../app")
const User = require("../models/user")
const dotenv = require("dotenv");
dotenv.config();
const Student = require("../models/student")
const Book = require("../models/book")
const Library = require("../models/Library")
const { compareSync } = require("bcrypt")


const library_data = async(req,res) => {
    let Id = req.params.id;
    if(Id == null) return res.status(400).send("Bad request")
    try{
        let arr = [];
        let library = await Library.findAll({
            where:{studentId:Id},
            include:{
            model : Student, include: [User]
             
             }
            })
            // console.log(library[1].toJSON())
        for(let i=0;i<library.length;i++){

          var {name, email} = library[i].toJSON().student.user 
        var {bookId,date} = library[i].toJSON()
        }
        console.log(bookId)
        
        let books = await Book.findAll({
            where:{id:bookId}
        })
        // console.log(books)
        for(let i=0;i<books.length;i++){
          var bookName = books[i].dataValues.name
        console.log(bookName)
        var subject = books[i].dataValues.subject
        arr.push({StudentName:name,Email:email,bookName:bookName,Subject:subject})
        }
        
        console.log(arr)
       await res.json({libraryData:arr})
    }
    catch (err) {
        console.log(err);
        
          return res.status(400).send(`Validation Error: ${err.message}`);
      }
};

const books_issued = async (req, res) => {
    const {studentId} = req.body;
    if(!studentId) return res.status(403).send("please enter student Id")
    try {
      await Library.create({ ...req.body });
      res.send("Book Issued successfully")
    }
    catch (err) {
      console.log(err);
      
        return res.status(400).send(`Validation Error: ${err.message}`);
    }
  };


  const books_added = async (req, res) => {
    try {
      await Book.create({ ...req.body });
      res.send("Book addded successfully")
    }
    catch (err) {
      console.log(err);
      
        return res.status(400).send(`Validation Error: ${err.message}`);
    }
  };


module.exports = {library_data,books_issued, books_added};