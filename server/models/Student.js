const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: [true , 'Please enter FirstName'] ,


    },
    lastName :{
        type: String,
        required: [true, 'Please enter LastName'],

    },
    
    fullName:{
        type: String
    },

    booksBorrowed : [{
        type: Object,
        ref: 'Book'
    }],

    studentId : {
        type : String,
        unique: true,
        required:true
    }

})

const Student = mongoose.model('Student' , studentSchema)
module.exports = Student