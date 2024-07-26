import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';

const KelasList = () => {
  const [classes, setClasses] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    const response = await axios.get("http://localhost:5000/classes");
    setClasses(response.data);
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kelas</h1>
      <h2 className="text-xl mb-4">Daftar Kelas</h2>
      {user && ["admin", "guru"].includes(user.role) && (
                <Link to="/classes/add" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
                    Tambah Kelas Baru
                </Link>
            )}
      <table className="min-w-full bg-white border border-gray-200 text-center">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">No</th>
            <th className="px-4 py-2 border-b">Nama Kelas</th>
            <th className="px-4 py-2 border-b">Tahun</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Mulai</th>
            <th className="px-4 py-2 border-b">Selesai</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((kelas, index) => (
            <tr key={kelas.uuid} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">{index + 1}</td>
              <td className="px-4 py-2 border-b">{kelas.name}</td>
              <td className="px-4 py-2 border-b">{kelas.tahun}</td>
              <td className="px-4 py-2 border-b">{kelas.status}</td>
              <td className="px-4 py-2 border-b">{new Date(kelas.periodeAwal).toISOString().split('T')[0]}</td>
              <td className="px-4 py-2 border-b">{new Date(kelas.periodeAkhir).toISOString().split('T')[0]}</td>
              <td className="px-4 py-2 border-b">
                <Link
                  to={`/classes/edit/${kelas.uuid}`}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </Link>
                <button
     onClick={() => handleDelete(kelas.uuid)}
     className="bg-red-500 text-white px-2 py-1 rounded"
   >
     Delete
   </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KelasList;