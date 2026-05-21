import Student from '../models/Student.js';

export const addStudent = async(req,res)=>
{
    try
    {
        const student = await Student.create(req.body);
        res.json(student);
    }
    catch(error)
    {
        res.status(500).send(error.message);
    }
}

export const getStudents = async(req,res)=>
{
    try
    {
        const students = await Student.find();
        res.json(students);
    }
    catch(error)
    {
        res.status(500).send(error.message);
    }
}

export const getStudentById = async(req,res)=>
{
    try
    {
        const student = await Student.findById(req.params.id);

        if(!student)
        {
            return res.status(404).send("Student not found");
        }

        res.json(student);
    }
    catch(error)
    {
        res.status(500).send(error.message);
    }
}

export const updateStudent = async(req,res)=>
{
    try
    {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json(student);
    }
    catch(error)
    {
        res.status(500).send(error.message);
    }
}

export const deleteStudent = async(req,res)=>
{
    try
    {
        await Student.findByIdAndDelete(req.params.id);

        res.send("Student deleted");
    }
    catch(error)
    {
        res.status(500).send(error.message);
    }
}

export const searchStudents = async(req,res)=>
{
    try
    {
        const keyword = req.query.keyword;

        const students = await Student.find({
            $or:
            [
                {name:{$regex:keyword,$options:'i'}},
                {course:{$regex:keyword,$options:'i'}},
                {city:{$regex:keyword,$options:'i'}}
            ]
        });

        res.json(students);
    }
    catch(error)
    {
        res.status(500).send(error.message);
    }
}