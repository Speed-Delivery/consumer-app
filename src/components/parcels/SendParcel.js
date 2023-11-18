import React, { useEffect, useState } from "react";

const SendParcel = () => {
  const [parcelData, setParcelData] = useState({
    parcelDescription: "",
    parcelWeight: "",
    length: "",
    width: "",
    height: "",
    status: "awaiting pickup",
    recipientName: "",
    recipientAddress: "",
    recipientPhoneNumber: "",
    senderName: "",
    senderAddress: "",
    senderPhoneNumber: "",
  });

  useEffect(() => {
    // This block will run after the state has been updated
    console.log("Updated parcelData:", parcelData);
  }, [parcelData]); // Dependency array ensures this effect runs when parcelData changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParcelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    //
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, you can send parcelData to your backend or perform other actions.
    console.log(parcelData);
    console.log(
      "before sending post request",
      parcelData.senderName,
      parcelData.senderPhoneNumber,
      parcelData.recipientName,
      parcelData.recipientPhoneNumber
    );
    const senderName = parcelData.senderName;
    const senderPhoneNumber = parcelData.senderPhoneNumber;
    const recipientName = parcelData.recipientName;
    const recipientPhoneNumber = parcelData.recipientPhoneNumber;

    try {
      const userValidationResponse = await fetch(
        "http://localhost:8005/api/validation/validateUsers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderName,
            senderPhoneNumber,
            recipientName,
            recipientPhoneNumber,
          }),
        }
      );

      if (!userValidationResponse.ok) {
        throw new Error("User validation failed");
      }

      // const userValidationData = await userValidationResponse.json();
      // console.log("User validation successful:", userValidationData);

      const data = await userValidationResponse.json();
      console.log("Sender ID:", data.senderId);
      console.log("Receiver ID:", data.receiverId);

      //console.error("Response Status:", userValidationResponse.status);
      //console.error("Response Text:", await userValidationResponse.text());

      // Extract senderId and receiverId from the validation data
      const { senderId, receiverId } = data;
      const parcelDescription = parcelData.parcelDescription;
      const parcelWeight = parcelData.parcelWeight;
      const parcelDimension = {
        length: parcelData.depth,
        width: parcelData.width,
        height: parcelData.height,
      };

      const status = parcelData.status;

      // Prepare parcel data with additional information
      const parcelDataWithValidation = {
        parcelDescription,
        parcelWeight,
        parcelDimension,
        status,
        sender: senderId, // Use the senderId obtained from validation
        receiver: receiverId, // Use the receiverId obtained from validation
      };
      console.log(parcelDataWithValidation);

      // Second API request to create a new parcel
      const parcelCreationResponse = await fetch(
        "http://localhost:8005/api/sendParcel/parcels",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parcelDataWithValidation),
        }
      );

      if (!parcelCreationResponse.ok) {
        throw new Error("Failed to create parcel");
      }

      const parcelCreationData = await parcelCreationResponse.json();
      console.log("Parcel created successfully:", parcelCreationData);

      //console.error("Full Response Text:", await parcelCreationResponse.text());

      // Continue with the form submission or other actions
    } catch (error) {
      console.error("Error creating parcel:", error.message);

      // Handle error (show an error message to the user, etc.)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Send Parcel</h2>

      <form onSubmit={handleSubmit}>
        {/* Parcel Size and weight */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Width (cm):
            </label>
            <input
              required
              type="number"
              name="width"
              value={parcelData.width}
              onChange={handleChange}
              className="form-input w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Height (cm):
            </label>
            <input
              required
              type="number"
              name="height"
              value={parcelData.height}
              onChange={handleChange}
              className="form-input w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Depth (cm):
            </label>
            <input
              required
              type="number"
              name="depth"
              value={parcelData.depth}
              onChange={handleChange}
              className="form-input w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Weight (kg):
            </label>
            <input
              required
              type="number"
              name="parcelWeight"
              value={parcelData.parcelWeight}
              onChange={handleChange}
              className="form-input w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            />
          </div>
        </div>

        {/* Recipient Information */}
        <h3 className="text-lg font-semibold mb-2">Recipient Information</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Name:
            </label>
            <input
              required
              type="text"
              name="recipientName"
              value={parcelData.recipientName}
              onChange={handleChange}
              className="form-input w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Address:
            </label>
            <input
              required
              type="text"
              name="recipientAddress"
              value={parcelData.recipientAddress}
              onChange={handleChange}
              className="form-input w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Phone Number:
            </label>
            <input
              required
              type="tel"
              name="recipientPhoneNumber"
              value={parcelData.recipientPhoneNumber}
              onChange={handleChange}
              className="form-input w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            />
          </div>
        </div>

        {/* Sender Information */}
        <h3 className="text-lg font-semibold mb-2">Sender Information</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Name:
            </label>
            <input
              required
              type="text"
              name="senderName"
              value={parcelData.senderName}
              onChange={handleChange}
              className="form-input w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Address:
            </label>
            <input
              required
              type="text"
              name="senderAddress"
              value={parcelData.senderAddress}
              onChange={handleChange}
              className="form-input w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Phone Number:
            </label>
            <input
              required
              type="tel"
              name="senderPhoneNumber"
              value={parcelData.senderPhoneNumber}
              onChange={handleChange}
              className="form-input w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            />
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Description:
          </label>
          <textarea
            required
            name="parcelDescription"
            value={parcelData.parcelDescription}
            onChange={handleChange}
            rows="4" // You can adjust the number of rows as needed
            className="form-textarea w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
