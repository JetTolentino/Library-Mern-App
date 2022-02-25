const Book = require('../models/Book')
const Student = require('../models/Student')

const returnBook = async(req,res) => {
    const bookId = req.body.bookId
    const studentId = req.body.studentId
  
    try{
      const student = await Student.findOne({studentId})
      const book = await Book.findOne({bookId})
  
      const booksBorrowed = student.booksBorrowed.filter((book) => {
        if(book.bookId != bookId){
          return book
        }
      })
      console.log(booksBorrowed)
      student.booksBorrowed = booksBorrowed
      book.availability = true
      book.borrowedBy = null
      book.save()
      student.save().then(student =>{
        console.log("SUCCESSFULLY RETURNED BOOK")
        res.json({student, book})
      })
  
  
    }catch(err){
      res.send('FAILED TO RETURN BOOK')
    }
  }

module.exports = {
    returnBook
}