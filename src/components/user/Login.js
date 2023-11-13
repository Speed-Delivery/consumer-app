import React, { useState } from 'react';

const Login = ({ onAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username cannot be empty.');
    } else {
      setError('');
      // Simulate authentication
      onAuthenticated(username, role);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className={`w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded`}
              placeholder="Username"
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Role
            </label>
            <label className="inline-flex items-center">
              <input 
                type="radio" 
                name="role" 
                value="user"
                checked={role === 'user'}
                onChange={() => setRole('user')} 
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="ml-2">User</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input 
                type="radio" 
                name="role" 
                value="driver"
                checked={role === 'driver'}
                onChange={() => setRole('driver')} 
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="ml-2">Driver</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input 
                type="radio" 
                name="role" 
                value="admin"
                checked={role === 'admin'}
                onChange={() => setRole('admin')} 
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="ml-2">Admin</span>
            </label>
          </div>
          <button type="submit" className="w-full bg-red-500 text-white p-3 rounded hover:bg-red-600">
            Continue
          </button>
        </form>
        <hr className="my-6" />
        <p className="mb-4">
          Don't have an account? <a href="/signup" className="text-red-500 hover:text-red-600">Start Signup</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
