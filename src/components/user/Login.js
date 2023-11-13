import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ onAuthenticated }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: 'user', // default role
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.username.trim() || !credentials.password) {
      setError('Please enter both username and password.');
    } else if (!credentials.role) {
      setError('Please select a role.');
    } else {
      setError('');
      onAuthenticated(credentials);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
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
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
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
          <div className="mb-6">
            <span className="block text-gray-700 text-sm font-bold mb-2">Role</span>
            <label className="inline-flex items-center">
              <input 
                type="radio" 
                name="role" 
                value="user"
                checked={credentials.role === 'user'}
                onChange={handleChange} 
                className="form-radio h-5 w-5 text-red-600"
              />
              <span className="ml-2 text-gray-700">User</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input 
                type="radio" 
                name="role" 
                value="driver"
                checked={credentials.role === 'driver'}
                onChange={handleChange} 
                className="form-radio h-5 w-5 text-red-600"
              />
              <span className="ml-2 text-gray-700">Driver</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input 
                type="radio" 
                name="role" 
                value="admin"
                checked={credentials.role === 'admin'}
                onChange={handleChange} 
                className="form-radio h-5 w-5 text-red-600"
              />
              <span className="ml-2 text-gray-700">Admin</span>
            </label>
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <button type="submit" className="w-full bg-red-500 text-white p-3 rounded hover:bg-red-700">
            Sign In
          </button>
        </form>
        <p className="mt-4">
          Don't have an account? <Link to="/signup" className="text-red-500 hover:text-red-700">Start Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;