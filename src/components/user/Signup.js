import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
    fullName: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <form className="flex flex-col justify-center p-8 md:p-14" onSubmit={handleSubmit}>
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
          <div className="mb-4">
            <span className="text-md font-bold">Full Name</span>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              placeholder="Full Name"
            />
          </div>
          <div className="mb-4">
            <span className="text-md font-bold">Phone</span>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              placeholder="Phone"
            />
          </div>
          <div className="mb-4">
            <span className="text-md font-bold">Address</span>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              placeholder="Address"
            />
          </div>
          <div className="mb-6">
            <span className="text-md font-bold">Role</span>
            <div className="mt-2">
              <label className="inline-flex items-center mr-6">
                <input 
                  type="radio" 
                  name="role" 
                  value="user"
                  checked={formData.role === 'user'}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-gray-600"
                />
                <span className="ml-2">User</span>
              </label>
              <label className="inline-flex items-center mr-6">
                <input 
                  type="radio" 
                  name="role" 
                  value="driver"
                  checked={formData.role === 'driver'}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-gray-600"
                />
                <span className="ml-2">Driver</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  name="role" 
                  value="admin"
                  checked={formData.role === 'admin'}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-gray-600"
                />
                <span className="ml-2">Admin</span>
              </label>
            </div>
          </div>
          <button type="submit" className="w-full bg-red-500 text-white p-3 rounded hover:bg-red-600">
          Sign up
          </button>
          <Link to="/signin" className="text-center text-red-500 hover:text-red-600">
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
}

export default Signup;
