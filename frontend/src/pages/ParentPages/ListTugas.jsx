import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Daftar Tugas</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Judul</th>
                        <th className="px-4 py-2 border-b">Deskripsi</th>
                        <th className="px-4 py-2 border-b">Batas Pengumpulan</th>
                        <th className="px-4 py-2 border-b">Kelas</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border-b">{task.title}</td>
                            <td className="px-4 py-2 border-b">{task.description}</td>
                            <td className="px-4 py-2 border-b">{new Date(task.due_date).toISOString().split('T')[0]}</td>
                            <td className="px-4 py-2 border-b">{task.Class.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListTugas;