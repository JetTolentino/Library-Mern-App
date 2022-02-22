const Book = require('../models/Book')
const Student = require('../models/Student')

const addStudent = async(req,res)=> {
    const {firstName, lastName , studentId} = req.body
    const fullName = firstName + ' ' + lastName
  
    try{
      const student = await Student.create({
        firstName,
        lastName,
        fullName,
        studentId
      })
      res.json(student)
    }
    catch(err){
    res.send('failed to add student')
  
    }
  
  }

const studentList = async(req,res)=>{
    const students = await Student.find()
    res.json(students)
  
  }  

const studentBooks = async(req,res) => {
    let students = await Student.find()
    let books = await Book.find()
    books = books.filter(book => book.borrowedBy) //array of books 
    let studentList = students.filter(student => student.booksBorrowed.length !=0) //array of students
    studentList.map(book => console.log(book))
    res.json(studentList)
  }

const getOneStudent = async(req,res)=>{
    const id = req.params.id
  
    try{
      const student = await Student.findOne({studentId : id})
      res.json(student)
    }catch(err){
      res.json(err)
    }
  }  
  
const editStudent = async (req,res) => {
    const id = req.params.id
    const { firstName , lastName } = req.body
    try{
      const student = await Student.findById(id)
      student.firstName = firstName
      student.lastName = lastName
      student.save().then((student) => {
        res.json(student)
      })
      
    }
    catch(err){
      res.json(err)
    }
  
  }

const deleteStudent = async (req,res) => {
    const id = req.params.id
    try{
      const student = await Student.findById(id)
      student.deleteOne().then(()=>{
        res.json('DELETED STUDENT ' + student.firstName + ' ' + student.lastName)
      })
    }catch(err){
        res.json(err)
    }
  
  }

module.exports = {
                    addStudent ,
                    studentList , 
                    studentBooks,
                    getOneStudent,
                    editStudent,
                    deleteStudent}