import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddKelas = () => {
  const [name, setName] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tahun, setTahun] = useState("");
  const [status, setStatus] = useState("");
  const [periodeAwal, setPeriodeAwal] = useState("");
  const [periodeAkhir, setPeriodeAkhir] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveKelas = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/classes", {
        name: name,
        deskripsi: deskripsi,
        tahun: tahun,
        status: status,
        periodeAwal: periodeAwal,
        periodeAkhir: periodeAkhir,
      });
      navigate("/classes");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Kelas</h1>
      <h2 className="text-xl mb-4">Buat Kelas</h2>
      <form onSubmit={saveKelas}>
        <p className="text-center text-red-500">{msg}</p>
        
        <div className="mb-4">
          <label className="block text-gray-700">Nama Kelas</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Kelas"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Deskripsi</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Deskripsi Kelas"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Tahun</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={tahun}
            onChange={(e) => setTahun(e.target.value)}
            placeholder="Tahun"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Aktif">Aktif</option>
            <option value="Tidak Aktif">Tidak Aktif</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Periode Mulai</label>
          <input
            type="date"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={periodeAwal}
            onChange={(e) => setPeriodeAwal(e.target.value)}
            placeholder="Periode Mulai"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Periode Berakhir</label>
          <input
            type="date"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={periodeAkhir}
            onChange={(e) => setPeriodeAkhir(e.target.value)}
            placeholder="Periode Berakhir"
          />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddKelas;