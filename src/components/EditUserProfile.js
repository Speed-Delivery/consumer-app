import React, { useState } from "react";

const EditUserProfile = () => {
  const [user, setUser] = useState({
    userId: "1234567890",
    username: "John Doe",
    fullname: "John Doe",
    email: "@mail.com",
    phone: "1234567890",
    role: "Customer",
    address: "221 B Baker Street, London",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    // send updated user data to the server
    fetch("http://localhost:5005/api/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          const data = res.json();
          console.log(data);
        }
      })
      .catch((err) => {
        console.error("There was an error.", err);
      });
  };

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
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  value={user.fullname}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray rounded"
                />
              </tr>
              <tr>
                <td className="border px-4 py-2">Email</td>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  value={user.fullname}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray rounded"
                />
                <td className="border px-4 py-2"></td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Phone Number</td>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray rounded"
                />
              </tr>
              {/* <tr>
                <td className="border px-4 py-2">Role</td>
                <input
                  type="text"
                  name="role"
                  id="role"
                  value={user.role}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray rounded"
                />
              </tr> */}
              <tr>
                <td className="border px-4 py-2">Address</td>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={user.address}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray rounded"
                />
              </tr>
            </tbody>
          </table>
          <button className="btn py-2 my-2 bg-black text-white w-full">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserProfile;