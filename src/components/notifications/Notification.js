import { filter } from 'lodash';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Notification = () => {
  const [userParcels, setUserParcels] = useState([]);
  const [userLockers, setUserLockers] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:5005'); // Replace with your server URL

    // Get the user ID from local storage
    const userId = JSON.parse(localStorage.getItem('user'))._id;
   
    if (userId) {
      socket.emit('getUserParcels', userId);
      console.log('User ID sent to server', userId); // Debugging
      socket.on('userParcels', (receivedUserParcels) => {
        setUserParcels(receivedUserParcels);
      });
      socket.emit('getUserLockers');
      socket.on('userLockers', (receivedLockers) => {
        setUserLockers(receivedLockers);
      });
    } else {
      console.error('User ID not found in local storage');
    }

    return () => {
      socket.disconnect();
    };
  }, []);
 
  
  // Function to get the cabinet object by parcel ID
  const getCabinetByParcelId = (userLockers, parcelId) => {
    for (const obj of userLockers) {
      for (const cabinet of obj.cabinets) {
        if (cabinet.currentParcel === parcelId) {
          return cabinet;
        }
      }
    }
    return null;
  };

  // create an array of user parcel IDs
  const userParcelIds = userParcels.map(parcel => parcel._id);
  // for each uesrParcelid find the cabinert object
  const userCabinets = userParcelIds.map(parcelId => getCabinetByParcelId(userLockers, parcelId));
  return (
    <>
      {userCabinets.length > 0 && (
        <div className="bg-gray-100 flex justify-center items-center min-h-screen">
          <div className="bg-white shadow-2xl rounded-2xl p-4 w-8/12 max-w-md">
            <h1 className="text-center font-semibold text-2xl py-2">
              Notifications
            </h1>
            <div className="flex justify-center items-center space-x-4 py-4">
              {userCabinets.map((cabinet) => (
                cabinet && cabinet._id ? ( // Check if cabinet exists and has _id property
                  <div className="bg-white shadow-2xl rounded-2xl p-4 w-8/12 max-w-md" key={cabinet._id}>
                    <p className="text-center py-2">Cabinet ID: {cabinet._id}</p>
                    <p className="text-center py-2">Parcel ID: {cabinet.currentParcel}</p>
                    <p className="text-center py-2">Parcel Code: {cabinet.currentParcelCode}</p>
                    <p className="text-center py-2">Parcel Size: {cabinet.currentParcelSize}</p>
                    <p className="text-center py-2">Parcel Status: {cabinet.currentParcelStatus}</p>
                  </div>
                ) : null
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );  
};

export default Notification;