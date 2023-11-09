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
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";

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
          <Route path="/sign-in" element={<SignIn/>} />
        </Routes>
      </div>
      <Footer/>
    </Router>
    
  );
};


export default App;
