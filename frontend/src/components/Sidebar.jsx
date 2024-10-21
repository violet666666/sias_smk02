import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut, IoBook, IoCalendar } from "react-icons/io5";
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

  const activeClassName = "bg-blue-700 text-white";
  const inactiveClassName = "text-blue-100 hover:bg-blue-700 hover:text-white";

  return (
    <div className="h-full bg-blue-600">
      <aside className="flex flex-col h-full p-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">SIAKAD</h2>
        </div>
        <nav className="flex-grow">
          <p className="text-xs uppercase tracking-wider text-blue-200 mb-4">General</p>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-2 rounded-md transition-colors duration-200 ${
                    isActive ? activeClassName : inactiveClassName
                  }`
                }
              >
                <IoHome className="text-xl" /> <span>Dashboard</span>
              </NavLink>
            </li>
            {user && ["guru", "orang tua", "siswa"].includes(user.role) && (
              <>
                <li>
                  <NavLink
                    to="/classes"
                    className={({ isActive }) =>
                      `flex items-center space-x-2 p-2 rounded-md transition-colors duration-200 ${
                        isActive ? activeClassName : inactiveClassName
                      }`
                    }
                  >
                    <IoPricetag className="text-xl" /> <span>Kelas</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/task/list-tugas"
                    className={({ isActive }) =>
                      `flex items-center space-x-2 p-2 rounded-md transition-colors duration-200 ${
                        isActive ? activeClassName : inactiveClassName
                      }`
                    }
                  >
                    <IoBook className="text-xl" /> <span>Tugas</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/attendance/list-absensi"
                    className={({ isActive }) =>
                      `flex items-center space-x-2 p-2 rounded-md transition-colors duration-200 ${
                        isActive ? activeClassName : inactiveClassName
                      }`
                    }
                  >
                    <IoCalendar className="text-xl" /> <span>Kehadiran</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {user && user.role === "admin" && (
            <div className="mt-8">
              <p className="text-xs uppercase tracking-wider text-blue-200 mb-4">Admin</p>
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/users"
                    className={({ isActive }) =>
                      `flex items-center space-x-2 p-2 rounded-md transition-colors duration-200 ${
                        isActive ? activeClassName : inactiveClassName
                      }`
                    }
                  >
                    <IoPerson className="text-xl" /> <span>Users</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </nav>
        <div className="mt-auto">
          <p className="text-xs uppercase tracking-wider text-blue-200 mb-4">Settings</p>
          <ul className="space-y-2">
            <li>
              <button
                onClick={logout}
                className="flex items-center space-x-2 p-2 rounded-md text-blue-100 hover:bg-blue-700 hover:text-white transition-colors duration-200 w-full"
              >
                <IoLogOut className="text-xl" /> <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
