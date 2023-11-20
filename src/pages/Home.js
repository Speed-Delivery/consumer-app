import React from "react";
import Locker from "../components/lockers/Locker";

const Home = () => {
  return (
    <div className="container mx-auto p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Parcel Lockers
      </h1>
      <Locker />
    </div>
  );
};

export default Home;
