import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import API_BASE_URL from "../apiConfig";

const ParcelHistory = () => {
  const { user } = useContext(UserContext);

  const [parcels, setParcels] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Define userId outside of useEffect
  const userId =
    user && user._id ? user._id : JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    // Fetch parcels
    fetch(`${API_BASE_URL}/api/parcels`)
      .then((response) => response.json())
      .then((result) => {
        if (result.parcels && Array.isArray(result.parcels)) {
          setParcels(result.parcels);
        } else {
          console.error("Unexpected data structure:", result);
        }
      })
      .catch((error) => console.error("Error fetching parcels:", error));

    // Fetch transactions
    fetch(`${API_BASE_URL}/api/transactions`)
      .then((response) => response.json())
      .then((result) => {
        if (result.transactions && Array.isArray(result.transactions)) {
          setTransactions(result.transactions);
        } else {
          console.error("Unexpected data structure:", result);
        }
      })
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  // Match parcels with transactions
  useEffect(() => {
    if (parcels.length && transactions.length) {
      const matchedData = parcels
        .filter((parcel) => parcel.sender && parcel.sender.user === userId)
        .map((parcel) => {
          const transaction = transactions.find(
            (tran) => tran.parcelId === parcel._id
          );
          return { ...parcel, transaction };
        });

      setFilteredData(matchedData);
    }
  }, [parcels, transactions, userId]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold text-center my-8 text-blue-600">
        Parcel Information and History
      </h2>
      <div>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div
              key={index}
              className="mb-6 p-5 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-semibold text-purple-700 mb-2">
                Parcel {index + 1}
              </h3>
              <div className="parcel-info">
                <p>
                  <strong>Sender:</strong> {item.sender.name}
                </p>
                <p>
                  <strong>Sender Address:</strong> {item.sender.address}
                </p>
                <p>
                  <strong>Recipient:</strong> {item.recipient.name}
                </p>
                <p>
                  <strong>Recipient Address:</strong> {item.recipient.address}
                </p>
              </div>
              {item.transaction && (
                <div className="transaction-info">
                  <h4 className="text-xl font-semibold text-green-700 mt-4 mb-2">
                    Transaction Details
                  </h4>
                  <p>
                    <strong>Parcel Status:</strong>{" "}
                    {item.transaction.parcelStatus}
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(item.transaction.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Last Updated:</strong>{" "}
                    {new Date(
                      item.transaction.transactionStatusLastUpdated
                    ).toLocaleDateString()}
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
