import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FormListKelas = () => {
    const { classId } = useParams();
    const navigate = useNavigate();
    const [kelas, setKelas] = useState({});
    const [students, setStudents] = useState([]);
    const [studentId, setStudentId] = useState('');

    useEffect(() => {
        // Fetch class data from the backend
        const fetchClass = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/classes/${classId}`);
                setKelas(response.data);
            } catch (error) {
                console.error('Error fetching class data', error);
            }
        };

        // Fetch students data from the backend
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/classes/${classId}/students`);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students data', error);
            }
        };

        fetchClass();
        fetchStudents();
    }, [classId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/parent/classes/${classId}/students`, { studentId });
            alert(response.data.message);
            setStudentId('');
            fetchStudents(); // Refresh the students list
        } catch (error) {
            console.error('There was an error adding the student to the class!', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Detail Kelas</h1>
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">{kelas.title}</h2>
                <p className="text-gray-700 mb-1">Deskripsi: {kelas.description}</p>
                <p className="text-gray-700 mb-1">Tahun: {kelas.year}</p>
                <p className="text-gray-700 mb-1">Periode: {kelas.start_date} - {kelas.end_date}</p>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Daftar Siswa</h2>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2">No</th>
                            <th className="py-2">Nomor Induk</th>
                            <th className="py-2">Nama Siswa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.id} className="hover:bg-gray-100">
                                <td className="py-2">{index + 1}</td>
                                <td className="py-2">{student.student_number}</td>
                                <td className="py-2">{student.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700">Nomor Induk Anak</label>
                    <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Tambah Anak
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/parent/list-kelas')}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Kembali
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormListKelas;