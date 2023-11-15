import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

<<<<<<< HEAD
const Navbar = ({ isAuthenticated, onSignOut, user }) => {
const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(user, "this is user");
  const  handleSignOut = () => {
    onSignOut();
    navigate('/signin');
};
=======
const Navbar = ({ isAuthenticated, onSignOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

>>>>>>> main
  return (
    <nav className="flex items-center bg-gray-800 p-3 flex-wrap">
      <Link to="/" className="p-2 mr-4 inline-flex items-center">
        <span className="text-xl text-white font-bold uppercase tracking-wide">
          Speed-Delivery
        </span>
      </Link>
      <button
        className="text-white inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <IoMenu className="h-5 w-5" />
      </button>
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto`}
      >
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
          {/* Static links */}
          <Link
            to="/"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            Home
          </Link>
          {/* ... other static links ... */}

          {isAuthenticated && (
<<<<<<< HEAD
            <>
              <Link
                to="/notifications"
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Notifications
              </Link>
              <Link
                to="/send-parcel"
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Send Parcel
              </Link>
              <Link
                to="/parcel-history"
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Parcel History
              </Link>

              <Link
                to="/user-profile"
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Profile
              </Link>
            </>
          )}

          {isAuthenticated ? (
=======
>>>>>>> main
            <>
              <Link
                to="/notifications"
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Notifications
              </Link>
              <Link
                to="/send-parcel"
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Send Parcel
              </Link>
              <Link
                to="/parcel-history"
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Parcel History
              </Link>
              <button
                onClick={onSignOut}
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Sign Out
              </button>
              <Link
                to="/user-profile"
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Profile
              </Link>
            </>
          )}


          {isAuthenticated ? (
            <button
              onClick={onSignOut}
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                to="/signin"
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
