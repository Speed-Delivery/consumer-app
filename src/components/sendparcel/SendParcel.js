import React, { useState } from "react";

const SendParcel = () => {
  const [parcelInfo, setParcelInfo] = useState({
    width: "",
    height: "",
    depth: "",
    mass: "",
    recipientId: "",
    senderId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParcelInfo({ ...parcelInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send the parcel information to your backend or perform any other action here
    console.log(parcelInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="m-2 bg-white shadow-2xl rounded-2xl">
        <div className="p-8">
          <span className="mb-3 text-4xl font-bold text-center">
            Send Your Parcel
          </span>
          <span className="block text-gray-400 mb-8 font-light text-center">
            Please fill in the parcel and sender details below
          </span>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div class="flex flex-col md:flex-row">
              <div className="py-4 md:w-1/2 md:pr-2">
                <span className="mb-2 block text-md">Width (cm)</span>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  required
                  type="number"
                  name="width"
                  onChange={handleChange}
                />
              </div>
              <div className="py-4 md:w-1/2 md:pr-2">
                <span className="mb-2 block text-md">Height (cm)</span>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  required
                  type="number"
                  id="height"
                  name="height"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="flex flex-col md:flex-row">
              <div className="py-4 md:w-1/2 md:pr-2">
                <span className="mb-2 block text-md">Depth (cm)</span>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  type="number"
                  id="depth"
                  name="depth"
                  onChange={handleChange}
                />
              </div>
              <div className="py-4 md:w-1/2 md:pr-2">
                <span className="mb-2 block text-md">Mass (kg)</span>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  required
                  type="number"
                  id="mass"
                  name="mass"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="flex flex-col md:flex-row">
              <div className="py-4 md:w-1/2 md:pr-2">
                <span className="mb-2 block text-md">Sender ID</span>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  type="text"
                  id="depth"
                  name="depth"
                  onChange={handleChange}
                />
              </div>
              <div className="py-4 md:w-1/2 md:pr-2">
                <span className="mb-2 block text-md">Recipient ID</span>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  required
                  type="text"
                  id="mass"
                  name="mass"
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-500 text-white p-2 rounded-lg hover:bg-black hover:text-white hover:border hover:border-gray-300"
            >
              Send Parcel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SendParcel;
