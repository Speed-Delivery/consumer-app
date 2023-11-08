import React from 'react';
import Locker from './components/sendparcel/Locker';

const Home = () => {
    const lockers = Array(15).fill(0); // create an array of 15 lockers
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="p-8 bg-white shadow-xl rounded w-full max-w-5xl">
          <h1 className="text-2xl font-bold mb-6 text-center">Locker Simulation</h1>
          <div className="grid grid-rows-5 grid-cols-3 gap-x-4 gap-y-2">
            {lockers.map((_, index) => (
              <Locker key={index} id={`1-${index + 1}`} />
            ))}
          </div>
        </div>
      </div>
    );
};

export default Home;