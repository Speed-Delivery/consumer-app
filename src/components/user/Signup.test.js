import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import Signup from "./Signup";
import { UserContext } from "../context/UserContext";

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({ user: { username: "user1", email: "user@email.js" } }),
  })
);

describe("Signup", () => {
  // Define a mock context value that matches what your component expects
  const mockContextValue = {
    updateUser: jest.fn(),
    setIsAuthenticated: jest.fn(),
    setUser: jest.fn(),
  };

  beforeEach(() => {
    global.fetch.mockClear();
  });

  it("submits the form correctly", async () => {
    render(
      <Router>
        <UserContext.Provider value={mockContextValue}>
          <Signup />
        </UserContext.Provider>
      </Router>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "user1" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "user@email.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "user123" },
    });

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /Sign up/i }));

    // Wait for expected outcome
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
});
