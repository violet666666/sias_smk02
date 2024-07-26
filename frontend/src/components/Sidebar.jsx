import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="h-full">
      <aside className="bg-blue-600 text-white h-full p-4">
        <p className="text-lg font-semibold mb-4">General</p>
        <ul className="space-y-2">
          <li>
            <NavLink to={"/dashboard"} className="flex items-center space-x-2">
              <IoHome /> <span>Dashboard</span>
            </NavLink>
          </li>
          {user && ["guru", "orang tua", "siswa"].includes(user.role) && (
            <>
              <li>
                <NavLink to={"/classes"} className="flex items-center space-x-2">
                  <IoPricetag /> <span>Kelas</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/task/list-tugas"} className="flex items-center space-x-2">
                  <IoPricetag /> <span>Tugas</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/attendance/list-absensi"} className="flex items-center space-x-2">
                  <IoPricetag /> <span>Kehadiran</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
        {user && user.role === "admin" && (
          <div className="mt-6">
            <p className="text-lg font-semibold mb-4">Admin</p>
            <ul className="space-y-2">
              <li>
                <NavLink to={"/users"} className="flex items-center space-x-2">
                  <IoPerson /> <span>Users</span>
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        <div className="mt-6">
          <p className="text-lg font-semibold mb-4">Settings</p>
          <ul className="space-y-2">
            <li>
              <button onClick={logout} className="flex items-center space-x-2 text-white">
                <IoLogOut /> <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;