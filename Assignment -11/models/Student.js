import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({

    name:
    {
        type:String,
        required:true
    },

    rollno:
    {
        type:Number,
        unique:true
    },

    course:String,

    age:
    {
        type:Number,
        min:16
    },

    email:String,

    city:String

});

const Student = mongoose.model('Student',studentSchema);

export default Student;