import React, { useState } from "react";

import Login from "./user/Login";
import Signup from "./user/Signup";

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
