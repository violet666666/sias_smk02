import express from 'express';
import { verifyToken, checkRole } from '../middleware/AuthUser.js';
import { 
    getClasses,
    createKelas, 
    updateKelas, 
    deleteKelas
} from '../controllers/Classes.js';
import User from '../models/UserModel.js';

const router = express.Router();

router.get('/classes', verifyToken, checkRole(['guru', 'admin']), getClasses);
router.post('/classes', verifyToken, checkRole(['guru', 'admin']), createKelas);
router.patch('/classes/:id', verifyToken, checkRole(['guru', 'admin']), updateKelas);
router.delete('/classes/:id', verifyToken, checkRole(['guru', 'admin']), deleteKelas);

router.get('/students', verifyToken, checkRole(['guru', 'admin']), async (req, res) => {
    try {
        const students = await User.findAll({
            where: { role: 'siswa' },
            attributes: ['id', 'name']
        });
        res.json(students);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

export default router;