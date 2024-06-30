import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="flex mt-6 min-h-screen">
        <div className="w-1/5 bg-blue-600 text-white">
          <Sidebar />
        </div>
        <div className="w-4/5 bg-gray-100 text-gray-900">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;