import React, { useState } from "react";
import "./SendParcel.css";

const SendParcel = () => {
  const [parcelInfo, setParcelInfo] = useState({
    width: "",
    height: "",
    depth: "",
    mass: "",
    recipientName: "",
    recipientAddress: "",
    recipientPhone: "",
    recipientEmail: "",
    senderName: "",
    senderAddress: "",
    senderPhone: "",
    senderEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParcelInfo({ ...parcelInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send the parcel information to your backend or perform any other action here
    console.log(parcelInfo);
  };

  return (
    <>
      <h2 className=" text-4xl font-bold text-center my-8">Send Parcel</h2>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content w-full ">
          {/* <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      </div> */}
          <div className="card flex-shrink-0 w-full pt-4 pb-16 shadow-2xl bg-base-100">
            <form
              onSubmit={handleSubmit}
              className="card-body grid gap-4 grid-cols-2 grid-rows-6"
            >
              <div className="form-control">
                <label className="label" htmlFor="width">
                  <span className="label-text">Width (cm):</span>
                </label>

                <input
                  className="input input-bordered"
                  required
                  type="number"
                  id="width"
                  name="width"
                  placeholder="width"
                  value={parcelInfo.width}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Height</span>
                </label>
                <input
                  className="input input-bordered"
                  required
                  type="number"
                  id="height"
                  name="height"
                  placeholder="height"
                  value={parcelInfo.height}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Depth</span>
                </label>
                <input
                  className="input input-bordered"
                  required
                  type="number"
                  id="depth"
                  name="depth"
                  placeholder="depth"
                  value={parcelInfo.depth}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Mass</span>
                </label>
                <input
                  className="input input-bordered"
                  required
                  type="number"
                  id="mass"
                  name="mass"
                  placeholder="mass"
                  value={parcelInfo.mass}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Recipient Name</span>
                </label>
                <input
                  className="input input-bordered"
                  required
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  placeholder="recipientName"
                  value={parcelInfo.recipientName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Recipient Address</span>
                </label>
                <input
                  className="input input-bordered"
                  required
                  type="text"
                  id="recipientAddress"
                  name="recipientAddress"
                  placeholder="recipientAddress"
                  value={parcelInfo.recipientAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Recipient Phone</span>
                </label>
                <input
                  className="input input-bordered"
                  required
                  type="text"
                  id="recipientPhone"
                  name="recipientPhone"
                  placeholder="recipientPhone"
                  value={parcelInfo.recipientPhone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Recipient Email</span>
                </label>
                <input
                  className="input input-bordered"
                  required
                  type="text"
                  id="recipientEmail"
                  name="recipientEmail"
                  placeholder="recipientEmail"
                  value={parcelInfo.recipientEmail}
                  onChange={handleChange}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Sender Name</span>
                </label>
                <input
                  className="input input-bordered"
                  required
                  type="text"
                  id="senderName"
                  name="senderName"
                  placeholder="senderName"
                  value={parcelInfo.senderName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Sender Address</span>
                </label>
                <input
                  className="input input-bordered"
                  required
                  type="text"
                  id="senderAddress"
                  name="senderAddress"
                  placeholder="senderAddress"
                  value={parcelInfo.senderAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Sender Phone</span>
                </label>
                <input
                  className="input input-bordered"
                  required
                  type="text"
                  id="senderPhone"
                  name="senderPhone"
                  placeholder="senderPhone"
                  value={parcelInfo.senderPhone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Sender Email</span>
                </label>
                <input
                  className="input input-bordered"
                  required
                  type="text"
                  id="senderEmail"
                  name="senderEmail"
                  placeholder="senderEmail"
                  value={parcelInfo.senderEmail}
                  onChange={handleChange}
                />
              </div>

              <div className="form-control mt-6">
                <button
                  id="send-parcel"
                  type="submit"
                  className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
                >
                  Send Parcel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SendParcel;
