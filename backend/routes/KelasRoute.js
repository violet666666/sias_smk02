import express from "express";
import {
    getClasses,
    getKelasById,
    createKelas,
    updateKelas,
    deleteKelas
} from "../controllers/Classes.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/classes',verifyUser, getClasses);
router.get('/classes/:id',verifyUser, getKelasById);
router.post('/classes',verifyUser, createKelas);
router.patch('/classes/:id',verifyUser, updateKelas);
router.delete('/classes/:id',verifyUser, deleteKelas);

export default router;