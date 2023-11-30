import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../context/UserContext";

const ParcelHistory = () => {
  const { user } = useContext(UserContext);
  console.log(user, "from parcel history");

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch the array of objects
    fetch("http://localhost:5005/api/parcels") // Replace with your API endpoint
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "result after response");

        // Check if the result has a 'parcels' property
        if (result.parcels && Array.isArray(result.parcels)) {
          const parcelsArray = result.parcels;

          // Filter the data based on the specified conditions
          const filteredResult = parcelsArray.filter((item) => {
            // Example: Filter based on sender's name and email
            return (
              (item.sender &&
                item.sender.name === user.username &&
                item.sender.email === user.email) ||
              (item.recipient &&
                item.recipient.name === user.username &&
                item.recipient.email === user.email)
            );
          });

          setData(parcelsArray);
          setFilteredData(filteredResult);
          console.log(filteredResult, "filtered result");
        } else {
          console.error("Unexpected data structure:", result);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [user]);
  // Function to format the date
  // Function to format the date
  const formatCreatedAt = (createdAt) => {
    const createdAtDate = new Date(createdAt);

    // Format the date components manually
    const year = createdAtDate.getFullYear();
    const month = String(createdAtDate.getMonth() + 1).padStart(2, "0");
    const day = String(createdAtDate.getDate()).padStart(2, "0");
    const hours = String(createdAtDate.getHours()).padStart(2, "0");
    const minutes = String(createdAtDate.getMinutes()).padStart(2, "0");
    const seconds = String(createdAtDate.getSeconds()).padStart(2, "0");

    // Create the formatted date string
    const formattedDateString = `${day}-${month}-${year} `;

    return formattedDateString;
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className=" text-4xl font-bold text-center my-8">
        Parcel Information and History
      </h2>
      <div className="mt-4">
        {filteredData.map((parcel, index) => (
          <div key={index} className="border rounded p-4 mb-4">
            <p>
              <strong>Sender:</strong> {parcel.sender.name}
            </p>
            <p>
              <strong>Recipient:</strong> {parcel.recipient.name}
            </p>
            <p>
              <strong>Weight:</strong> {parcel.parcelWeight}
            </p>
            <p>
              <strong>Sent at:</strong>
              {formatCreatedAt(parcel.createdAt)}
            </p>
            <p>
              <strong>Description:</strong> {parcel.parcelDescription}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParcelHistory;
