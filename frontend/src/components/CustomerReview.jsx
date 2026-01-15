/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import kanishqImage from "../assets/Kanishq_Karanjawala_c1.jpg";
import HarshImage from "../assets/Harsh_Goyal_c2.jpg";
import TanishqImage from "../assets/Tanishq_Bajpal_c3.jpg";
import YashImage from "../assets/Yash_Wankhede_c4.jpg";
import PrathameshImage from "../assets/Prathamesh_Jawanjal_c5.jpg";

const CustomerReviews = () => {
  const reviews = [
    {
      name: "Kanishq Karanjawala",
      tags: ["Express Service", "Fabric Care Expert", "Monthly Package"],
      text:
        "Being a working professional in Pune, Andes has been a lifesaver! Seriously yaar, clothes itne fresh aaye jaise naye ho, full marks to Andes!.",
      image: kanishqImage,
      rating: 5,
      location: "Pune, Maharashtra",
    },
    {
      name: "Harsh Goyal",
      tags: ["Premium Dry Clean", "Door-Step Pickup", "Quality Service"],
      text:
        "Once you try Andes, there's no going back. Their door-step service saves me so much time. Truly worth every rupee!",
      image: HarshImage,
      rating: 5,
      location: "Pune, Maharashtra",
    },
    {
      name: "Tanishq Bajpal",
      tags: ["Student Discount", "Quick Service", "Affordable"],
      text:
        "As a college student in Pune, I needed reliable and affordable laundry service. Took me back to mom's way of doing laundry – pure comfort.",
      image: TanishqImage,
      rating: 5,
      location: "Delhi, NCR",
    },
    {
      name: "Yash Wankhede",
      tags: ["Eco-Friendly", "Fast Delivery", "Great Support"],
      text:
        "Brought back hostel memories, but way cleaner this time! and was amazed by their fast delivery. Highly recommend!",
      image: YashImage,
      rating: 5,
      location: "Pune, Maharashtra",
    },
    {
      name: "Prathamesh Jawanjal",
      tags: ["Premium Service", "Quality Assurance", "Monthly Package"],
      text:
        "I was skeptical at first, but Andes changed my mind. Ek baar try kiya tha bas, ab toh har week Andes hi chahiye.",
      image: PrathameshImage,
      rating: 5,
      location: "Pune, Maharashtra",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = reviews.length;
  const sliderRef = useRef(null);
  const isTransitioning = useRef(false);

  // Create an extended array of reviews for infinite scrolling
  const extendedReviews = [...reviews, ...reviews, ...reviews];

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 5000); // Advance every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Handle transition end to reset for infinite loop
  useEffect(() => {
    const slider = sliderRef.current;
    const handleTransitionEnd = () => {
      isTransitioning.current = false;
      if (currentSlide >= slideCount * 2) {
        setCurrentSlide(currentSlide - slideCount);
        slider.style.transition = "none";
        slider.style.transform = `translateX(-${(currentSlide - slideCount) * (100 / 3)}%)`;
        setTimeout(() => {
          slider.style.transition = "transform 0.5s ease-in-out";
        }, 0);
      } else if (currentSlide < slideCount) {
        setCurrentSlide(currentSlide + slideCount);
        slider.style.transition = "none";
        slider.style.transform = `translateX(-${(currentSlide + slideCount) * (100 / 3)}%)`;
        setTimeout(() => {
          slider.style.transition = "transform 0.5s ease-in-out";
        }, 0);
      }
    };

    slider.addEventListener("transitionend", handleTransitionEnd);
    return () => slider.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentSlide, slideCount]);

  // Navigate to previous slide
  const prevSlide = () => {
    if (!isTransitioning.current) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // Navigate to next slide
  const nextSlide = () => {
    if (!isTransitioning.current) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  // Jump to specific slide
  const goToSlide = (index) => {
    if (!isTransitioning.current) {
      setCurrentSlide(index + slideCount);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-6xl mx-auto p-4 sm:p-16 text-center">
        <h2 className="text-4xl font-bold mb-4 text-blue-900">
          Our Happy Customers
        </h2>
        <p className="text-gray-600 mb-12 text-lg">
          Rated excellent <span className="text-yellow-500">★★★★★</span> by our users
        </p>
        <div className="relative">
          {/* Slider Container */}
          <div className="overflow-hidden">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
            >
              {extendedReviews.map((review, index) => (
                <div
                  key={index}
                  className="w-full md:w-1/3 flex-shrink-0 px-4"
                >
                  <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full relative">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-20 h-20 rounded-full border-4 border-blue-100 overflow-hidden">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="text-center mb-4">
                      <h4 className="text-xl font-bold text-blue-900 mb-2">{review.name}</h4>
                      <div className="text-yellow-400 text-lg mb-4">
                        {"★".repeat(review.rating)}
                      </div>
                    </div>
                    <div className="relative">
                      <span className="absolute -top-2 -left-2 text-6xl text-blue-200 opacity-50">"</span>
                      <p className="text-gray-700 text-lg leading-relaxed relative z-10 italic">
                        {review.text}
                      </p>
                      <span className="absolute -bottom-4 -right-2 text-6xl text-blue-200 opacity-50">"</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-900 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-900 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          {/* Dots for Navigation */}
          <div className="flex justify-center mt-4">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 mx-1 rounded-full ${
                  currentSlide % slideCount === index ? "bg-blue-900" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;