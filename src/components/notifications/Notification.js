import React, { useState, useEffect } from "react";

const Notification = () => {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions data from the server and filter by user ID
  const fetchTransactions = async () => {
    // Get the user ID from local storage
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    if (!userId) {
      console.error("User ID not found in local storage");
      return;
    }

    try {
      const response = await fetch("http://localhost:5005/api/transactions/");
      const data = await response.json();

      // Filter transactions for the current user
      const userTransactions = data.transactions.filter(
        (transaction) => transaction.userId === userId
      );
      setTransactions(userTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      {transactions.length > 0 ? (
        <div className="bg-gray-100 flex justify-center items-center min-h-screen">
          <div className="bg-white shadow-2xl rounded-2xl p-4 w-8/12 max-w-md">
            <h1 className="text-center font-semibold text-2xl py-2">
              Your Transactions
            </h1>
            {transactions.map((transaction, index) => (
              <div
                className="bg-white shadow-md rounded-xl p-4 my-2"
                key={index}
              >
                <p>Transaction ID: {transaction._id}</p>
                <p>Amount: {transaction.amount}</p>
                <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
                <p>Status: {transaction.status}</p>
                {/* Add any other transaction details you need to display */}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No transactions found for this user.</p>
      )}
    </>
  );
};

export default Notification;
