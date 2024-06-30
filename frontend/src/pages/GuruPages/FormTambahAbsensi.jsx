import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormTambahAbsensi = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState('');
    const [kelas, setKelas] = useState([]);
    const [selectedKelas, setSelectedKelas] = useState('');
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});

    useEffect(() => {
        // Fetch kelas data from the backend
        const fetchKelas = async () => {
            try {
                const response = await axios.get("http://localhost:5000/classes");
                setKelas(response.data);
            } catch (error) {
                console.error('Error fetching kelas data', error);
            }
        };

        fetchKelas();
    }, []);

    useEffect(() => {
        if (selectedKelas) {
            // Fetch students data for the selected class
            const fetchStudents = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/classes/${selectedKelas}/students`);
                    setStudents(response.data);
                } catch (error) {
                    console.error('Error fetching students data', error);
                }
            };

            fetchStudents();
        }
    }, [selectedKelas]);

    const handleAttendanceChange = (studentId, status) => {
        setAttendance({
            ...attendance,
            [studentId]: status,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/attendance", {
                date,
                classId: selectedKelas,
                attendance,
            });
            alert(response.data.message);
            navigate('/guru/list-absensi');
        } catch (error) {
            console.error('There was an error adding the attendance!', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Tambah Absensi</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Tanggal</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
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
                {students.length > 0 && (
                    <div className="mb-4">
                        <label className="block text-gray-700">Absensi</label>
                        {students.map((student) => (
                            <div key={student.id} className="flex items-center mb-2">
                                <span className="mr-4">{student.name}</span>
                                <select
                                    value={attendance[student.id] || ''}
                                    onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Pilih Status</option>
                                    <option value="Hadir">Hadir</option>
                                    <option value="Tidak Hadir">Tidak Hadir</option>
                                    <option value="Izin">Izin</option>
                                    <option value="Sakit">Sakit</option>
                                </select>
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex justify-end space-x-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Tambah Absensi
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/guru/list-absensi')}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormTambahAbsensi;