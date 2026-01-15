import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FeatureLeft from "../components/FeatureLeft";
import FeatureRight from "../components/FeatureRight";
import EnvironmentalFeature from "../components/EnvironmentalFeature";
import QuickCleanFresh from "../components/QuickCleanFresh";
import AboutUsImage from "../assets/aboutus.jpeg";
import CustomerStories from "../components/CustomerStories";
import Schedule from "../components/Schedule";
import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";
import card4 from "../assets/card4.png";
import { Helmet } from "react-helmet-async";
import { FaBroom } from "react-icons/fa";

const bulletPoints1 = [
  { icon: "🔔", text: "Get notified when your order is ready for pick-up" },
  { icon: "⏱️", text: "Schedule collection at your convenience" },
];

const bulletPoints2 = [
  { icon: "📦", text: "Track your delivery in real-time" },
  { icon: "🚪", text: "Know exactly when your laundry will arrive" },
];

const bulletPoints3 = [
  { icon: "📞", text: "24/7 customer support available" },
  { icon: "💬", text: "Reach us via call or chat in the app" },
];

const bulletPoints4 = [
  { icon: "✅", text: "Order scheduled and delivered promptly" },
  { icon: "📦", text: "Enjoy freshly cleaned clothes at your doorstep" },
];

const bulletPointsEnvironmental = [
  { icon: "🍃", text: "Zero-emission delivery vehicles" },
  { icon: "💧", text: "Efficient water use" },
  { icon: "❤️", text: "Trustworthy local cleaners" },
];

const Working = () => {
  const navigate = useNavigate();

  // Animation variants for the button
  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.6,
        repeat: 3,
        ease: "easeInOut",
      },
    },
    hover: { scale: 1.05, boxShadow: "0 4px 15px rgba(0, 0, 255, 0.3)" },
  };

  return (
    <div className="bg-gray-50">
      <Helmet>
        <title>Andes Laundry - Working</title>
        <meta name="description" content="Learn more about Andes Laundry's working process." />
      </Helmet>
      <QuickCleanFresh />

      <div className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FeatureLeft
            title="FLEXIBLE"
            subtitle="1. Schedule Your Collection"
            description="Plan your day with ease. Choose a collection time that fits your schedule. We’ll notify you when the order is ready for pick-up, ensuring smooth coordination."
            imageSrc={card1}
            bulletPoints={bulletPoints1}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FeatureRight
            title="DELIVERY STATUS"
            subtitle="2. Track Your Delivery"
            description="Stay informed about your laundry delivery with real-time tracking. Know exactly when your laundry will arrive at your doorstep, making it easy to plan your day."
            imageSrc={card2}
            bulletPoints={bulletPoints2}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <FeatureLeft
            title="CUSTOMER SUPPORT"
            subtitle="3. Assistance When You Need It"
            description="We're here to help! Whether you have a question about your order or need assistance with our services, our customer support is always ready to assist you."
            imageSrc={card3}
            bulletPoints={bulletPoints3}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <FeatureRight
            title="ORDER COMPLETED"
            subtitle="4. Order Scheduled and Delivered"
            description="Your laundry is handled with care from pick-up to delivery. Enjoy your freshly cleaned clothes delivered right to your door, hassle-free!"
            imageSrc={card4}
            bulletPoints={bulletPoints4}
          />
        </motion.div>

        {/* Dedicated SOP Button Section */}
        <section className="bg-blue-100 py-12 px-4 sm:px-6 lg:px-8 text-center rounded-2xl mx-4 my-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-800 mb-4"
          >
            Explore Our Cleaning Process✨
          </motion.h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Discover how we ensure your clothes are cleaned with precision and care through our detailed Standard Operating Procedures (SOP).
          </p>
          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate={["animate", "pulse"]}
            whileHover="hover"
            onClick={() => navigate("/working/sop")}
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition duration-300"
          >
            <FaBroom className="mr-2" />
            Discover Our Cleaning Process✨
          </motion.button>
        </section>
      </div>

      <EnvironmentalFeature
        title="A CONVENIENT LAUNDRY SOLUTION"
        subtitle="That Helps Protect the Environment"
        description="Our service doesn’t just benefit you—it’s also designed with sustainability in mind. We use zero-emission vehicles for deliveries and efficient water usage to minimize environmental impact."
        bulletPoints={bulletPointsEnvironmental}
        buttonText="About us"
        imageSrc={AboutUsImage}
      />

      <CustomerStories />
      <Schedule />
    </div>
  );
};

export default Working;