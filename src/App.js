import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Notifications from "./components/notifications/Notification";
import ParcelHistory from "./components/history/ParcelHistory";
import SendParcel from "./components/parcels/SendParcel";
import UserProfile from "./components/UserProfile";
import Footer from "./components/common/Footer";
import Login from "./components/user/Login";
import AdminPanel from "./components/user/AdminPanel";
import Signup from "./components/user/Signup";
import EditUserProfile from "./components/EditUserProfile";
import {  UserContext } from "./components/context/UserContext";

const App = () => {
  const { user, updateUser, isAuthenticated, setIsAuthenticated } = useContext(UserContext);

  console.log("Current User: ", user);
  console.log("Is Authenticated: ", isAuthenticated);
  const handleLogin = async (credentials) => {
    try {
      const response = await fetch("http://localhost:5005/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        updateUser(data);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
      } else {
        console.error("Login failed.");
      }
    } catch (err) {
      console.error("There was an error.", err);
    }
  };

  const onSignup = async (formData) => {
    try {
      const response = await fetch('http://localhost:5005/api/users', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);

        // Update user state using updateUser from Context
        updateUser(data);  // Assuming the response returns the user object

        // Update local storage
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("There was an error signing up", error);
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };


  return (
      <Router>
        <Navbar
          user={user}
          isAuthenticated={isAuthenticated}
          onSignOut={handleSignOut}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={!isAuthenticated ? <Login onAuthenticated={handleLogin} /> : <Navigate to="/" />} />
          <Route path="/signup" element={!isAuthenticated ? <Signup onSignup={onSignup} /> : <Navigate to="/" />} />
          {isAuthenticated && <Route path="/user-profile" element={<UserProfile />} />}
          {isAuthenticated && <Route path="/edit-profile" element={<EditUserProfile />} />}
          {isAuthenticated && <Route path="/parcel-history" element={<ParcelHistory />} />}
          {isAuthenticated && <Route path="/send-parcel" element={<SendParcel />} />}
          {isAuthenticated && <Route path="/notifications" element={<Notifications />} />}
          {user?.role === "admin" && <Route path="/admin-panel" element={<AdminPanel />} />}
        </Routes>
        <Footer />
      </Router>
  );
};

export default App;