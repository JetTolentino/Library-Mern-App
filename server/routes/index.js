var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const {lendBook} = require('../controller/lendController')
const {returnBook} = require('../controller/returnController')
const {newAdmin , loginAdmin} = require('../controller/adminController')
const { addBook , 
        bookList,
        getOneBook,
        editBook,
        deleteBook} = require('../controller/bookController')


const { addStudent, 
        studentList , 
        studentBooks,
        getOneStudent,
        editStudent,
        deleteStudent} = require('../controller/studentController')



//STUDENT ROUTER

//ADD STUDENT
router.post('/addstudent', authorizeToken , addStudent)
//GET STUDENT LIST
router.get('/studentlist', authorizeToken , studentList)
// GET STUDENTS WITH BOOKS LENDED
router.get('/studentbooks', authorizeToken , studentBooks)
//GET ONE STUDENT
router.get('/studentlist/:id', authorizeToken , getOneStudent)
//EDIT STUDENT
router.post('/studentlist/:id', authorizeToken , editStudent)
//DELETE STUDENT
router.delete('/studentlist/:id', authorizeToken , deleteStudent)


//BOOKS ROUTER//

/* ADD BOOK */
router.post('/addbook', authorizeToken , addBook)
//GET BOOKLIST
router.get('/booklist', authorizeToken , bookList)
//GET ONE BOOK
router.get('/booklist/:id', authorizeToken , getOneBook)
//EDIT BOOK
router.post('/booklist/:id', authorizeToken , editBook)
//DELETE BOOK 
router.delete('/booklist/:id', authorizeToken , deleteBook)



//LEND/RETURN ROUTER

//LEND BOOK TO STUDENT
router.post('/lendbook', authorizeToken , lendBook)
//RETURN BOOK
router.post('/returnbook', authorizeToken , returnBook)



//ADMIN ROUTER

//NEW ADMIN
router.post('/newadmin' , newAdmin)
//LOGIN ADMIN
router.post('/login' , loginAdmin)


function authorizeToken (req, res, next){
  const authHeader = req.headers['authorization']
  const token =authHeader && authHeader.split(' ')[1]
  if(token == null) return res.send('no token found')

  jwt.verify(token , 'secret', (err, user) =>{
    if(err) return res.send('invalid token')

    req.user = user 
    next()
  })

}



module.exports = router;
