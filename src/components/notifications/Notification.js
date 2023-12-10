import React, { useState, useEffect } from 'react';
import NotificationCard from './NotificationCard'; // Import the component
 
const Notification = () => {
  const [parcels, setParcels] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [lockers, setLockers] = useState([]);
  const [matchingData, setMatchingData] = useState({
    matchingParcels: [],
    matchingTransactions: [],
    matchingLockers: [],
    matchingCabinets: [],
  });
 
  useEffect(() => {
    // Step 1: Retrieve the user ID from local storage
    const userId = JSON.parse(localStorage.getItem("user"))._id;
 
    // Step 2: Fetch parcels where the current user is the sender
    fetch("http://localhost:5005/api/parcels")
      .then((response) => response.json())
      .then((result) => {
        if (result.parcels && Array.isArray(result.parcels)) {
          // Filter parcels where the current user is the sender
          const filteredResult = result.parcels.filter((parcel) => {
            return parcel.sender && parcel.sender.user === userId;
          });
 
          setParcels(filteredResult); // Set filtered parcel data
        } else {
          console.error("Unexpected data structure for parcels:", result);
        }
      })
      .catch((error) => console.error("Error fetching parcels data:", error));
  }, []); // Empty dependency array means this effect runs once after initial render
 
  useEffect(() => {
    // Step 3: Fetch all transactions
    fetch("http://localhost:5005/api/transactions/")
    .then((response) => response.json())
    .then((transactionData) => {
      console.log("Fetched transactions:", transactionData.transactions); // Add this line
      if (Array.isArray(transactionData.transactions)) {
        setTransactions(transactionData.transactions);
      } else {
        console.error("Transaction data is not an array:", transactionData);
      }
    })
    .catch((error) => {
      console.error("Error fetching transaction data:", error);
    });
  
  }, []);
 
  useEffect(() => {
    // Step 4: Fetch lockers data
    fetchLockers();
  }, [parcels]);
 
  const fetchLockers = async () => {
    const response = await fetch("http://localhost:5005/api/lockers");
    const data = await response.json();
    if (data && Array.isArray(data.lockers)) {
      setLockers(data.lockers);
    } else {
      console.error("Data is not in the expected format:", data);
    }
  };
 
  useEffect(() => {
    // Step 5: Match cabinets to lockers
    if (parcels.length > 0 && lockers.length > 0) {
      const parcelCabinetMapping = {
        matchingParcels: [],
        matchingTransactions: [],
        matchingLockers: [],
        matchingCabinets: [],
      };
 
      transactions.forEach((transaction) => {
        // Check if the transaction status is 'awaiting pickup'
        if (transaction.parcelStatus === "awaiting pickup") {
          const parcelId = transaction.parcelId;
          const cabinetId = transaction.CabinetId;
      
          const matchingParcel = parcels.find((parcel) => parcel._id === parcelId);
      
          if (matchingParcel) {
            const lockerId = lockers.find((locker) =>
              locker.cabinets.some((cabinet) => cabinet.id === cabinetId)
            )?.id;
      
            if (lockerId) {
              const matchingCabinet = lockers
                .find((locker) => locker.id === lockerId)
                .cabinets.find((cabinet) => cabinet.id === cabinetId);
      
              if (matchingCabinet) {
                parcelCabinetMapping.matchingCabinets.push({
                  ...matchingCabinet,
                  transactionStatus: transaction.parcelStatus
                });
              }
            }
          }
        }
      });
 
      setMatchingData(parcelCabinetMapping);
    }
  }, [parcels, lockers, transactions]);
 
  return (
    <div>
      <NotificationCard
        title="Matching Cabinets"
        items={matchingData.matchingCabinets.map((cabinet) => ({
          cabinetNumber: cabinet.cabinetNumber,
          status: cabinet.transactionStatus,
          code: cabinet.code,
          cabinetStatusLastUpdated: cabinet.cabinetStatusLastUpdated,
        }))}
      />
    </div>
  );
};
 
export default Notification;
 
 