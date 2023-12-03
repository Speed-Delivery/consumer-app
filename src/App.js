import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Notifications from "./components/notifications/Notification";
import ParcelHistory from "./components/history/ParcelHistory";
import SendParcel from "./components/parcels/SendParcel";
import UserProfile from "./components/user/UserProfile";
import Footer from "./components/common/Footer";
import Login from "./components/user/Login";
import AdminPanel from "./components/user/AdminPanel";
import Signup from "./components/user/Signup";
import EditUserProfile from "./components/user/EditUserProfile";
import { UserContext } from "./components/context/UserContext";
import AccountDeletion from "./components/user/ AccountDeletion";

import { io } from "socket.io-client";

const socket = io(`http://localhost:5005`);
console.log(socket);

const App = () => {
  const { user, isAuthenticated, setIsAuthenticated } = useContext(UserContext);
  // to get the code from robot
  const [parcelCode, setParcelCode] = useState(null);

  const sendParcelAndGetCode = () => {
    setParcelCode({
      user: user,
      code: "abcd",
    });

    // Emit the parcel code to the server
    socket.emit("sendParcelCode", parcelCode);
  };

  useEffect(() => {
    // Listen for the parcel code from the server
    socket.on("parcelCode", (code) => {
      setParcelCode(code);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  console.log("Current User: ", user);
  console.log("Is Authenticated: ", isAuthenticated);

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
        <Route
          path="/signin"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
        />
        {isAuthenticated && (
          <Route path="/user-profile" element={<UserProfile />} />
        )}
        {isAuthenticated && (
          <Route path="/edit-profile" element={<EditUserProfile />} />
        )}
        {isAuthenticated && (
          <Route path="/parcel-history" element={<ParcelHistory />} />
        )}
        {isAuthenticated && (
          <Route
            path="/send-parcel"
            element={<SendParcel sendParcelAndGetCode={sendParcelAndGetCode} />}
          />
        )}
        {isAuthenticated && (
          <Route path="/notifications" element={<Notifications />} />
        )}
        {isAuthenticated && (
          <Route path="/account-deletion" element={<AccountDeletion />} />
        )}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
