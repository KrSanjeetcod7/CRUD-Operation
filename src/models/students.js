const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:4
    },
    email:{
        type:String,
        required:true,
        unique:[true, "email id already present"],
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error('Invalid Email-id');
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
        min:10,
    },
    address:{
        type:String,
        required:true,
    }
});
//We will create a new Collection
const Student = new mongoose.model('user', studentSchema);
module.exports = Student;