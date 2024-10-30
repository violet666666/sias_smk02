import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserPlus, Plus, X } from 'lucide-react';

const FormAddKelas = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [name, setName] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tahun, setTahun] = useState("");
  const [status, setStatus] = useState("Aktif");
  const [periodeAwal, setPeriodeAwal] = useState("");
  const [periodeAkhir, setPeriodeAkhir] = useState("");
  const [msg, setMsg] = useState("");
  const [students, setStudents] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    const fetchAvailableStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/students", {
          headers: {
            "Authorization": `${token}`
          }
        });
        console.log("Fetched students:", response.data);
        setAvailableStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchAvailableStudents();
  }, []);

  const handleAddStudent = () => {
    if (selectedStudent) {
      const studentId = parseInt(selectedStudent);
      const studentToAdd = availableStudents.find(s => s.id === studentId);
      
      if (studentToAdd && !students.some(s => s.id === studentId)) {
        setStudents(prevStudents => [...prevStudents, studentToAdd]);
        console.log("Student added:", studentToAdd);
      }
      setSelectedStudent("");
    }
  };

  const handleRemoveStudent = (studentId) => {
    setStudents(students.filter(student => student.id !== studentId));
  };

  const saveKelas = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = {
        name,
        deskripsi,
        tahun,
        status,
        periodeAwal,
        periodeAkhir,
        studentIds: students.map(student => student.id)
      };
      console.log("Saving class with data:", payload);
      
      await axios.post("http://localhost:5000/classes", payload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`
        }
      });
      onClose();
      window.location.reload();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        console.error("Network error:", error);
        setMsg("Terjadi kesalahan jaringan");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Buat Kelas Baru</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 ${activeTab === 'info' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('info')}
          >
            Informasi Kelas
          </button>
          <button
            className={`px-4 py-2 flex items-center gap-2 ${activeTab === 'students' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('students')}
          >
            <UserPlus size={20} />
            Tambah Siswa
          </button>
        </div>

        <form onSubmit={saveKelas}>
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            <p className="text-center text-red-500 mb-4">{msg}</p>

            {activeTab === 'info' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama Kelas</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                  <input
                    type="text"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tahun</label>
                  <input
                    type="text"
                    value={tahun}
                    onChange={(e) => setTahun(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Periode</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={periodeAwal}
                      onChange={(e) => setPeriodeAwal(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                    <input
                      type="date"
                      value={periodeAkhir}
                      onChange={(e) => setPeriodeAkhir(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <select
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                  >
                    <option value="">Pilih Siswa</option>
                    {availableStudents.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddStudent}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <div className="border rounded-lg">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">No</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nama Siswa</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {students.map((student, index) => (
                        <tr key={student.id}>
                          <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{student.name}</td>
                          <td className="px-4 py-2 text-sm">
                            <button
                              type="button"
                              onClick={() => handleRemoveStudent(student.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 p-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddKelas;