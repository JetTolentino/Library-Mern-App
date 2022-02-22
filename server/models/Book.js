const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type : String,
        required: true
    },
    author : {
        type: String
    },
    borrowedBy : {
        type : String,
        ref : 'Student'
    },
    availability:{
        type: Boolean,
        default: true
    },
    bookId : {
        type: String,
        unique: true,
        required: true
    }
})

const Book = mongoose.model('Book' , bookSchema)
module.exports = Book