import React from "react";
import { useSelector } from "react-redux";
import Statistik from "../components/Statistik";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-600">Dashboard</h1>
      <h2 className="text-2xl font-semibold text-blue-600 mt-4">
        Selamat Datang, <span className="font-bold">{user && user.name}</span>
      </h2>
      
      {/* Informasi Profil Siswa */}
      <div className="mt-6">
        <h3 className="text-xl font-bold">Informasi Profil</h3>
        <p>Nama: {user && user.name}</p>
        <p>NIS: {user && user.nis}</p>
        <p>Kelas: {user && user.class}</p>
      </div>

      {/* Statistik */}
      <div className="mt-6">
        <Statistik />
      </div>

      {/* Pengumuman Terbaru */}
      <div className="mt-6">
        <h3 className="text-xl font-bold">Pengumuman Terbaru</h3>
        {/* Daftar pengumuman */}
      </div>

      {/* Jadwal Pelajaran */}
      <div className="mt-6">
        <h3 className="text-xl font-bold">Jadwal Pelajaran</h3>
        {/* Jadwal harian atau mingguan */}
      </div>

      {/* Tugas dan PR */}
      <div className="mt-6">
        <h3 className="text-xl font-bold">Tugas dan PR</h3>
        {/* Daftar tugas */}
      </div>

      {/* Nilai dan Rapor */}
      <div className="mt-6">
        <h3 className="text-xl font-bold">Nilai dan Rapor</h3>
        {/* Daftar nilai */}
      </div>

      {/* Absensi */}
      <div className="mt-6">
        <h3 className="text-xl font-bold">Absensi</h3>
        {/* Rekap absensi */}
      </div>

      {/* Kalender Akademik */}
      <div className="mt-6">
        <h3 className="text-xl font-bold">Kalender Akademik</h3>
        {/* Kalender kegiatan */}
      </div>

      {/* Pesan dan Notifikasi */}
      <div className="mt-6">
        <h3 className="text-xl font-bold">Pesan dan Notifikasi</h3>
        {/* Daftar pesan dan notifikasi */}
      </div>

      {/* Ekstrakurikuler */}
      <div className="mt-6">
        <h3 className="text-xl font-bold">Ekstrakurikuler</h3>
        {/* Informasi ekstrakurikuler */}
      </div>

      {/* Bantuan dan Dukungan */}
      <div className="mt-6">
        <h3 className="text-xl font-bold">Bantuan dan Dukungan</h3>
        {/* Kontak dan FAQ */}
      </div>
    </div>
  );
};

export default Dashboard;