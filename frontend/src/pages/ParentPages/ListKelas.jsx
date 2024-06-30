import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const ListTugas = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        // Fetch classes data from the backend
        const fetchClasses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/guru/classes");
                setClasses(response.data);
            } catch (error) {
                console.error('Error fetching classes data', error);
            }
        };
        fetchClasses();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Daftar Kelas</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.map((kelas) => (
                    <div key={kelas.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-2">{kelas.title}</h2>
                        <p className="text-gray-700 mb-1">Tahun: {kelas.year}</p>
                        <p className="text-gray-700 mb-1">Guru: {kelas.teacher.name}</p>
                        <p className="text-gray-700 mb-1">Periode: {kelas.start_date} - {kelas.end_date}</p>
                        <Link to={`/guru/kelas/${kelas.id}`} className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Lihat Kelas
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListTugas;