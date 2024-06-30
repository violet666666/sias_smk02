import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormAddTugas = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [kelas, setKelas] = useState([]);
    const [selectedKelas, setSelectedKelas] = useState('');

    useEffect(() => {
        // Fetch kelas data from the backend
        const fetchKelas = async () => {
            try {
                const response = await axios.get("http://localhost:5000/classes");
                console.log(response.data);
                setKelas(response.data);
            } catch (error) {
                console.error('Error fetching kelas data', error);
            }
        };
        fetchKelas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            var token = localStorage.getItem("token");  
          
            const header = {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            }
            console.log(header);
         
            const response = await axios.post("http://localhost:5000/task", 
            { title, description, dueDate, classId: selectedKelas },
            {
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            
        } catch (error) {
            console.error('There was an error adding the task!', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Tambah Tugas</h1>
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
                        Tambah Tugas
                    </button>
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormAddTugas;