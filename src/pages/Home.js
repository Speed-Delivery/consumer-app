import React from "react";

import img1 from "../assets/pic1.jpg";
import img2 from "../assets/pic2.jpg";
import img3 from "../assets/pic3.jpg";
import Locker from "../components/lockers/Locker";
import "./Home.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Home = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="slider-item">
            <img className="slider-img" src={img1} alt="" />
            <div className="banner">
              <h2>Welcome to the Speed Delivery</h2>
              <p>
                With our user-friendly interface, you can effortlessly place
                orders, track shipments in real-time, and enjoy the convenience
                of scheduled deliveries.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-item">
            <img className="slider-img" src={img2} alt="" srcset="" />
            <div className="banner">
              <h2>Our priority is your satisfaction</h2>
              <p>
                We are a team of dedicated and passionate individuals who are
                committed to providing you with the best service possible.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-item">
            <div className="overlay"></div>
            <img className="slider-img" src={img3} alt="" srcset="" />
            <div className="banner">
              <h2>Connecting people around the world</h2>
              <p>
                At the heart of our commitment is the seamless connection we
                foster globally. Through our extensive and trustworthy delivery
                network, we bridge distances and bring communities together.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="container mx-auto p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Consumer APP!
        </h1>
      </div>
      <div className="container mx-auto p-6 md:p-8 flex gap-8 justify-between flex-col md:flex-row">
        <div className="steps">
          <h1 className="one">1</h1>
          <div className="color-circle"></div>
          <div className="block mt-8">
            <h2>Step 1</h2>
            <p>Register the website to send a new parcel.</p>
          </div>
        </div>
        <div className="steps">
          <h1 className="two">2</h1>
          <div className="color-circle"></div>
          <div className="block mt-8">
            <h2>Step 2</h2>
            <p>Fill-up your parcel details and press the button.</p>
          </div>
        </div>
        <div className="steps">
          <h1 className="three">3</h1>
          <div className="color-circle"></div>
          <div className="block mt-8">
            <h2>Step 3</h2>
            <p>Notification will be generated a locker code.</p>
          </div>
        </div>
        <div className="steps">
          <h1 className="four">4</h1>
          <div className="color-circle"></div>
          <div className="block mt-8">
            <h2>Step 4</h2>
            <p>You can delete your account after sending parcel.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
