import React from "react";

const Login = ({ onSwitch }) => {
  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div class="flex flex-col justify-center p-8 md:p-14">
          <span class="mb-3 text-4xl font-bold">Welcome back</span>
          <span class="font-light text-gray-400 mb-8">
            Welcom back! Please enter your details
          </span>
          <div class="py-4">
            <span class="mb-2 text-md">Email</span>
            <input
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
            />
          </div>
          <div class="py-4">
            <span class="mb-2 text-md">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <button class="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">
            Log in
          </button>
          <button
            class="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
            onClick={onSwitch}
          >
            Sign up
          </button>
        </div>
        <div class="relative">
          <img
            src="https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?auto=format&fit=crop&q=80&w=1415&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="img"
            class="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          <div class="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span class="text-white text-xl">
              "We've been excited to start our
              <br />
              Company Speed-Delivery <br />
              fast and reliable platform."
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
