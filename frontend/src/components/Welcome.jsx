import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-600">Dashboard</h1>
      <h2 className="text-2xl font-semibold text-blue-600 mt-4">
        Welcome Back <span className="font-bold">{user && user.name}</span>
      </h2>
    </div>
  );
};

export default Welcome;