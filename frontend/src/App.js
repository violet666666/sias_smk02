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
// import ListTugas from './pages/GuruPages/FormListTugas';
import EditTugas from './pages/GuruPages/FormEditTugas';
import TambahAbsensi from './pages/GuruPages/FormTambahAbsensi';
// import ListAbsensi from './pages/GuruPages/FormListAbsensi';
import ListTask from './pages/Task';
import ListAttendance from "./pages/Attendance"

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

        <Route path="/task/add-tugas" element={<AddTugas />} /> 
        <Route path="/task/edit-tugas/:id" element={<EditTugas />} />
        <Route path="/attendance/tambah-absensi" element={<TambahAbsensi />} />
        {/* <Route path="/attendance/list-absensi" element={<ListAbsensi />} /> */}
        <Route path="/task/list-tugas" element={<ListTask />} />
        <Route path="/attendance/list-absensi" element={<ListAttendance />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
