import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import FormAddKelas from "./FormAddKelas";
import FormEditKelas from "./FormEditKelas";

const KelasList = () => {
  const [classes, setClasses] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedKelasId, setSelectedKelasId] = useState(null);

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/classes", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`
        }
      });
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error.response?.data?.msg || error.message);
    }
  };

  const deleteKelas = async (kelasId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/classes/${kelasId}`, {
        headers: {
          "Authorization": `${token}`
        }
      });
      getClasses();
    } catch (error) {
      console.error("Error deleting class", error);
    }
  };

  const handleDelete = (kelasId) => {
    const confirmDelete = window.confirm("Apakah Anda yakin menghapus Kelas?");
    if (confirmDelete) {
      deleteKelas(kelasId);
    }
  };

  const handleEdit = (kelasId) => {
    setSelectedKelasId(kelasId);
    setIsEditModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Daftar Kelas</h1>
        {user && ["admin", "guru"].includes(user.role) && (
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out flex items-center"
          >
            <FaPlus className="mr-2" /> Tambah Kelas Baru
          </button>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <FormAddKelas onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <FormEditKelas kelasId={selectedKelasId} onClose={() => setIsEditModalOpen(false)} />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Nama Kelas</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Tahun</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Mulai</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Selesai</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {classes.map((kelas, index) => (
              <tr key={kelas.uuid} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{index + 1}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{kelas.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{kelas.tahun}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${kelas.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {kelas.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{new Date(kelas.periodeAwal).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{new Date(kelas.periodeAkhir).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium">
                  <button onClick={() => handleEdit(kelas.uuid)} className="text-blue-600 hover:text-blue-900 mr-3">
                    <FaEdit className="inline-block mr-1" /> Edit
                  </button>
                  <button onClick={() => handleDelete(kelas.uuid)} className="text-red-600 hover:text-red-900">
                    <FaTrash className="inline-block mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KelasList;
