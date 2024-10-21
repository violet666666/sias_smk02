import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { FaBook, FaCalendarAlt, FaChalkboardTeacher, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

const FormListTugas = () => {
    const [tugas, setTugas] = useState([]);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        fetchTugas();
    }, []);

    const fetchTugas = async () => {
        try {
            const response = await axios.get("http://localhost:5000/tasks");
            setTugas(response.data);
        } catch (error) {
            console.error('Error fetching tugas data', error);
            alert('Failed to fetch tasks. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await axios.delete(`http://localhost:5000/tasks/${id}`);
                fetchTugas(); // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting task', error);
                alert('Failed to delete task. Please try again.');
            }
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Daftar Tugas</h1>
                {user && ["admin", "guru"].includes(user.role) && (
                    <Link to="/task/add-tugas" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out flex items-center">
                        <FaPlus className="mr-2" /> Tambah Tugas Baru
                    </Link>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batas Pengumpulan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {tugas.map((tugas) => (
                            <tr key={tugas.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <FaBook className="text-blue-500 mr-2" />
                                        <span className="font-medium">{tugas.title}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{tugas.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <FaChalkboardTeacher className="text-purple-500 mr-2" />
                                        <span>{tugas.class_id}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="text-green-500 mr-2" />
                                        <span>{new Date(tugas.due_date).toLocaleDateString()}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user && ["admin", "guru"].includes(user.role) && (
                                        <div className="flex space-x-2">
                                            <Link to={`/task/edit-tugas/${tugas.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full transition duration-300 ease-in-out flex items-center">
                                                <FaEdit className="mr-1" /> Edit
                                            </Link>
                                            <button onClick={() => handleDelete(tugas.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full transition duration-300 ease-in-out flex items-center">
                                                <FaTrash className="mr-1" /> Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FormListTugas;
