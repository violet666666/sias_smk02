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
    <div>
      <nav className="bg-blue-600 text-white fixed w-full z-10 top-0 shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          <NavLink to="/dashboard" className="flex items-center">
            <img src={logo} alt="logo" className="h-8 w-auto" />
          </NavLink>
          <div className="flex items-center space-x-4">
            {user && (
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;