import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const UserProfile = () => {
  const { user, isAuthenticated } = useContext(UserContext);

 
  if (!isAuthenticated) {
    // Redirect to login page or show a message if the user is not authenticated
    return <div>You need to login to view this page.</div>;
  }

  return (
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
              <td className="border px-4 py-2">Username</td>
              <td className="border px-4 py-2">{user.username}</td>
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
        <Link to="/edit-profile">
          <button className="btn py-2 my-2 bg-black text-white w-full">
            Update Information
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
