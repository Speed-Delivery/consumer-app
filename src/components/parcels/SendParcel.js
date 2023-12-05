import React, { useState } from "react";
import emailjs from "@emailjs/browser";

//store  the sender and recipient city from the valiadateAddress function

const ParcelForm = () => {
  const [cabinetNumber, setCabinetNumber] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [cabinetId, setCabinetId] = useState(""); // You can store the cabinet id here
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
    let foundCity = ""; // Variable to store the matched city

    // Splitting the address into components
    const addressParts = address
      .trim()
      .split(" ")
      .map((part) => part.trim());

    // Checking if any part of the address matches a city in the list
    for (let part of addressParts) {
      if (cities.includes(part)) {
        foundCity = part;
        break; // Stop the loop as only one city is expected
      }
    }

    // Return the city if found, false otherwise
    return foundCity !== "" ? foundCity : false;
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
      // Create a transaction for the parcel
      const transaction = await createTransaction(result.parcel._id);
      console.log("Transaction created successfully:", transaction);
    } catch (error) {
      console.error("There was a problem sending the parcel:", error);
    }
  };

  const createTransaction = async (parcelId) => {
    try {
      const transactionResponse = await fetch(
        "http://localhost:5005/api/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ parcelId }), // Sending only parcelId as required
        }
      );

      if (!transactionResponse.ok) {
        throw new Error(`HTTP error! status: ${transactionResponse.status}`);
      }

      const transactionResult = await transactionResponse.json();
      console.log("Transaction created successfully:", transactionResult);
      return transactionResult;
    } catch (error) {
      console.error("There was a problem creating the transaction:", error);
    }
  };

  //create an put api call to update the transaction to insert the cabinet id and access code
  const updateTransaction = async (transactionId) => {
    try {
      const transactionResponse = await fetch(
        `http://localhost:5005/api/transactions/${transactionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cabinetId, accessCode }), // Sending only parcelId as required
        }
      );

      if (!transactionResponse.ok) {
        throw new Error(`HTTP error! status: ${transactionResponse.status}`);
      }

      const transactionResult = await transactionResponse.json();
      console.log("Transaction created successfully:", transactionResult);
      return transactionResult;
    } catch (error) {
      console.error("There was a problem creating the transaction:", error);
    }
  };

  const fetchCabinets = async (city) => {
    try {
      const response = await fetch(`http://localhost:5005/api/lockers/${city}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(
        "There was a problem fetching the available couriers:",
        error
      );
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

  // Function to validate addresses
  function validateAddresses(formData) {
    let isValid = true;
    let senderCity = validateAddress(formData.senderAddress);
    let recipientCity = validateAddress(formData.recipientAddress);

    if (!senderCity) {
      alert(
        "Sender address is invalid. Please ensure it includes a valid city."
      );
      isValid = false;
    }
    console.log("Sender address is " + senderCity);

    if (!recipientCity) {
      alert(
        "Recipient address is invalid. Please ensure it includes a valid city."
      );
      isValid = false;
    }
    console.log("Recipient address is " + recipientCity);

    return { isValid, senderCity, recipientCity };
  }

  async function fetchAndFilterCabinets(city) {
    const cabinetsData = await fetchCabinets(city);
    let availableCabinets = [];
    cabinetsData.lockers.forEach((locker) => {
      let available = locker.cabinets.filter(
        (cabinet) => cabinet.status === "available"
      );
      availableCabinets.push(...available);
    });

    // Randomly select and log a cabinet if there are any available
    if (availableCabinets.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCabinets.length);
      const selectedCabinet = availableCabinets[randomIndex];
      setCabinetNumber(selectedCabinet.cabinetNumber);
      setAccessCode(selectedCabinet.code);
      setCabinetId(selectedCabinet.id);
      console.log(
        `Sender Cabinet: Id - ${cabinetId}, Door Number - ${cabinetNumber}, Code - ${accessCode}`
      );
    } else {
      alert("No available cabinets pls wait until the cabinets are freed up.");
    }

    // You can still return the selected cabinet id
    return cabinetId;
  }

  const sendEmail = () => {
    const emailData = {
      to_name: formData.recipientName,
      from_name: "Speedy_Delivery",
      message: "Your parcel is ready to be placed in the cabinet.", // Example message, modify as needed
      cabinet_number: cabinetNumber,
      access_code: accessCode,
      // Include other necessary data if needed
    };

    emailjs
      .send(
        "service_x0xfrt6",
        "template_bwqabpx",
        emailData,
        "ECwLhx40fdB0L2HBr"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  // The handleSubmit function remains the same
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, senderCity } = validateAddresses(formData);

    if (isValid) {
      await fetchAndFilterCabinets(senderCity);
      sendEmail(); // Send email with cabinet number and access code
      const parcelId = await sendParcel();
      console.log("this is the parcel that is being created", parcelId); // Only call sendParcel if all validations pass
    }

    // clearForm();
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
