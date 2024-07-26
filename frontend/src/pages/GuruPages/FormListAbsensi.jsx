import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const FormListAbsensi = () => {
    const [absensi, setAbsensi] = useState([]);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        // Fetch absensi data from the backend
        const fetchAbsensi = async () => {
            try {
                const response = await axios.get("http://localhost:5000/attendance");
                setAbsensi(response.data);
            } catch (error) {
                console.error('Error fetching absensi data', error);
            }
        };
        fetchAbsensi();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Daftar Absensi</h1>
            {user && ["admin", "guru"].includes(user.role) && (
                <Link to="/task/add-tugas" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
                    Tambah Absensi Baru
                </Link>
            )}
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Tanggal</th>
                        <th className="px-4 py-2 border-b">Kelas</th>
                        <th className="px-4 py-2 border-b">Nama Siswa</th>
                        <th className="px-4 py-2 border-b">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {absensi.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border-b">{new Date(item.date).toISOString().split('T')[0]}</td>
                            <td className="px-4 py-2 border-b">{item.class_name}</td>
                            <td className="px-4 py-2 border-b">{item.student_name}</td>
                            <td className="px-4 py-2 border-b">{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FormListAbsensi;