import React, { useState, useEffect } from "react";

const EditUserProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser._id;
  console.log(storedUser);

  const [user, setUser] = useState({
    userId: userId,
    username: storedUser.username,
    fullName: storedUser.fullName,
    email: storedUser.email,
    phone: storedUser.phone,
    address: storedUser.address,
    role: storedUser.role,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Ensure that user.userId is correctly set before making the PUT request
    if (!user.userId) {
      console.error("User ID is undefined.");
      return;
    }
  
    console.log("User data is before fetch: ", user);
    console.log("Userid is before fetch is : ", user.userId);
  
    // send updated user data to the server
    const token = localStorage.getItem('token');
  
    fetch(`http://localhost:5005/api/users/${user.userId}`, { // use user.userId here
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(user),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update user.");
      }
      return res.json();
    })
    .then((data) => {
      if (data) {
        console.log("User data after fetch: ", data);
        // If the response doesn't include a userId, retain the original userId
        const updatedUser = data.userId ? data : { ...data, userId: user.userId };
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        alert("User profile updated successfully!");
      }
    })
    .catch((err) => {
      console.error("Error updating user:", err);
    });
  };
  
  useEffect(() => {}, [user]);
  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-2xl rounded-2xl p-4 w-8/12 max-w-md">
        <h1 className="text-center font-semibold text-2xl py-2">
          User Profile
        </h1>
        <form onSubmit={handleSubmit}>
          <table className="table-auto w-full">
            <tbody>
              <tr>
                <td className="border px-4 py-2">Full Name</td>
                <td>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={user.fullName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray rounded"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Username</td>
                <td>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={user.username}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray rounded"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Email</td>
                <td>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray rounded"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Phone Number</td>
                <td>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={user.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray rounded"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Address</td>
                <td>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={user.address}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray rounded"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Role</td>
                <td>
                  <input
                    type="text"
                    name="role"
                    id="role"
                    value={user.role}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray rounded"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <button
              type="submit"
              className="btn py-2 my-2 bg-black text-white w-full"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserProfile;