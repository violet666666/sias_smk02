import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaBook, FaCalendarAlt, FaChalkboardTeacher } from 'react-icons/fa';

const ListTugas = () => {
    const { studentId } = useParams();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks data from the backend
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/parent/students/${studentId}/tasks`);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks data', error);
            }
        };
        fetchTasks();
    }, [studentId]);

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Daftar Tugas</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Batas Pengumpulan</th>
                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {tasks.map((task) => (
                            <tr key={task.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="flex items-center">
                                        <FaBook className="text-blue-500 mr-2" />
                                        {task.title}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{task.description}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{new Date(task.due_date).toISOString().split('T')[0]}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{task.Class.title}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListTugas;
