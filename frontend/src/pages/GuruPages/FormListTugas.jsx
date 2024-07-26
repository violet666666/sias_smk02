import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';


const FormListTugas = () => {
    const [tugas, setTugas] = useState([]);
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        // Fetch tugas data from the backend
        const fetchTugas = async () => {
            try {
                const response = await axios.get("http://localhost:5000/tasks");
                setTugas(response.data);
            } catch (error) {
                console.error('Error fetching tugas data', error);
            }
        };
        fetchTugas();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Daftar Tugas</h1>
            {user && ["admin", "guru"].includes(user.role) && (
                <Link to="/task/add-tugas" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
                    Tambah Tugas Baru
                </Link>
            )}
            <table className="min-w-full bg-white border border-gray-200 text-center">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Judul</th>
                        <th className="px-4 py-2 border-b">Deskripsi</th>
                        <th className="px-4 py-2 border-b">Kelas</th>
                        <th className="px-4 py-2 border-b">Batas Pengumpulan</th>
                        <th className="px-4 py-2 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tugas.map((tugas) => (
                        <tr key={tugas.id} className="hover:bg-gray-100 text-center">
                            <td className="px-4 py-2 border-b">{tugas.title}</td>
                            <td className="px-4 py-2 border-b">{tugas.description}</td>
                            <td className="px-4 py-2 border-b">{tugas.class_id}</td>
                            <td className="px-4 py-2 border-b">{new Date(tugas.due_date).toISOString().split('T')[0]}</td>
                            <td className="px-4 py-2 border-b">
                                {user && ["admin", "guru"].includes(user.role) && (
                                    <Link to={`/task/edit-tugas/${tugas.id}`} className="bg-blue-500 text-white px-4 py-2 rounded inline-block">
                                        Edit
                                    </Link>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FormListTugas;