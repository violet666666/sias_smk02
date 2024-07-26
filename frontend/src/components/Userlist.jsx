import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Userlist = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/users", {
        headers: {
          "Authorization": `${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/users/${userId}`, {
        headers: {
          "Authorization": `${token}`
        }
      });
      getUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleDelete = (userId) => {
    const confirmDelete = window.confirm("Apakah Anda yakin menghapus User?");
    if (confirmDelete) {
      deleteUser(userId);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Users</h1>
      <h2 className="text-xl mb-4 text-center">Daftar User</h2>
      <div className="flex justify-center mb-4">
        <Link to="/users/add" className="bg-blue-500 text-white px-4 py-2 rounded inline-block">
          Tambah User
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-200 text-center">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">No</th>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Nomor Induk</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Role</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">{index + 1}</td>
              <td className="px-4 py-2 border-b">{user.name}</td>
              <td className="px-4 py-2 border-b">{user.nomorInduk}</td>
              <td className="px-4 py-2 border-b">{user.email}</td>
              <td className="px-4 py-2 border-b">{user.role}</td>
              <td className="px-4 py-2 border-b">
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user.uuid)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;