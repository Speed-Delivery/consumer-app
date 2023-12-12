import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import API_BASE_URL from "../../apiConfig";

const Login = ({ onAuthenticated }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: "user", // default role
  });
  const [error, setError] = useState("");

  const { setUser, setIsAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.username.trim() || !credentials.password) {
      setError("Please enter both username and password.");
    } else {
      setError("");
      // Here we call the login API
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/"); // Redirect to home page or dashboard
        } else {
          setError("Login failed. Please check your username and password.");
        }
      } catch (err) {
        console.error("There was an error during login", err);
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <button
            type="submit"
            className="w-full bg-red-500 text-white p-3 rounded hover:bg-red-700"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 hover:text-red-700">
            Start Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
