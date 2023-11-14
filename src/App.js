// App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
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

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedAuth = JSON.parse(localStorage.getItem("isAuthenticated"));

    if (storedUser && storedAuth) {
      setUser(storedUser);
      setIsAuthenticated(storedAuth);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch("http://localhost:8001/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // console.log(credentials);
        setUser(credentials);
        setIsAuthenticated(true);

        // Store user data and authentication status in localStorage
        localStorage.setItem("user", JSON.stringify(credentials));
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
      } else {
        console.error("Login failed.");
      }
    } catch (err) {
      console.error("There was an error.", err);
    }
  };

  // Define the onSignup function
  const onSignup = async (formData) => {
    try {
      const response = await fetch("http://localhost:8001/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful signup, perhaps automatically logging in the user
        console.log("Signup successful!", data);
        console.log(formData);
        setIsAuthenticated(true);

        setUser(formData);

        // Store user data and authentication status in localStorage
        localStorage.setItem("user", JSON.stringify(formData));
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        // Again, you might want to store the token or user data
      } else {
        // Handle errors, such as displaying a message to the user
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("There was an error signing up", error);
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    // Perform any clean-up or state reset actions
    // Clean up authentication state, remove token, etc.
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
        <Route
          path="/signin"
          element={
            !isAuthenticated ? (
              <Login onAuthenticated={handleLogin} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <Signup onSignup={onSignup} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {isAuthenticated && (
          <>
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/parcel-history" element={<ParcelHistory />} />
            <Route path="/send-parcel" element={<SendParcel />} />
            <Route path="/notifications" element={<Notifications />} />
            {/* ... additional authenticated routes */}
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
