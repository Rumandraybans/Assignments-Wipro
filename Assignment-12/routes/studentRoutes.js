import express from 'express';

import {
    addStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    searchStudents
}
from '../controllers/studentController.js';

const router = express.Router();

router.post('/students', addStudent);

router.get('/students', getStudents);

router.get('/students/search', searchStudents);

router.get('/students/:id', getStudentById);

router.put('/students/:id', updateStudent);

router.delete('/students/:id', deleteStudent);

export default router;