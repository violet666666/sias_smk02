import express from 'express';
import { verifyToken, checkRole } from '../middleware/AuthUser.js';
import { createKelas, updateKelas, deleteKelas } from '../controllers/Classes.js';
import { createTask, updateTask, deleteTask, getAllTasks } from '../controllers/Task.js';
import { createAttendance } from '../controllers/Attendance.js';

import { getAllClasses } from '../controllers/Classes.js';

const router = express.Router();

router.post('/class', verifyToken, checkRole(['guru']), createKelas);
router.put('/class/:id', verifyToken, checkRole(['guru']), updateKelas);
router.delete('/class/:id', verifyToken, checkRole(['guru']), deleteKelas);

router.post('/task', verifyToken, checkRole(['guru']), createTask);
router.put('/task/:id', verifyToken, checkRole(['guru']), updateTask);
router.delete('/task/:id', verifyToken, checkRole(['guru']), deleteTask);

router.get('/tasks', getAllTasks);
router.get('/classes', getAllClasses);

router.post('/attendance', verifyToken, checkRole(['guru']), createAttendance);

export default router;