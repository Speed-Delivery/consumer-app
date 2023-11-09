import React, { useState } from "react";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // fetch("http://localhost:3001/profile")
    //   .then((res) => console.log(res.json()))
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="bg-gray-800 h-[100vh] w-full flex items-center justify-center ">
      <div className="bg-gray-700 rounded-3xl shadow-2xl pb-4 w-3/5 text-center">
        <h3 className="text-3xl text-center py-4 text-white">Sign In</h3>
        <h2 className="text-xl text-center text-gray-300 pb-4">
          Welcome to Speed-Delivery
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center space-y-4 "
        >
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="w-full">
            <button
              type="submit"
              className="py-2 px-4 border bg-black text-white rounded-md hover:bg-blue-800 transition-all duration-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;