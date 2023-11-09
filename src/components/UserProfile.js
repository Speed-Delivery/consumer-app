import React, { useState } from "react";

import Login from "./loginSignup/Login";
import Signup from "./loginSignup/Signup";

const UserProfile = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {showLogin ? (
        <Login onSwitch={() => setShowLogin(false)} />
      ) : (
        <Signup onSwitch={() => setShowLogin(true)} />
      )}
    </div>
  );
};

export default UserProfile;
