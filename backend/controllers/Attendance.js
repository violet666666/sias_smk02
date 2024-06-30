import db from '../config/Database.js';
import Attendance from '../models/AttendanceModel.js';
import User from '../models/UserModel.js';
import Kelas from '../models/KelasModel.js';

export const createAttendance = async (req, res) => {
  const { studentId, classId, date, status } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO attendance (student_id, class_id, date, status) VALUES (?, ?, ?, ?)',
      [studentId, classId, date, status]
    );
    res.status(201).json({ id: result.insertId, studentId, classId, date, status });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const markAttendance = async (req, res) => {
  const { studentId, classId, date, status } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO attendance (student_id, class_id, date, status) VALUES (?, ?, ?, ?)',
      [studentId, classId, date, status]
    );
    res.status(201).json({ id: result.insertId, studentId, classId, date, status });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getStudentAttendance = async (req, res) => {
  const { studentId } = req.params;

  try {
      const attendanceRecords = await Attendance.findAll({
          where: { student_id: studentId },
          include: [
              {
                  model: Student,
                  attributes: ['name', 'student_number']
              },
              {
                  model: Class,
                  attributes: ['title', 'year', 'start_date', 'end_date']
              }
          ]
      });
      res.status(200).json(attendanceRecords);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};