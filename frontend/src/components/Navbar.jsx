import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="relative">
      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white fixed w-full z-20 top-0 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <NavLink 
              to="/dashboard" 
              className="flex items-center space-x-3 hover:opacity-90 transition-opacity duration-200"
            >
              <img 
                src={logo} 
                alt="logo" 
                className="h-12 w-auto rounded-full shadow-md border-2 border-white/20" 
              />
              <span className="font-semibold text-xl hidden sm:block">
                Sistem Informasi Akademik Siswa
              </span>
            </NavLink>

            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-4">
                  <span className="hidden sm:block text-sm font-medium">
                    {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg 
                             shadow-md transition duration-200 ease-in-out transform hover:scale-105
                             focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer untuk menghindari konten tertutup navbar */}
      <div className="h-10"></div>
    </div>
  );
};

export default Navbar;