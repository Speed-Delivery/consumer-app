import React, { useState, useContext } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { UserContext } from "../context/UserContext";
import API_BASE_URL from "../../apiConfig";

const Signup = () => {
  const { updateUser, setIsAuthenticated, setUser } = useContext(UserContext);
  const [, setError] = useState(null); // State to hold error information

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "username" ? value.toLowerCase() : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  console.log("Before sending ", formData);
  const handleSignup = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        // Log role and isAdmin for debugging
        console.log("User", data.user);
        // Update user state using updateUser from Context
        updateUser({ ...data.user });
        //setuser
        setUser({ ...data.user });
        setIsAuthenticated(true);
        // Update local storage
        localStorage.setItem("user", JSON.stringify({ ...data.user }));
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
      } else {
        const errorData = await response.json(); // Get error details from the response
        throw new Error(errorData.message || "Signup failed");
      }
    } catch (error) {
      console.error("There was an error during signup", error);
      setError(error.message); // Set the error state with the error message
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    try {
      handleSignup();
    } catch (error) {
      console.error("There was an error during signup 123", error);
      setError(error.message); // Set the error state with the error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <form
          className="flex flex-col justify-center p-8 md:p-14"
          onSubmit={handleSubmit}
        >
          <span className="mb-3 text-4xl font-bold">
            Welcome to Speedy-Delivery
          </span>
          <span className="font-light text-gray-400 mb-8">
            Greetings! Please fill in the details to sign up for an account
          </span>
          <div className="mb-4">
            <span className="text-md font-bold">Username</span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <span className="text-md font-bold">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <span className="text-md font-bold">Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white p-3 rounded hover:bg-red-600"
          >
            Sign up
          </button>
          <Link
            to="/signin"
            className="text-center text-red-500 hover:text-red-600"
          >
            Already have an account? Sign in
          </Link>
        </form>
        <div className="relative flex justify-center items-center md:block">
          <img
            className="hidden md:block w-96 h-96 object-cover rounded-full"
            src="https://images.unsplash.com/photo-1587614382751-8a3b6b16c9f6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
            alt="signup"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 shadow-lg transform -skew-x-12 -rotate-6 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
