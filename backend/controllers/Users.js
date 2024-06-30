import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async(req, res) =>{
    try {
        const response = await User.findAll({
            attributes:['uuid','name','nomorInduk','email','role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async(req, res) =>{
    try{
        const response = await User.findOne( {
            attributes:['uuid','name','nomorInduk','email','role'],
                where: {
                    uuid: req.params.id
                }
            });
        res.status(200).json(response);
       } catch (error){
        res.status(500).json({message: error.message});
       }
}

export const createUser = async(req, res) =>{
    const {name, nomorInduk, email, password, confPassword, role} = req.body;
    console.log(password);
    console.log(confPassword);
    if(password !== confPassword) return res.status(400).json({message: "Password tidak sama"});
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            nomorInduk: nomorInduk,
            email: email,
            password : hashPassword,
            role : role
        });
        res.status(201).json({message: "User berhasil dibuat"});
    } catch (error) {
        req.status(400).json({message: error.message});
    }

}

export const updateUser = async(req, res) =>{
    const user = await User.findOne( {
            where: {
                uuid: req.params.id
            }
        });
        if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
        const {name, nomorInduk, email, password, confPassword, role} = req.body;
        let hashPassword;
        if(password === "" || password === null){
            hashPassword = user.password
        }else{
            hashPassword = await argon2.hash(password);
        }
        if(password !== confPassword) return res.status(400).json({message: "Password tidak sama"});if(password !== confPassword) return res.status(400).json({message: "Password tidak sama"});
        try {
            await User.update({
                name: name,
                nomorInduk: nomorInduk,
                email: email,
                password : hashPassword,
                role : role
            },{
                where:{
                    id: user.id
                }
            });
            res.status(200).json({message: "User berhasil diupdate"});
        } catch (error) {
            req.status(400).json({message: error.message});
        }
}

export const deleteUser = async(req, res) =>{
    const user = await User.findOne( {
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await User.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({message: "User berhasil dihapus"});
    } catch (error) {
        req.status(400).json({message: error.message});
    }
}