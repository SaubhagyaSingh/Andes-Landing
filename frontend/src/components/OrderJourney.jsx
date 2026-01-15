import { useState } from "react";
import { FaMobileAlt, FaBell, FaMapMarkerAlt, FaUserCheck, FaSortAmountDown, FaBroom, FaEye, FaTruck } from "react-icons/fa";

const OrderJourney = () => {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      title: "Place Order",
      icon: <FaMobileAlt />,
      summary: "Select your service in the Andes app.",
      details: (
        <div>
          <p>You open the Andes app, choose the service (Wash & Fold, Wash & Iron, or Dry Cleaning), and place the order. It takes less than a minute — and just like that, we're on it.</p>
        </div>
      ),
    },
    {
      title: "Order Received",
      icon: <FaBell />,
      summary: "Unique Order ID generated instantly.",
      details: (
        <div>
          <p>Our system immediately generates a unique Order ID and sends it to our internal system and Rider App. This Order ID helps track your clothes every step of the way.</p>
        </div>
      ),
    },
    {
      title: "Rider Notified",
      icon: <FaMapMarkerAlt />,
      summary: "Pickup details sent to our rider.",
      details: (
        <div>
          <p>Our rider receives a notification with:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Your pickup address</li>
            <li>Type of service selected</li>
            <li>Special instructions (if any)</li>
          </ul>
          <p className="mt-2">The pickup is now live.</p>
        </div>
      ),
    },
    {
      title: "Pickup",
      icon: <FaUserCheck />,
      summary: "Rider counts, weighs, and photographs clothes.",
      details: (
        <div>
          <p>Our Andes rider reaches your home at the scheduled time, wearing gloves and a mask for hygiene. They:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Count your clothes</li>
            <li>Weigh the laundry</li>
            <li>Click photos to record the condition before cleaning</li>
          </ul>
          <p className="mt-2">They’ll politely confirm everything with you before sealing the bag.</p>
        </div>
      ),
    },
    {
      title: "Sorting",
      icon: <FaSortAmountDown />,
      summary: "Color-coded strings for service tracking.",
      details: (
        <div>
          <p>Your clothes are taken to the nearest Andes laundry hub, where our trained team begins the magic behind the scenes. But before any cleaning starts, we go through one of the most important steps: Sorting.</p>
          <p className="mt-4 font-semibold">👕 Color-Coded String Tagging System</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>
              Each customer’s bag is tied with a specific colored string the moment it arrives. This color depends on the type of service you selected:
              <ul className="list-disc pl-6 mt-2">
                <li>🔴 Red – Wash & Fold</li>
                <li>🔵 Blue – Wash & Iron</li>
                <li>🟢 Green – Dry Cleaning</li>
              </ul>
            </li>
            <li>This string stays with your laundry throughout the process — from sorting to washing to packing — so your clothes are always identifiable.</li>
            <li>
              Even when multiple bags arrive together, our staff double-checks each order based on:
              <ul className="list-disc pl-6 mt-2">
                <li>Order ID</li>
                <li>Photos taken during pickup</li>
                <li>Type and number of clothes</li>
              </ul>
              <p>This helps them mentally map which clothes belong to which customer.</p>
            </li>
            <li>Your bag is then sent to the appropriate service zone (Wash & Fold, Wash & Iron, or Dry Cleaning), and the rest of the process follows our strict cleaning SOP — customized for fabric care and stain treatment.</li>
          </ol>
        </div>
      ),
    },
    {
      title: "Cleaning",
      icon: <FaBroom />,
      summary: "Processed per our detailed SOP.",
      details: (
        <div>
          <p>From here, your clothes are cleaned following our detailed Standard Operating Procedures (SOP) customized for fabric care and stain treatment, as described in the sections above.</p>
        </div>
      ),
    },
    {
      title: "Tracking",
      icon: <FaEye />,
      summary: "Real-time updates in the app.",
      details: (
        <div>
          <p>You can track your order status in the app — from "Picked Up" to "In Cleaning" to "Ready for Delivery." No guessing games. Just clarity and updates.</p>
        </div>
      ),
    },
    {
      title: "Delivery",
      icon: <FaTruck />,
      summary: "Fresh clothes delivered to your door.",
      details: (
        <div>
          <p>Once your clothes are:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Cleaned to perfection</li>
            <li>Folded or pressed neatly</li>
            <li>Packed in fresh plastic with the Andes tag</li>
          </ul>
          <p className="mt-2">Our rider gets notified and comes to deliver your clothes back — fresh, clean, and beautifully presented.</p>
        </div>
      ),
    },
    {
      title: "Order Completed",
      icon: <FaTruck />,
      summary: "Rate and reorder with ease.",
      details: (
        <div>
          <p>Once the clothes are delivered, the order is marked as "Completed" in the app. You can:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Rate your experience</li>
            <li>View order details anytime</li>
            <li>Reorder easily with one tap</li>
          </ul>
        </div>
      ),
    },
  ];

  const handleToggle = (index) => {
    setActiveStep(activeStep === index ? null : index);
  };

  return (
    <section className="mb-16">
      <div className="flex items-center mb-6">
        <FaTruck className="text-3xl text-blue-600 mr-3" />
        <h2 className="text-3xl font-bold text-gray-800">Your Order Journey</h2>
      </div>
      <p className="text-lg text-gray-600 mb-6 font-medium">From App to Doorstep</p>
      <div className="relative">
        <div className="absolute left-5 top-0 h-full w-1 bg-gradient-to-b from-blue-200 to-blue-400"></div>
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start mb-8 relative cursor-pointer group"
            onClick={() => handleToggle(index)}
            onMouseEnter={() => setActiveStep(index)}
            onMouseLeave={() => setActiveStep(null)}
          >
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center z-10 group-hover:bg-blue-700 transition-all duration-300">
              {step.icon}
            </div>
            <div className="ml-6 w-full">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <span className="text-sm text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {activeStep === index ? "Hide Details" : "Show Details"}
                </span>
              </div>
              <p className="text-gray-600">{step.summary}</p>
              <div
                className={`mt-4 text-gray-600 bg-blue-50 p-4 rounded-lg transition-all duration-300 overflow-y-auto ${
                  activeStep === index ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {step.details}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderJourney;