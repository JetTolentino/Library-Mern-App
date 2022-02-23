const Book = require('../models/Book')
const Student = require('../models/Student')

const addBook = async (req, res) => {
    const {title, author , bookId} = req.body
    try{
      const book = await Book.create({
        title,
        author,
        bookId,
      })
      res.json(book)
    }
    catch(err){
      res.send('failed to add book')
  
    }
  }

const bookList = async(req,res)=>{
    const book = await Book.find()
    res.json(book)
  }  

const getOneBook = async(req,res)=>{
    const id = req.params.id
    try{
      const book = await Book.findOne({bookId : id})
      res.json(book)
    }catch(err){
      res.json(err)
    }
  }
const editBook = async (req,res) => {
    const id = req.params.id
    const { title , author } = req.body
    try{
      const book = await Book.findById(id)
      book.title = title
      book.author = author
      book.save().then((book) => {
        res.json(book)
      })
      
    }
    catch(err){
      res.json(err)
    }
  
  }

const deleteBook =  async (req,res) => {
    const id = req.params.id
    try{
      const book = await Book.findById(id)
      book.deleteOne().then(()=>{
        res.json('DELETED BOOK ' + book.title)
      })
    }catch(err){
        res.json(err)
    }
  
  }

module.exports = {  addBook , 
                    bookList,
                    getOneBook,
                    editBook,
                    deleteBook,}