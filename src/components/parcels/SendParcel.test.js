import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ParcelForm from "./SendParcel"; // Make sure this path matches the location of your ParcelForm component
import emailjs from "@emailjs/browser";

// Mock emailjs
jest.mock("@emailjs/browser", () => ({
  send: jest.fn().mockResolvedValue({ text: "OK" }),
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ parcel: { _id: "123" }, lockers: [] }),
  })
);

describe("ParcelForm", () => {
  beforeEach(() => {
    // Reset the mocks before each test
    global.fetch.mockClear();
    emailjs.send.mockClear();
  });

  it("submits the form correctly", async () => {
    render(<ParcelForm />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Test Parcel" },
    });
    fireEvent.change(screen.getByLabelText(/Width \(cm\)/i), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText(/Height \(cm\)/i), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText(/Length \(cm\)/i), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText(/Weight \(kg\)/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/Recipient Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Recipient Address/i), {
      target: { value: "123 Main St, Helsinki" },
    });
    fireEvent.change(screen.getByLabelText(/Recipient Phone Number/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/Recipient Email/i), {
      target: { value: "recipient@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Sender Name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Sender Address/i), {
      target: { value: "456 Elm St, Helsinki" },
    });
    fireEvent.change(screen.getByLabelText(/Sender Phone Number/i), {
      target: { value: "0987654321" },
    });
    fireEvent.change(screen.getByLabelText(/Sender Email/i), {
      target: { value: "sender@example.com" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Send Parcel/i));

    // Wait for expected outcome
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
});
