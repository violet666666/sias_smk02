import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormEditTugas = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [kelas, setKelas] = useState([]);
    const [selectedKelas, setSelectedKelas] = useState('');

    useEffect(() => {
        // Fetch tugas data from the backend
        const fetchTugas = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tasks/${id}`);
                const { title, description, due_date, class_id } = response.data;
                setTitle(title);
                setDescription(description);
                setDueDate(due_date);
                setSelectedKelas(class_id);
            } catch (error) {
                console.error('Error fetching tugas data', error);
            }
        };

        // Fetch kelas data from the backend
        const fetchKelas = async () => {
            try {
                const response = await axios.get("http://localhost:5000/classes");
                setKelas(response.data);
            } catch (error) {
                console.error('Error fetching kelas data', error);
            }
        };

        fetchTugas();
        fetchKelas();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/tasks/${id}`, { title, description, dueDate, classId: selectedKelas });
            alert(response.data.message);
            navigate('/guru/list-tugas');
        } catch (error) {
            console.error('There was an error updating the task!', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Edit Tugas</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Judul</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Deskripsi</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Kelas</label>
                    <select
                        value={selectedKelas}
                        onChange={(e) => setSelectedKelas(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Pilih Kelas</option>
                        {kelas.map((kelas) => (
                            <option key={kelas.id} value={kelas.id}>
                                {kelas.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Batas Pengumpulan</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Update Tugas
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/guru/list-tugas')}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormEditTugas;