const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    fees:{
        type:Number,
        required:true,
       
    }
})

const StudentModel = mongoose.model('student',StudentSchema);

module.exports = StudentModel;