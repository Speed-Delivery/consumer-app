import React, { useState , useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

const Navbar = ({ isAuthenticated, onSignOut, user }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if the user is an admin
  const isAdmin = user && user.role === "admin";
  console.log("The user value is: ", user);
  console.log("isAdmin is: ", isAdmin)

  useEffect(() => {
    console.log("The user value is: ", user);
    console.log("isAdmin is: ", isAdmin);
  }, [user]);
  
  const handleSignOut = () => {
    onSignOut();
    navigate('/signin');
  };

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
        className={`${isMenuOpen ? "flex" : "hidden"} top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto`}
      >
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
          {/* Static links */}
          <Link
            to="/"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              {/* Authenticated user links */}
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
              {/* Admin links only admins*/}
              {isAdmin && (
                <Link
                  to="/admin-panel"
                  className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              {/* Non-authenticated user links */}
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