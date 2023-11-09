import React, { useState } from "react";

const Locker = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLocker = () => {
    // Toggle the locker state
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`p-4 sm:p-6 md:max-w-sm mx-auto rounded-lg text-center shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl cursor-pointer ${
        isOpen ? "bg-green-400" : "bg-gray-400 hover:bg-gray-700"
      }`}
    >
      <p className="text-lg font-semibold mb-4">{`Locker ${id}`}</p>
      <div>
        <input
          type="text"
          className="code-input p-3 mb-4 w-full border border-gray-400 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={isOpen ? "Unlocked" : "Enter Code"}
          disabled={isOpen}
        />
        <button
          onClick={toggleLocker}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg transition-colors duration-200"
        >
          {isOpen ? "Lock" : "Unlock"}
        </button>
      </div>
    </div>
  );
};

export default Locker;
