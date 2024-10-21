import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { FaCalendarAlt, FaChalkboardTeacher, FaUserGraduate, FaPlus } from 'react-icons/fa';

const FormListAbsensi = () => {
    const [absensi, setAbsensi] = useState([]);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
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
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Daftar Absensi</h1>
                {user && ["admin", "guru"].includes(user.role) && (
                    <Link to="/attendance/add" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out flex items-center">
                        <FaPlus className="mr-2" /> Tambah Absensi Baru
                    </Link>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {absensi.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="text-blue-500 mr-2" />
                                        <span>{new Date(item.date).toLocaleDateString()}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <FaChalkboardTeacher className="text-purple-500 mr-2" />
                                        <span>{item.class_name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <FaUserGraduate className="text-green-500 mr-2" />
                                        <span>{item.student_name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        item.status === 'Hadir' ? 'bg-green-100 text-green-800' : 
                                        item.status === 'Izin' ? 'bg-yellow-100 text-yellow-800' : 
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FormListAbsensi;
