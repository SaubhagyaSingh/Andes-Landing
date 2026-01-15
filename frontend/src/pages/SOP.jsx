import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaTshirt, FaSpa, FaShower, FaSoap, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import OrderJourney from "../components/OrderJourney"; // Import the new component

const SOP = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 mt-16">
      <Helmet>
        <title>Andes Laundry - Cleaning Process</title>
        <meta name="description" content="Explore Andes Laundry's modern, eco-friendly cleaning process designed to care for your clothes." />
      </Helmet>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Andes Laundry SOP
          </h1>
          <p className="text-xl text-gray-600 italic">
            Where Your Clothes Get the VIP Treatment! ✨
          </p>
          <div className="mt-4 h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Wash & Fold */}
        <section className="mb-16 bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center mb-4">
            <FaTshirt className="text-3xl text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Wash & Fold</h2>
          </div>
          <p className="text-lg text-gray-600 mb-4 font-medium">Gentle Care for Everyday Favorites</p>
          <p className="text-gray-500 mb-6">
            Your t-shirts, pajamas, and gym wear deserve love. We handle them with precision and care, ensuring they come back soft and fresh.
          </p>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">How It Works:</h3>
          <div className="grid gap-4">
            {[
              { step: "Sorting", desc: "Sorted by fabric and color to prevent damage." },
              { step: "Stain Check", desc: "Pre-treated with eco-friendly stain removers." },
              { step: "Washing", desc: "51-minute cycle with precise detergent dosing." },
              { step: "Rewash", desc: "Stubborn stains? We rewash until perfect." },
              { step: "Drying", desc: "Air-dried or 30-minute low-heat drying." },
              { step: "Folding", desc: "Neatly folded with care and attention." },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <FaCheckCircle className="text-green-500 mt-1" />
                <div>
                  <strong className="text-gray-700">{item.step}:</strong>
                  <span className="text-gray-600"> {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Wash & Iron */}
        <section className="mb-16 bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center mb-4">
            <FaSpa className="text-3xl text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Wash & Iron</h2>
          </div>
          <p className="text-lg text-gray-600 mb-4 font-medium">Crisp and Ready to Impress</p>
          <p className="text-gray-500 mb-6">
            Perfect for shirts, dresses, and uniforms. We ensure every garment is wrinkle-free and presentation-ready.
          </p>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">How It Works:</h3>
          <div className="grid gap-4">
            {[
              { step: "Sorting", desc: "Grouped by fabric and care needs." },
              { step: "Stain Patrol", desc: "Targeted stain treatment without harsh chemicals." },
              { step: "Smart Wash", desc: "51-minute cycle with 20ml detergent per kg." },
              { step: "Rewash", desc: "Second check for flawless results." },
              { step: "Drying", desc: "Gentle air-dry or low-heat dryer." },
              { step: "Ironing", desc: "Pressed to perfection for a sharp look." },
              { step: "Packing", desc: "Folded or hung for your convenience." },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <FaCheckCircle className="text-green-500 mt-1" />
                <div>
                  <strong className="text-gray-700">{item.step}:</strong>
                  <span className="text-gray-600"> {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dry Cleaning */}
        <section className="mb-16 bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center mb-4">
            <FaShower className="text-3xl text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Dry Cleaning</h2>
          </div>
          <p className="text-lg text-gray-600 mb-4 font-medium">Luxury Care for Delicate Garments</p>
          <p className="text-gray-500 mb-6">
            Suits, sarees, and wedding outfits get the royal treatment with our gentle, solvent-based cleaning.
          </p>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">How It Works:</h3>
          <div className="grid gap-4">
            {[
              { step: "Loading", desc: "Carefully placed in specialized machines." },
              { step: "Solvent Cleaning", desc: "Safe solvents lift dirt and stains." },
              { step: "Air-Drying", desc: "Gentle drying in a ventilated space." },
              { step: "Steaming", desc: "Hand-pressed for a pristine finish." },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <FaCheckCircle className="text-green-500 mt-1" />
                <div>
                  <strong className="text-gray-700">{item.step}:</strong>
                  <span className="text-gray-600"> {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Products We Use */}
        <section className="mb-16 bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center mb-4">
            <FaSoap className="text-3xl text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Our Products</h2>
          </div>
          <p className="text-lg text-gray-600 mb-4 font-medium">Eco-Friendly and Skin-Safe</p>
          <p className="text-gray-500 mb-6">
            We use premium, fabric-friendly products to ensure your clothes are clean, soft, and safe for your skin.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "Surf Excel Matic Liquid", desc: "Tough on stains, gentle on fabrics." },
              { name: "Alliance Classic Detergent Powder", desc: "Fresh scent for heavy loads." },
              { name: "ComfortFabric Conditioner", desc: "Soft, static-free finish." },
            ].map((product, index) => (
              <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-gray-700">{product.name}</p>
                <p className="text-gray-600 text-sm">{product.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Order Journey */}
        <OrderJourney />

        {/* Footer */}
        <section className="text-center py-12 bg-blue-100 rounded-2xl">
          <p className="text-lg text-gray-700 mb-4 px-4 font-medium">
            At Andes, we don’t just clean clothes — we build trust. Your wardrobe is our priority, and we’re committed to delivering freshness every time.✨
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://www.andes.co.in" className="text-blue-600 hover:underline font-medium">
              Visit Website
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.andes.laundry" className="text-blue-600 hover:underline font-medium">
              Download App
            </a>
          </div>
          <button
            onClick={() => navigate("/working")}
            className="flex items-center mx-auto bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Back to Working
          </button>
        </section>
      </div>

      {/* Tailwind Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SOP;