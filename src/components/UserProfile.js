import React, { useEffect, useState } from "react";

import Login from "./user/Login";
import Signup from "./user/Signup";
import { Link } from "react-router-dom";

const UserProfile = ({setIsAuthenticated}) => {
  const [showLogin, setShowLogin] = useState(true);

  const [user, setUser] = useState({
    userId: "",
    username: "",
    fullName: "",
    email: "",
    phone: "",
    role: "",
    address: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedAuth = JSON.parse(localStorage.getItem("isAuthenticated"));

    if (storedUser && storedAuth) {
      setUser(storedUser);
      setIsAuthenticated(storedAuth);
    } else {
      //if the data is not available in local storage, fetch it from the server
      fetch("http://localhost:5005/api/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(storedUser._id),
      })
        .then((res) => {
          if (res.ok) {
            const data = res.json();
            console.log(data);
            setUser(data);
          }
        })
        .catch((err) => {
          console.error("There was an error.", err);
        });
    }
  }, []);

  return (
    // <div>
    //   {showLogin ? (
    //     <Login onSwitch={() => setShowLogin(false)} />
    //   ) : (
    //     <Signup onSwitch={() => setShowLogin(true)} />
    //   )}
    // </div>
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-2xl rounded-2xl p-4 w-8/12 max-w-md">
        <h1 className="text-center font-semibold text-2xl py-2">
          User Profile
        </h1>
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <td className="border px-4 py-2">Full Name</td>
              <td className="border px-4 py-2">{user.fullName}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">User Name</td>
              <td className="border px-4 py-2">{user.username}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">User ID</td>
              <td className="border px-4 py-2">{user._id}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Email</td>
              <td className="border px-4 py-2">{user.email}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Phone Number</td>
              <td className="border px-4 py-2">{user.phone}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Role</td>
              <td className="border px-4 py-2">{user.role}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Address</td>
              <td className="border px-4 py-2">{user.address}</td>
            </tr>
          </tbody>
        </table>
        <Link to={'/edit-profile'}>
          <button className="btn py-2 my-2 bg-black text-white w-full">
            Update Information
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;