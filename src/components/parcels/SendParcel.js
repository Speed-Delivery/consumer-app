import React, { useState } from "react";

const ParcelForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    senderUsername: "",
    receiverUsername: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const sendParcel = async () => {
    const parcelData = {
      parcelDescription: formData.description,
      parcelWeight: parseFloat(formData.weight),
      parcelDimension: {
        length: parseFloat(formData.length),
        width: parseFloat(formData.width),
        height: parseFloat(formData.height),
      },
      status: "awaiting pickup",
      senderUsername: formData.senderUsername,
      receiverUsername: formData.receiverUsername,
    };

    console.log(parcelData);

    try {
      const response = await fetch("http://localhost:5005/api/parcels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parcelData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Parcel sent successfully:", result);
    } catch (error) {
      console.error("There was a problem sending the parcel:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendParcel();
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
            {/* Description Input */}
            <div className="mb-4">
              <span className="mb-2 block text-md">Description</span>
              <input
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            {/* Dimension Inputs */}
            <div className="flex flex-col md:flex-row">
              <div className="mb-4 md:mb-0 md:w-1/2 lg:w-1/3 md:pr-2">
                <span className="mb-2 block text-md">Width (cm)</span>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  required
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4 md:mb-0 md:w-1/2 lg:w-1/3 md:pr-2">
                <span className="mb-2 block text-md">Height (cm)</span>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  required
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                />
              </div>
              <div className="md:w-1/2 lg:w-1/3 lg:pr-2">
                <span className="mb-2 block text-md">length (cm)</span>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  type="number"
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Weight and IDs Inputs */}
            <div className="flex flex-col md:flex-row">
              <div className="mb-4 md:mb-0 md:w-1/2 lg:w-1/3 md:pr-2">
                <span className="mb-2 block text-md">weight (kg)</span>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  required
                  type="number"
                  name="weight"
                  value={formData.mass}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4 md:mb-0 md:w-1/2 lg:w-1/3 md:pr-2">
                <span className="mb-2 block text-md">Sender username</span>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  type="text"
                  name="senderUsername"
                  value={formData.senderUsername}
                  onChange={handleChange}
                />
              </div>
              <div className="md:w-1/2 lg:w-1/3">
                <span className="mb-2 block text-md">Recipient username</span>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  required
                  type="text"
                  name="receiverUsername"
                  value={formData.receiverUsername}
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

export default ParcelForm;
