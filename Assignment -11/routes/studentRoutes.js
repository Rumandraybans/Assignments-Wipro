import express from 'express';

import {

    getStudents,
    showAddForm,
    addStudent,
    viewStudent,
    showEditForm,
    updateStudent,
    deleteStudent,
    searchStudent

}
from '../controllers/studentController.js';

const router = express.Router();

router.get('/',getStudents);

router.get('/add',showAddForm);

router.post('/add',addStudent);

router.get('/view/:id',viewStudent);

router.get('/edit/:id',showEditForm);

router.post('/update/:id',updateStudent);

router.get('/delete/:id',deleteStudent);

router.get('/search',searchStudent);

export default router;