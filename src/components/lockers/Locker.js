import React, { useState, useEffect } from "react";
import API_BASE_URL from "../../apiConfig";

const LockerList = () => {
  const [lockers, setLockers] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [cities, setCities] = useState([
    "Helsinki",
    "Espoo",
    "Tampere",
    "Vantaa",
    "Oulu",
  ]);

  useEffect(() => {
    fetchLockers();
  }, []);

  const fetchLockers = async () => {
    const response = await fetch(`${API_BASE_URL}/api/lockers`);
    const data = await response.json();
    if (data && Array.isArray(data.lockers)) {
      setLockers(data.lockers);
    } else {
      console.error("Data is not in the expected format:", data);
    }
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <div className="text-center">
      <div className="location-selector mb-4">
        <select
          onChange={handleLocationChange}
          value={selectedLocation}
          className="text-center py-2.5 px-0 w-[25%] text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option value="">Select Location</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {selectedLocation &&
          lockers
            .filter((locker) => locker.location === selectedLocation)
            .flatMap((locker) =>
              locker.cabinets.map((cabinet) => (
                <Locker
                  key={cabinet.cabinetNumber}
                  cabinet={cabinet}
                  lockerId={locker.id}
                />
              ))
            )}
      </div>
    </div>
  );
};

// Locker Component
const Locker = ({ cabinet, lockerId }) => {
  const [inputCode, setInputCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isCorrectLocker, setIsCorrectLocker] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValidCode(inputCode, cabinet.code)) {
      setIsOpen(true);
      setIsCorrectLocker(true);
    } else {
      setIsOpen(false);
      setIsCorrectLocker(cabinet.code === inputCode);
    }

    setInputCode("");
  };

  const updateCabinetStatus = async () => {
    // Toggle the status based on the current status of the cabinet
    const newStatus = cabinet.status === "available" ? "occupied" : "available";

    const updateData = {
      cabinetNumber: cabinet.cabinetNumber,
      status: newStatus,
      // Adjust the currentParcel value based on the new status
      currentParcel:
        newStatus === "occupied" ? "5f50c31f1234567890abcdef" : null,
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/lockers/${lockerId}`, // Use the locker ID
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update cabinet status");
      } else {
        // Update the local cabinet status after successful API response
        cabinet.status = newStatus;
      }
    } catch (error) {
      console.error("Error updating locker status", error);
    }
  };

  const handleCodeChange = (event) => {
    setInputCode(event.target.value);
  };

  const handleCloseCabinet = async () => {
    setIsOpen(false);
    updateCabinetStatus();
    // Update the cabinet status
  };

  const handleSelectCabinet = () => {
    alert("Selecting cabinet: " + cabinet.code);
  };

  return (
    <div
      className={`p-4 sm:p-6 md:max-w-sm mx-auto rounded-lg text-center shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl ${
        isOpen
          ? "bg-green-400"
          : cabinet.status === "available"
          ? "bg-gray-400 hover:bg-gray-700"
          : "bg-red-400"
      }`}
    >
      <p className="text-lg font-semibold mb-4">{`Cabinet ${cabinet.cabinetNumber}`}</p>
      <input
        type="text"
        value={inputCode}
        onChange={handleCodeChange}
        className="code-input p-3 mb-4 w-full border border-gray-400 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter Code"
      />

      <button
        onClick={handleSelectCabinet}
        className="mr-4 bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
        disabled={cabinet.status !== "available"}
      >
        Select
      </button>

      <button
        onClick={handleSubmit}
        className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg transition-colors duration-200"
      >
        Unlock
      </button>
      {isOpen && (
        <button
          onClick={handleCloseCabinet}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold ml-3 px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Lock
        </button>
      )}
      {!isCorrectLocker && <p>Incorrect Code or Wrong Locker</p>}
    </div>
  );
};

const isValidCode = (inputCode, correctCode) => {
  return inputCode === correctCode;
};

export default LockerList;
