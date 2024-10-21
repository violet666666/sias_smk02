import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBook, FaCalendarAlt, FaChalkboardTeacher, FaEdit } from 'react-icons/fa';

const FormEditTugas = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [kelas, setKelas] = useState([]);
    const [selectedKelas, setSelectedKelas] = useState('');

    useEffect(() => {
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
            navigate('/task/list-tugas');
        } catch (error) {
            console.error('There was an error updating the task!', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
                <FaEdit className="mr-2 text-blue-500" /> Edit Tugas
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        <FaBook className="inline mr-2 text-blue-500" /> Judul
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan judul tugas"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Deskripsi
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="Masukkan deskripsi tugas"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kelas">
                        <FaChalkboardTeacher className="inline mr-2 text-blue-500" /> Kelas
                    </label>
                    <select
                        id="kelas"
                        value={selectedKelas}
                        onChange={(e) => setSelectedKelas(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Pilih Kelas</option>
                        {kelas.map((kelas) => (
                            <option key={kelas.id} value={kelas.id}>
                                {kelas.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
                        <FaCalendarAlt className="inline mr-2 text-blue-500" /> Batas Pengumpulan
                    </label>
                    <input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/task/list-tugas')}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    >
                        Update Tugas
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormEditTugas;
