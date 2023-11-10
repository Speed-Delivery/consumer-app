import React from "react";

const Signup = ({ onSwitch }) => {
  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div class="flex flex-col justify-center p-8 md:p-14">
          <span class="mb-3 text-4xl font-bold">
            Welcome to Speedy-Delivery
          </span>
          <span class="font-light text-gray-400 mb-8">
            Greetings! Please fill in the details to sign up for an account
          </span>
          <div class="flex flex-col md:flex-row">
            <div class="py-4 md:w-1/2 md:pr-2">
              <span class="mb-2 text-md">UserName</span>
              <input
                type="text"
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="username"
                id="username"
              />
            </div>
            <div class="py-4 md:w-1/2 md:pl-2">
              <span class="mb-2 text-md">Email</span>
              <input
                type="text"
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
              />
            </div>
          </div>
          <div class="flex flex-col md:flex-row">
            <div class="py-4 md:w-1/2 md:pr-2">
              <span class="mb-2 text-md">Password</span>
              <input
                type="password"
                name="pass"
                id="pass"
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <div class="py-4 md:w-1/2 md:pl-2">
              <span class="mb-2 text-md">Role</span>
              <input
                type="text"
                name="role"
                id="role"
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
          </div>
          <div class="flex flex-col md:flex-row">
            <div class="py-4 md:w-1/2 md:pr-2">
              <span class="mb-2 text-md">Full Name</span>
              <input
                type="text"
                name="fullName"
                id="fullName"
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <div class="py-4 md:w-1/2 md:pl-2">
              <span class="mb-2 text-md">Phone</span>
              <input
                type="text"
                name="phone"
                id="phone"
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
          </div>
          <div class="py-4">
            <span class="mb-2 text-md">Address</span>
            <input
              type="text"
              name="address"
              id="address"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <button class="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">
            Sign up
          </button>
          <button
            class="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
            onClick={onSwitch}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
