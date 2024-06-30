import db from '../config/Database.js';
import Task from '../models/TaskModel.js'; // Impor model Task
import { DataTypes } from 'sequelize';
import User from '../models/UserModel.js';
import Kelas from '../models/KelasModel.js';


export const createTask = async (req, res) => {
    const { title, description, dueDate, classId } = req.body;
    try {
        const task = await Task.create({ title, description, due_date: dueDate, class_id: classId });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;
    try {
        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        task.title = title;
        task.description = description;
        task.due_date = dueDate;
        await task.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        await task.destroy();
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const uploadTask = async (req, res) => {
    const { studentId, taskId, fileUrl } = req.body;
    try {
        const TaskSubmission = db.define('TaskSubmission', {
            student_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            task_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            file_url: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            tableName: 'task_submissions',
            timestamps: false
        });

        const submission = await TaskSubmission.create({ student_id: studentId, task_id: taskId, file_url: fileUrl });
        res.status(201).json(submission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getStudentTasks = async (req, res) => {
    const { studentId } = req.params;

    try {
        const student = await User.findByPk(studentId, {
            include: [{
                model: Kelas,
                include: [Task]
            }]
        });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const tasks = student.Classes.reduce((acc, kelas) => {
            return acc.concat(kelas.Tasks);
        }, []);

        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};