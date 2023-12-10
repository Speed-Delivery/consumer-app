import React from 'react';
 
const NotificationCard = ({ title, items }) => (
    <div className="p-4 rounded-lg shadow-lg bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li
            key={index}
            className="bg-white bg-opacity-50 p-4 rounded-lg border border-gray-200"
          >
            <div className="mb-2">
              <span className="font-semibold">Cabinet Number:</span> {item.cabinetNumber}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Status:</span> {item.status}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Code:</span> {item.code}
            </div>
            <div>
              <span className="font-semibold">Cabinet Status Last Updated:</span>{' '}
              {item.cabinetStatusLastUpdated}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
export default NotificationCard;
