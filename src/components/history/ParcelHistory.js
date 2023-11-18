import React, { useState } from "react";

const ParcelHistory = () => {
  // Simulated data for parcel history
  const parcelHistory = [
    {
      sender: "John Doe",
      recipient: "Alice Smith",
      readyForPickupDate: "2023-11-10 14:30",
      pickupDate: "2023-11-12 09:15",
      status: "Delivered",
      location: "Parcel Locker A",
      retrievalCode: "12345",
    },
    {
      sender: "John Doe",
      recipient: "Alice Smith",
      readyForPickupDate: "2023-11-10 14:30",
      pickupDate: "2023-11-12 09:15",
      status: "Delivered",
      location: "Parcel Locker A",
      retrievalCode: "12345",
    },
    // Add more parcel history entries as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className=" text-4xl font-bold text-center my-8">
        Parcel Information and History
      </h2>
      <div className="mt-4">
        {parcelHistory.map((parcel, index) => (
          <div key={index} className="border rounded p-4 mb-4">
            <p>
              <strong>Sender:</strong> {parcel.sender}
            </p>
            <p>
              <strong>Recipient:</strong> {parcel.recipient}
            </p>
            <p>
              <strong>Ready for Pickup:</strong> {parcel.readyForPickupDate}
            </p>
            <p>
              <strong>Picked up:</strong> {parcel.pickupDate}
            </p>
            <p>
              <strong>Status:</strong> {parcel.status}
            </p>
            {parcel.status === "Ready for Pickup" && (
              <div>
                <p>
                  <strong>Location:</strong> {parcel.location}
                </p>
                <p>
                  <strong>Retrieval Code:</strong> {parcel.retrievalCode}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParcelHistory;
