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

    course:
    {
        type:String
    },

    age:
    {
        type:Number,
        min:16
    },

    email:
    {
        type:String
    },

    city:
    {
        type:String
    }
});

const Student = mongoose.model("Student", studentSchema);

export default Student;