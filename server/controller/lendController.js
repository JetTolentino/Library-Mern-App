const Book = require('../models/Book')
const Student = require('../models/Student')

const lendBook = async(req,res) => {
    const bookId = req.body.bookId
    const studentId = req.body.studentId
  
    try{
      const student = await Student.findOne({studentId})
      const book = await Book.findOne({bookId})
  
      if(book.availability){
        book.availability = false
        book.borrowedBy = student.studentId
        student.booksBorrowed.push(book)
        book.save()
        student.save().then((student) => {
          res.json(student)
          console.log("LEND BOOK SUCCESSFULLY")
        })
  
      }
      else{
        throw new Error('Book is Unavailable')
      }
  
  
    }catch(err){
      console.log(err)
      res.send('FAILED TO LEND BOOK')
    }
  
  }



module.exports = {
    lendBook
}