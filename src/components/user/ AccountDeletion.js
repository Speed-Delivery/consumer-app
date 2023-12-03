
import React from 'react';

const AccountDeletion = () => {
  const handleAccountDeletion = async () => {
    try {
      // Get the user ID from local storage
      const userId = JSON.parse(localStorage.getItem('user'))._id;
      // get token
      const token = JSON.parse(localStorage.getItem('user')).token;
      console.log('Token:', token); // Debugging
      const response = await fetch(`http://localhost:5005/api/users/${userId}`, {
        method: 'DELETE', // Specify the DELETE method for the request
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Account deletion response
        console.log(data.message); // Account deletion success message
        // Optionally, perform additional actions after successful deletion (e.g., logout)
      } else {
        // Handle non-successful response (if needed)
        console.error('Failed to delete account:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to delete account:', error);
      // Handle error scenarios
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-2xl rounded-2xl p-4 w-8/12 max-w-md">
        <h1 className="text-center font-semibold text-2xl py-2">
          Delete Account
        </h1>
        <p className="text-center py-2">
          Are you sure you want to delete your account?
        </p>
        <div className="flex justify-center items-center space-x-4 py-4">
          <button
            className="btn py-2 px-4 bg-red-500 text-white"
            onClick={handleAccountDeletion}
          >
            Yes
          </button>
          <button className="btn py-2 px-4 bg-black text-white">No</button>
        </div>
      </div>
    </div>
  );
};

export default AccountDeletion;
