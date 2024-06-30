import Kelas from "../models/KelasModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";
import db from '../config/Database.js';

export const getClasses = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Kelas.findAll({
                attributes:['uuid','name','tahun','status','periodeAwal','periodeAkhir','deskripsi'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Kelas.findAll({
                attributes:['uuid','name','tahun','status','periodeAwal','periodeAkhir','deskripsi'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getKelasById = async(req, res) =>{
    try {
        const kelas = await Kelas.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!kelas) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin"){
            response = await Kelas.findOne({
                attributes:['uuid','name','tahun'],
                where:{
                    id: kelas.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Kelas.findOne({
                attributes:['uuid','name','tahun'],
                where:{
                    [Op.and]:[{id: kelas.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createKelas = async(req, res) =>{
    const {name, tahun, deskripsi, status, periodeAwal, periodeAkhir} = req.body;
    try {
        await Kelas.create({
            name: name,
            tahun: tahun,
            deskripsi: deskripsi,
            status: status,
            periodeAwal: periodeAwal,
            periodeAkhir: periodeAkhir,
            userId: req.userId
        });
        res.status(201).json({msg: "Kelas Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateKelas = async(req, res) =>{
    try {
        const kelas = await Kelas.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!kelas) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name, tahun, deskripsi, status, periodeAwal, periodeAkhir} = req.body;
        if(req.role === "admin"){
            await Kelas.update({name, tahun, deskripsi, status, periodeAwal, periodeAkhir},{
                where:{
                    id: kelas.id
                }
            });
        }else{
            if(req.userId !== kelas.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Kelas.update({name, tahun, deskripsi, status, periodeAwal, periodeAkhir},{
                where:{
                    [Op.and]:[{id: kelas.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Kelas updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteKelas = async(req, res) =>{
    try {
        const kelas = await Kelas.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!kelas) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name, tahun, deskripsi, status, periodeAwal, periodeAkhir} = req.body;
        if(req.role === "admin"){
            await Kelas.destroy({
                where:{
                    id: kelas.id
                }
            });
        }else{
            if(req.userId !== kelas.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Kelas.destroy({
                where:{
                    [Op.and]:[{id: kelas.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Kelas berhail dihapus"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getClassSchedule = async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM class_schedule WHERE student_id = ?', [req.user.id]);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getAllClasses = async (req, res) => {
    try {
        const classes = await Kelas.findAll({
            include: [{
                model: User,
                as: 'teacher',
                attributes: ['name']
            }]
        });
        res.status(200).json(classes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const addStudentToClass = async (req, res) => {
    const { classId } = req.params;
    const { studentId } = req.body;
    
    try {
        const kelas = await Kelas.findByPk(classId);
        if (!kelas) {
            return res.status(404).json({ message: 'Class not found' });
        }

        const student = await User.findByPk(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        await kelas.addStudent(student);
        res.status(200).json({ message: 'Student added to class successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};