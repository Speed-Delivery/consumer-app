import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-white font-bold">
            Home
          </Link>
          <Link to="/parcel-history" className="text-white">
            Parcel History
          </Link>
          <Link to="/send-parcel" className="text-white">
            Send a New Parcel
          </Link>
          <Link to="/notifications" className="text-white">
            Notifications
          </Link>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white focus:outline-none"
            >
              User Profile
              <i className="fas fa-caret-down ml-1"></i>
            </button>
            {showDropdown && (
              <div className="absolute top-full px-2 py-2  bg-white shadow-md rounded-md">
                <Link to="/login" className="block p-1 text-gray-800">
                  Login
                </Link>
                <Link to="/logout" className="block p-1 text-gray-800">
                  Logout
                </Link>
                <Link
                  to="/account-settings"
                  className="block p-1 text-gray-800"
                >
                  Settings
                </Link>

                <Link to="/delete-account" className="block p-1 text-gray-800">
                  Delete Account
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <h5>Speedy Delivery</h5>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
