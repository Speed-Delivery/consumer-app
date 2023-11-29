import React, { useState } from "react";

const ParcelForm = ({ sendParcelAndGetCode }) => {
  const [formData, setFormData] = useState({
    description: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    senderName: "",
    senderAddress: "",
    senderPhone: "",
    senderEmail: "",
    recipientName: "",
    recipientAddress: "",
    recipientPhone: "",
    recipientEmail: "",
  });

  const validateAddress = (address) => {
    const cities = ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu"];

    // Splitting the address into components
    const addressParts = address
      .trim()
      .split(" ")
      .map((part) => part.trim());

    // Checking if any part of the address matches a city in the list
    return addressParts.some((part) => cities.includes(part));
  };

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
      sender: {
        name: formData.senderName,
        address: formData.senderAddress,
        phone: formData.senderPhone,
        email: formData.senderEmail,
      },
      recipient: {
        name: formData.recipientName,
        address: formData.recipientAddress,
        phone: formData.recipientPhone,
        email: formData.recipientEmail,
      },
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

      //get code from robot
      if (response.ok) {
        sendParcelAndGetCode();
      }

      const result = await response.json();
      console.log("Parcel sent successfully:", result);
    } catch (error) {
      console.error("There was a problem sending the parcel:", error);
    }
  };

  const clearForm = () => {
    setFormData({
      description: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      senderName: "",
      senderAddress: "",
      senderPhone: "",
      senderEmail: "",
      recipientName: "",
      recipientAddress: "",
      recipientPhone: "",
      recipientEmail: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Sender Address
    if (!validateAddress(formData.senderAddress)) {
      alert(
        "Sender address is invalid. Please ensure it includes a valid city."
      );
      isValid = false; // Mark as invalid but continue checking other fields
    }

    // Validate Recipient Address
    if (!validateAddress(formData.recipientAddress)) {
      alert(
        "Recipient address is invalid. Please ensure it includes a valid city."
      );
      isValid = false; // Mark as invalid
    }

    // Additional validations can be added here (e.g., phone numbers, weight)

    // If all validations pass, proceed to send the parcel data
    if (isValid) {
      sendParcel(); // Only call sendParcel if all validations pass
    }

    clearForm();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl m-4 bg-white shadow-2xl rounded-2xl">
        <div className="p-8">
          <span className="mb-3 text-4xl font-bold text-center">
            Send Your Parcel
          </span>
          <span className="block text-gray-400 mb-8 font-light text-center">
            Please fill in the parcel and sender details below
          </span>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Description and Dimension Inputs */}
            <div className="space-y-4">
              {/* Description Input */}
              <div className="mb-4">
                <label htmlFor="description" className="mb-2 block text-md">
                  Description
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              {/* Dimension Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="mb-4">
                  <label htmlFor="width" className="mb-2 block text-md">
                    Width (cm)
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    required
                    type="number"
                    id="width"
                    name="width"
                    value={formData.width}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="height" className="mb-2 block text-md">
                    Height (cm)
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    required
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="length" className="mb-2 block text-md">
                    Length (cm)
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    required
                    type="number"
                    id="length"
                    name="length"
                    value={formData.length}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Weight Input */}
            <div className="mb-4">
              <label htmlFor="weight" className="mb-2 block text-md">
                Weight (kg)
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                required
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>

            {/* Recipient and Sender Details Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recipient Details Input */}
              <div className="space-y-4">
                <div className="mb-4">
                  <label htmlFor="recipientName" className="mb-2 block text-md">
                    Recipient Name
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md"
                    type="text"
                    id="recipientName"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="recipientAddress"
                    className="mb-2 block text-md"
                  >
                    Recipient Address
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md"
                    type="text"
                    id="recipientAddress"
                    name="recipientAddress"
                    value={formData.recipientAddress}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="recipientPhone"
                    className="mb-2 block text-md"
                  >
                    Recipient Phone Number
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md"
                    type="text"
                    id="recipientPhone"
                    name="recipientPhone"
                    value={formData.recipientPhone}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="recipientEmail"
                    className="mb-2 block text-md"
                  >
                    Recipient Email
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md"
                    type="text"
                    id="recipientEmail"
                    name="recipientEmail"
                    value={formData.recipientEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Sender Details Input */}
              <div className="space-y-4">
                <div className="mb-4">
                  <label htmlFor="senderName" className="mb-2 block text-md">
                    Sender Name
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md"
                    type="text"
                    id="senderName"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="senderAddress" className="mb-2 block text-md">
                    Sender Address
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md"
                    type="text"
                    id="senderAddress"
                    name="senderAddress"
                    value={formData.senderAddress}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="senderPhone" className="mb-2 block text-md">
                    Sender Phone Number
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md"
                    type="text"
                    id="senderPhone"
                    name="senderPhone"
                    value={formData.senderPhone}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="senderEmail" className="mb-2 block text-md">
                    Sender Email
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md"
                    type="text"
                    id="senderEmail"
                    name="senderEmail"
                    value={formData.senderEmail}
                    onChange={handleChange}
                  />
                </div>
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
