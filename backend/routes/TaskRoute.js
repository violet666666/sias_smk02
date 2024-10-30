import express from "express";
import {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    getStudentTasks
} from "../controllers/Task.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/tasks', verifyUser, getAllTasks);
router.post('/tasks', verifyUser, createTask);
router.put('/tasks/:id', verifyUser, updateTask);
router.delete('/tasks/:id', verifyUser, deleteTask);
router.get('/tasks/student/:studentId', verifyUser, getStudentTasks);

export default router;
