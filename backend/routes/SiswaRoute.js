import express from 'express';
import { verifyToken, checkRole } from '../middleware/AuthUser.js';
import { uploadTask } from '../controllers/Task.js';
import { getClassSchedule } from '../controllers/Classes.js';
import { markAttendance } from '../controllers/Attendance.js';

const router = express.Router();

router.post('/task/upload', verifyToken, checkRole(['siswa']), uploadTask);
router.get('/class/schedule', verifyToken, checkRole(['siswa']), getClassSchedule);
router.post('/attendance', verifyToken, checkRole(['siswa']), markAttendance);

export default router;