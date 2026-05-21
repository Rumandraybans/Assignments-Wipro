import Student from '../models/student.js';

export const getStudents = async(req,res)=>
{
    const students = await Student.find();
    res.render('index',{students});
}

export const showAddForm = (req,res)=>
{
    res.render('addStudent');
}

export const addStudent = async(req,res)=>
{
    await Student.create(req.body);
    res.redirect('/students');
}

export const viewStudent = async(req,res)=>
{
    const student = await Student.findById(req.params.id);

    res.render('viewStudent',{student});
}

export const showEditForm = async(req,res)=>
{
    const student = await Student.findById(req.params.id);

    res.render('editStudent',{student});
}

export const updateStudent = async(req,res)=>
{
    await Student.findByIdAndUpdate(req.params.id,req.body);

    res.redirect('/students');
}

export const deleteStudent = async(req,res)=>
{
    await Student.findByIdAndDelete(req.params.id);

    res.redirect('/students');
}

export const searchStudent = async(req,res)=>
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

    res.render('index',{students});
}