// import express from 'express';
// const { verifyToken, checkRole } = require('../middleware/AuthUser');
// import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/Users.js';


// const express = require('express');
// const router = express.Router();

// router.post('/user', verifyToken, checkRole(['admin']), createUser);
// router.put('/users/:id', verifyToken, checkRole(['admin']), updateUser);
// router.delete('/users/:id', verifyToken, checkRole(['admin']), deleteUser);


// router.get('/users', verifyToken, checkRole(['admin']), getUsers);
// router.get('/users/:id', verifyToken, checkRole(['admin']), getUserById);


// module.exports = router;

// export default router;


// Kodingan lama
import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', verifyUser, adminOnly, getUsers);
router.get('/users/:id', verifyUser, adminOnly, getUserById);
router.post('/users', verifyUser, adminOnly, createUser);
router.patch('/users/:id', verifyUser, adminOnly, updateUser);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

export default router;