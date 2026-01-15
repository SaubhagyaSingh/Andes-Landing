import React, { useState, useEffect, useRef } from "react";
import kanishqImage from "../assets/Kanishq_Karanjawala_c1.jpg";
import HarshImage from "../assets/Harsh_Goyal_c2.jpg";
import TanishqImage from "../assets/Tanishq_Bajpal_c3.jpg";
import YashImage from "../assets/Yash_Wankhede_c4.jpg";
import PrathameshImage from "../assets/Prathamesh_Jawanjal_c5.jpg";

const CustomerStories = () => {
  const stories = [
    {
      title: "Kanishq Karanjawala",
      tags: ["Express", "Fabric Care", "Monthly"],
      description: "Andes has been a lifesaver! Clothes come back fresh like new.",
      image: kanishqImage,
      rating: 5,
      location: "Pune",
    },
    {
      title: "Harsh Goyal",
      tags: ["Dry Clean", "Doorstep", "Quality"],
      description: "Once you try Andes, there's no going back. Saves me so much time!",
      image: HarshImage,
      rating: 5,
      location: "Pune",
    },
    {
      title: "Tanishq Bajpal",
      tags: ["Student", "Quick", "Affordable"],
      description: "Reliable service that reminds me of mom's laundry care.",
      image: TanishqImage,
      rating: 5,
      location: "Delhi",
    },
    {
      title: "Yash Wankhede",
      tags: ["Eco-Friendly", "Fast", "Support"],
      description: "Brought back hostel memories, but way cleaner this time!",
      image: YashImage,
      rating: 5,
      location: "Pune",
    },
    {
      title: "Prathamesh Jawanjal",
      tags: ["Premium", "Quality", "Monthly"],
      description: "Changed my mind about laundry services. Now I use them weekly!",
      image: PrathameshImage,
      rating: 5,
      location: "Pune",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(stories.length);
  const [cardsToShow, setCardsToShow] = useState(Math.min(3, stories.length));
  const sliderRef = useRef(null);
  const isTransitioning = useRef(false);
  const lastClickTime = useRef(0);

  // Create extended stories array for infinite scrolling
  const extendedStories = [...stories, ...stories, ...stories];

  // Handle responsive cardsToShow
  useEffect(() => {
    const handleResize = () => {
      const maxCards = Math.min(stories.length, window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
      setCardsToShow(maxCards);
      setCurrentIndex(stories.length); // Reset to middle
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [stories.length]);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000); // Scroll every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // Handle infinite loop
  useEffect(() => {
    const slider = sliderRef.current;
    const handleTransitionEnd = () => {
      isTransitioning.current = false;
      if (currentIndex >= stories.length * 2) {
        setCurrentIndex(stories.length);
        slider.style.transition = "none";
        slider.style.transform = `translateX(-${stories.length * (100 / cardsToShow)}%)`;
        setTimeout(() => {
          slider.style.transition = "transform 0.4s ease-in-out";
        }, 0);
      } else if (currentIndex < stories.length) {
        setCurrentIndex(stories.length);
        slider.style.transition = "none";
        slider.style.transform = `translateX(-${stories.length * (100 / cardsToShow)}%)`;
        setTimeout(() => {
          slider.style.transition = "transform 0.4s ease-in-out";
        }, 0);
      }
    };

    slider.addEventListener("transitionend", handleTransitionEnd);
    return () => slider.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentIndex, stories.length, cardsToShow]);

  // Debounced navigation
  const handleNavigation = (direction) => {
    const now = Date.now();
    if (now - lastClickTime.current < 400 || isTransitioning.current) return;
    lastClickTime.current = now;
    isTransitioning.current = true;
    setCurrentIndex((prev) => prev + direction);
  };

  const prevSlide = () => handleNavigation(-1);
  const nextSlide = () => handleNavigation(1);

  const goToSlide = (index) => {
    const now = Date.now();
    if (now - lastClickTime.current < 400 || isTransitioning.current) return;
    lastClickTime.current = now;
    isTransitioning.current = true;
    setCurrentIndex(index + stories.length);
  };

  const renderStars = (rating) => "★".repeat(rating);

  return (
    <section className="bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-8 text-blue-900 tracking-tight">
          हमारे खुश ग्राहक | Our Happy Customers
        </h2>
        <div className="relative max-w-5xl mx-auto">
          {/* Slider Container */}
          <div className="overflow-hidden">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-400 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
              }}
            >
              {extendedStories.map((story, index) => (
                <div
                  key={index}
                  className={`px-2 flex-shrink-0 w-full sm:w-1/2 lg:w-1/${cardsToShow}`}
                >
                  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-64 max-w-sm mx-auto transform hover:scale-105 hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 rounded-full border-2 border-blue-300 overflow-hidden">
                        <img
                          src={story.image}
                          alt={story.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <h3 className="text-base font-semibold text-blue-900 text-center mb-1 line-clamp-1">
                      {story.title}
                    </h3>
                    <p className="text-gray-500 text-xs text-center mb-2">
                      {story.location}
                    </p>
                    <div className="text-center text-yellow-400 text-sm mb-2">
                      {renderStars(story.rating)}
                    </div>
                    <p className="text-gray-600 text-xs text-center mb-3 line-clamp-2 flex-grow">
                      "{story.description}"
                    </p>
                    <div className="flex flex-wrap justify-center gap-1">
                      {story.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-blue-100 text-blue-700 px-1.5 py-0.5 text-[10px] rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-800 text-white p-2.5 rounded-full hover:bg-blue-600 transition-colors -ml-5 z-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-4 h-4"
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
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-800 text-white p-2.5 rounded-full hover:bg-blue-600 transition-colors -mr-5 z-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Next testimonial"
          >
            <svg
              className="w-4 h-4"
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
          {/* Navigation Dots */}
          <div className="flex justify-center mt-4 space-x-1.5">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentIndex % stories.length === index
                    ? "bg-blue-800"
                    : "bg-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerStories;