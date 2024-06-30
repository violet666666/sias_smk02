import db from '../config/Database.js';

export const getDashboard = async (req, res) => {
  const { userId } = req.user;
  try {
    // Query untuk mendapatkan daftar tugas, kelas, dan absensi siswa
    const [tasks] = await db.execute('SELECT * FROM tasks WHERE userId = ?', [userId]);
    const [classes] = await db.execute('SELECT * FROM kelas WHERE userId = ?', [userId]);
    const [attendance] = await db.execute('SELECT * FROM attendance WHERE student_id = ?', [userId]);

    res.status(200).json({ tasks, classes, attendance });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};