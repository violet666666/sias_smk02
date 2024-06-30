import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Classes from "./pages/Classes";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddKelas from "./pages/AddKelas";
import EditKelas from "./pages/EditKelas";
// import DashboardSiswa from "./pages/SiswaPages/DashboardSiswa";
import "../src/style/input.css";

// yang gw update di laptop akil
import AddTugas from './pages/GuruPages/FormAddTugas';
import ListTugas from './pages/GuruPages/FormListTugas';
import EditTugas from './pages/GuruPages/FormEditTugas';
import TambahAbsensi from './pages/GuruPages/FormTambahAbsensi';
import ListAbsensi from './pages/GuruPages/FormListAbsensi';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/classes/add" element={<AddKelas />} />
        <Route path="/classes/edit/:id" element={<EditKelas />} />
        {/* <Route path="/siswa/dashboard" element={<DashboardSiswa />} /> */}

        <Route path="/guru/add-tugas" element={<AddTugas />} /> 
        <Route path="/guru/list-tugas" element={<ListTugas />} /> 
        <Route path="/guru/edit-tugas/:id" element={<EditTugas />} />
        <Route path="/guru/tambah-absensi" element={<TambahAbsensi />} />
        <Route path="/guru/list-absensi" element={<ListAbsensi />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
