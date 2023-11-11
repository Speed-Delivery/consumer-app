// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Notifications from "./components/notifications/Notification";
import ParcelHistory from "./components/history/ParcelHistory";
import SendParcel from "./components/parcels/SendParcel";
import UserProfile from "./components/UserProfile";
import Footer from "./components/common/Footer";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Outlet /> {/* This is where the nested routes will be rendered */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parcel-history" element={<ParcelHistory />} />
          <Route path="/send-parcel" element={<SendParcel />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
