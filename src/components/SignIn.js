import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  let token;

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    //sending post request to the server
    axios
      .post("http://localhost:5000/api/user/signin", {
        username: username,
        password: password,
      })
      .then((response) => {
        //if the response is successful, store the token in local storage
        token = response.data.token;
        localStorage.setItem("token", token);
        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        //if there is an error, set the error message
        error?.response?.data?.error?.setErrorMessage(
          error.response.data.error
        );
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center ">
      <div className="relative flex flex-col md:flex-row m-6 bg-gray-900 rounded-3xl shadow-2xl md:space-y-0  text-center">
        <div class="flex flex-col justify-center p-8 md:p-14">
          <span className="text-3xl font-bold text-center py-2 text-white">
            Sign In
          </span>
          <h2 className="text-xl text-center text-gray-300 pb-4">
            Welcome to Speed-Delivery
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="py-2">
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Username"
                className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="py-2">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                className="px-4 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* if there is an error, display the error message */}
            {error && (
              <div className="text-red-500 py-2 px-2 text-sm">{errorMessage}</div>
            )}
            <div className="py-3 flex items-center justify-center">
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : (
                <button
                  type="submit"
                  className="py-2 w-full px-4 border bg-black text-white rounded-md hover:bg-blue-800 transition-all duration-500"
                >
                  Sign In
                </button>
              )}
            </div>
            <div className="pt-2">
              <span className="text-gray-300 ">
                Don't have an account?{" "}
                <Link
                  to = "/sign-up"
                  className="text-blue-500 hover:text-blue-800 transition-all duration-500"
                >
                  Sign Up
                </Link>
              </span>
            </div>
          </form>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?auto=format&fit=crop&q=80&w=1415&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="img"
            class="w-[500px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          <div class="absolute hidden bottom-10 right-20 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
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

export default SignIn;
