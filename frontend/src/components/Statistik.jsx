import React, { useEffect, useState } from "react";
import axios from "axios";

const Statistik = () => {
  const [jumlahSiswa, setJumlahSiswa] = useState(0);

  useEffect(() => {
    const fetchJumlahSiswa = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users?role=siswa");
        setJumlahSiswa(response.data.length);
      } catch (error) {
        console.error("Error fetching jumlah siswa", error);
      }
    };

    fetchJumlahSiswa();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold">Jumlah Akun Siswa</h3>
      <p className="text-2xl font-semibold">{jumlahSiswa}</p>
    </div>
  );
};

export default Statistik;