import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../context/UserContext";

const ParcelHistory = () => {
  const { user } = useContext(UserContext);

  const [data, setData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Retrieve the user ID from local storage
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    fetch("http://localhost:5005/api/parcels")
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "result after response");

        if (result.parcels && Array.isArray(result.parcels)) {
          // Filter parcels where the current user is the sender
          const filteredResult = result.parcels.filter((parcel) => {
            return parcel.sender && parcel.sender.user === userId;
          });

          setData(result.parcels); // Set all parcel data
          setFilteredData(filteredResult); // Set filtered data for parcels sent by the current user
          console.log(filteredResult, "filtered result");
        } else {
          console.error("Unexpected data structure:", result);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array as this effect doesn't depend on any changing values

  // Dependency array includes user to re-run effect when user changes

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold text-center my-8 text-blue-600">
        Parcel Information and History
      </h2>
      <div>
        {filteredData.length > 0 ? (
          filteredData.map((parcel, index) => (
            <div
              key={index}
              className="mb-6 p-5 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-semibold text-purple-700 mb-2">
                Parcel {index + 1}
              </h3>
              <p className="text-md mb-1">
                <strong>Sender:</strong>{" "}
                <span className="text-gray-600">{parcel.sender.name}</span>
              </p>
              <p className="text-md mb-1">
                <strong>Recipient:</strong>{" "}
                <span className="text-gray-600">{parcel.recipient.name}</span>
              </p>
              <p className="text-md mb-1">
                <strong>Ready for Pickup:</strong>{" "}
                <span className="text-green-500">
                  {parcel.readyForPickupDate}
                </span>
              </p>
              <p className="text-md mb-1">
                <strong>Status:</strong>{" "}
                <span className="text-blue-500">{}</span>
              </p>
              <p className="text-md mb-3">
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    parcel.status === "Ready for Pickup"
                      ? "text-red-500"
                      : "text-indigo-500"
                  }`}
                >
                  {parcel.status}
                </span>
              </p>
              {parcel.status === "Ready for Pickup" && (
                <div className="bg-yellow-100 p-3 rounded border border-yellow-200">
                  <p>
                    <strong>Location:</strong>{" "}
                    <span className="text-gray-700">
                      {parcel.pickupLocation}
                    </span>
                  </p>
                  <p>
                    <strong>Pickup Code:</strong>{" "}
                    <span className="text-gray-700">{parcel.pickupCode}</span>
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No parcel history available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ParcelHistory;
