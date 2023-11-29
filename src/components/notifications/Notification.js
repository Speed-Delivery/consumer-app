import React, { useState, useEffect } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // fetch notifications from backend
    try {
      const userString = localStorage.getItem("user"); // Change the key to 'user'
      console.log("User String:", userString); // Debugging
      if (!userString) {
        console.error("No user data found");
        return;
      }

      const user = JSON.parse(userString);
      const token = user.token;
      console.log("Token:", token); // Debugging

      fetch(`http://localhost:5005/api/notifications/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user.userId),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Notifications:", data.notifications);
          setNotifications(data.notifications);
        })
        .catch((err) => console.error("Error fetching notifications:", err));
    } catch (err) {
      console.error("Error:", err);
    }
  }, []);

  return (
    <div className="p-4 bg-gray-100 h-screen">
      {(!notifications || notifications.length) === 0 ? (
        <h1 className="text-2xl font-bold mb-2">No new notifications</h1>
      ) : (
        notifications &&
        notifications.map((notification, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-2"
          >
            <div className="mb-2">
              <span className="block text-gray-700 text-xl font-bold mb-2">
                Parcel Arrived
              </span>
              <span className="block text-gray-700 text-sm font-bold mb-2">
                {" "}
                {notification.message}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;