import React from "react";
import Locker from "../components/lockers/Locker";

const Home = () => {
  const lockerCount = 15;
  const lockers = Array.from({ length: lockerCount }, (_, index) => index + 1); // create an array of 15 lockers with unique IDs

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Parcel Lockers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lockers.map((id) => (
          <Locker key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
