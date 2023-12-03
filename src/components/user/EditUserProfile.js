import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const EditUserProfile = () => {
  const { user, updateUser } = useContext(UserContext); 
  console.log("The object user value is: ",user);
  // Initialize editUser state directly with user from context
  const [editUser, setEditUser] = useState({
    userId: user._id,
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userString = localStorage.getItem('user'); // Change the key to 'user'
        console.log('User String:', userString); // Debugging
        if (!userString) {
            console.error('No user data found');
            return;
        }

        const user = JSON.parse(userString);
        const token = user.token;
        console.log('Token:', token); // Debugging
        const response = await fetch(`http://localhost:5005/api/users/${editUser.userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(editUser),
        });

        if (!response.ok) {
          throw new Error('Failed to update user.');
        }

        const updatedUserData = await response.json();
        updateUser(updatedUserData); // Update the user data in the context
        alert('User profile updated successfully!');
      } catch (err) {
        console.error('Error updating user:', err);
      }
  };


  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-2xl rounded-2xl p-4 w-8/12 max-w-md">
        <h1 className="text-center font-semibold text-2xl py-2">Edit User Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={editUser.username}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={editUser.fullName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={editUser.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={editUser.phone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={editUser.address}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserProfile;
