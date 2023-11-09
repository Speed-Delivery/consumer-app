// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Home from "./Home";
import Navbar from "./components/Navbar";
import Notifications from "./components/Notifications";
import ParcelHistory from "./components/ParcelHistory";
import SendParcel from "./components/sendparcel/SendParcel";
import UserProfile from "./components/UserProfile";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Outlet />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parcel-history" element={<ParcelHistory />} />
          <Route path="/send-parcel" element={<SendParcel />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
