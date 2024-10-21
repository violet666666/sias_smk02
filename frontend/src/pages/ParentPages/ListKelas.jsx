import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaChalkboardTeacher, FaCalendarAlt, FaUserGraduate } from 'react-icons/fa';

const ListKelas = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
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
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Daftar Kelas</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((kelas) => (
                    <div key={kelas.id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600">{kelas.title}</h2>
                        <p className="text-gray-700 mb-2 flex items-center">
                            <FaCalendarAlt className="mr-2 text-blue-500" /> Tahun: {kelas.year}
                        </p>
                        <p className="text-gray-700 mb-2 flex items-center">
                            <FaChalkboardTeacher className="mr-2 text-blue-500" /> Guru: {kelas.teacher.name}
                        </p>
                        <p className="text-gray-700 mb-4 flex items-center">
                            <FaCalendarAlt className="mr-2 text-blue-500" /> Periode: {kelas.start_date} - {kelas.end_date}
                        </p>
                        <Link to={`/guru/kelas/${kelas.id}`} className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
                            Lihat Kelas
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListKelas;
