import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ListKehadiran = () => {
    const { studentId } = useParams();
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        // Fetch attendance data from the backend
        const fetchAttendance = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/parent/students/${studentId}/attendance`);
                setAttendance(response.data);
            } catch (error) {
                console.error('Error fetching attendance data', error);
            }
        };
        fetchAttendance();
    }, [studentId]);

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Daftar Kehadiran</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Tanggal</th>
                        <th className="px-4 py-2 border-b">Kelas</th>
                        <th className="px-4 py-2 border-b">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border-b">{new Date(record.date).toISOString().split('T')[0]}</td>
                            <td className="px-4 py-2 border-b">{record.Class.title}</td>
                            <td className="px-4 py-2 border-b">{record.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListKehadiran;