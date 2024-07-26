import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Selamat Pagi, ";
    } else if (currentHour < 15) {
      return "Selamat Siang, ";
    } else if (currentHour < 18) {
      return "Selamat Sore, ";
    } else {
      return "Selamat Malam, ";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-blue-600 mt-4">
        {getGreeting()} <span className="font-bold"> {user && user.name}</span>
      </h2>
    </div>
  );
};

export default Welcome;