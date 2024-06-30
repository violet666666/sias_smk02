import express from 'express';
import { verifyToken, checkRole } from '../middleware/AuthUser.js';
import { getDashboard } from '../controllers/Dashboard.js';
import { addStudentToClass } from '../controllers/Classes.js';
import { getStudentAttendance } from '../controllers/Attendance.js';
import { getStudentTasks } from '../controllers/Task.js';

const router = express.Router();

router.get('/dashboard', verifyToken, checkRole(['orang tua']), getDashboard);

router.post('/classes/:classId/students', addStudentToClass);
router.get('/students/:studentId/attendance', getStudentAttendance);
router.get('/students/:studentId/tasks', getStudentTasks);

export default router;