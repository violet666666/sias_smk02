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
        console.log('Received request for kelas ID:', req.params.id);
        console.log('User role:', req.role);
        console.log('User ID:', req.userId);

        const kelas = await Kelas.findOne({
            where:{
                uuid: req.params.id
            },
            attributes: ['uuid', 'name', 'deskripsi', 'tahun', 'status', 'periodeAwal', 'periodeAkhir'],
            include: [
                {
                    model: User,
                    as: 'students',
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            ]
        });
        
        if(!kelas) return res.status(404).json({msg: "Data tidak ditemukan"});
        
        console.log('Found kelas:', JSON.stringify(kelas, null, 2));
        
        const response = {
            uuid: kelas.uuid,
            name: kelas.name,
            deskripsi: kelas.deskripsi,
            tahun: kelas.tahun,
            status: kelas.status,
            periodeAwal: kelas.periodeAwal,
            periodeAkhir: kelas.periodeAkhir,
            students: kelas.students || []
        };
        
        res.status(200).json(response);
    } catch (error) {
        console.error('Detailed error:', error);
        console.error('Stack trace:', error.stack);
        res.status(500).json({msg: error.message});
    }
}

export const createKelas = async (req, res) => {
    const { name, deskripsi, tahun, status, periodeAwal, periodeAkhir, studentIds } = req.body;
    try {
        const newKelas = await Kelas.create({
            name,
            deskripsi,
            tahun,
            status,
            periodeAwal,
            periodeAkhir,
            userId: req.userId
        });

        if (studentIds && studentIds.length > 0) {
            const students = await User.findAll({
                where: {
                    id: studentIds,
                    role: 'siswa'
                }
            });
            await newKelas.addStudents(students);
        }

        res.status(201).json({ msg: "Kelas Created Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
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
        
        const {name, tahun, deskripsi, status, periodeAwal, periodeAkhir, studentIds} = req.body;
        
        if(req.role === "admin" || req.userId === kelas.userId){
            await Kelas.update({
                name, tahun, deskripsi, status, periodeAwal, periodeAkhir
            },{
                where:{
                    id: kelas.id
                }
            });

            if (studentIds) {
                const students = await User.findAll({
                    where: {
                        id: studentIds,
                        role: 'siswa'
                    }
                });
                await kelas.setStudents(students);
            }
            
            res.status(200).json({msg: "Kelas updated successfully"});
        } else {
            return res.status(403).json({msg: "Akses terlarang"});
        }
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
                attributes: ['name', 'email']
            }]
        });
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.findAll({
      where: {
        role: 'siswa'
      },
      attributes: ['id', 'name', 'nisn']
    });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ msg: error.message });
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