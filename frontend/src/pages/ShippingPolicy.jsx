// import { Helmet } from "react-helmet-async";
// import { FaRegSmileBeam, FaRegEnvelope, FaTruck } from "react-icons/fa";

// const ShippingPolicy = () => (
//   <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-20 px-4 sm:px-6 lg:px-8">
//     <Helmet>
//       <title>Andes Laundry - Shipping Policy</title>
//       <meta name="description" content="Read Andes Laundry's customer-friendly shipping policy." />
//     </Helmet>
//     <div className="max-w-3xl mx-auto">
//       {/* Header */}
//       <div className="text-center mb-20 animate-fade-in">
//         <FaTruck className="mx-auto text-5xl text-blue-600 mb-4" />
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Shipping Policy</h1>
//         <p className="text-lg text-gray-600 italic">
//           At Andes, we strive to deliver your orders promptly and reliably.<br />
//           Our Shipping Policy outlines the process for delivering your laundry services.
//         </p>
//         <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
//       </div>

//       {/* Policy Content */}
//       <div className="bg-white rounded-xl shadow p-6 md:p-8 text-gray-700 leading-relaxed space-y-6">
//         <p>
//           The orders for the user are shipped through registered domestic courier companies and/or speed post only. Orders are shipped within 1 days from the date of the order and/or payment or as per the delivery date agreed at the time of order confirmation and delivering of the shipment, subject to courier company / post office norms. Platform Owner shall not be liable for any delay in delivery by the courier company / postal authority. Delivery of all orders will be made to the address provided by the buyer at the time of purchase. Delivery of our services will be confirmed on your email ID as specified at the time of registration. If there are any shipping cost(s) levied by the seller or the Platform Owner (as the case be), the same is not refundable.
//         </p>
//       </div>

//       {/* Contact & Footer */}
//       <section className="bg-blue-100 rounded-2xl py-8 px-4 text-center mt-10">
//         <FaRegEnvelope className="mx-auto text-3xl text-blue-600 mb-2" />
//         <p className="text-gray-700 mb-4">
//           For any shipping queries, please contact our customer service team at{" "}
//           <a href="mailto:care@andes.co.in" className="text-blue-600 underline">care@andes.co.in</a>.
//         </p>
//         <p className="text-gray-500">We’re here to ensure your experience is smooth and worry-free.</p>
//       </section>

//       {/* Animation */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in {
//           animation: fadeIn 0.8s ease-out;
//         }
//       `}</style>
//     </div>
//   </div>
// );

// export default ShippingPolicy;

import { Helmet } from "react-helmet-async";
import { FaTruck, FaRegEnvelope, FaRegClock, FaMapMarkerAlt, FaCheckCircle, FaRupeeSign } from "react-icons/fa";
const ShippingPolicy = () => (
  <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-20 px-4 sm:px-6 lg:px-8">
    <Helmet>
      <title>Andes Laundry - Shipping Policy</title>
      <meta name="description" content="Read Andes Laundry's customer-friendly shipping policy." />
    </Helmet>
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16 animate-fade-in">
        <FaTruck className="mx-auto text-5xl text-blue-600 mb-4" />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Shipping Policy</h1>
        <p className="text-lg text-gray-600 italic">
          Effective Date: 17th August 2025
        </p>
        <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
        <p className="mt-4 text-blue-500 font-medium">
          Andes – India’s fastest laundry delivery app, ensures your laundry and ironing orders are delivered in the quickest possible time.
        </p>
      </div>

      {/* Policy Content */}
      <div className="bg-white rounded-xl shadow p-6 md:p-8 text-gray-700 leading-relaxed space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-3 flex items-center">
            <FaRegClock className="mr-2" /> Order Processing & Delivery
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-semibold">Ironing Services:</span> Delivered within <span className="text-blue-700 font-bold">48–72 hours</span> of pickup.
            </li>
            <li>
              <span className="font-semibold">Laundry & Dry Cleaning:</span> Delivered within <span className="text-blue-700 font-bold">48–72 hours</span> of pickup, unless otherwise communicated at the time of order confirmation.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-3 flex items-center">
            <FaTruck className="mr-2" /> Delivery Method
          </h2>
          <p>
            All orders are fulfilled by our verified Andes delivery partners.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-3 flex items-center">
            <FaMapMarkerAlt className="mr-2" /> Delivery Location
          </h2>
          <p>
            Orders will be delivered to the address you provide when placing the order on the Andes app/WhatsApp, but should only be in <span className="font-bold text-blue-700">Pune, Maharashtra</span>.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-3 flex items-center">
            <FaRegClock className="mr-2" /> Delays
          </h2>
          <p>
            While we aim for 100% on-time delivery, Andes shall not be liable for delays caused by traffic, weather conditions, or other factors beyond our control.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-3 flex items-center">
            <FaRupeeSign className="mr-2" /> Shipping Costs
          </h2>
          <p>
            Any applicable delivery charges will be shown at checkout. These charges are <span className="font-bold text-blue-700">non-refundable</span>.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-3 flex items-center">
            <FaCheckCircle className="mr-2" /> Confirmation
          </h2>
          <p>
            You will receive an order and delivery confirmation on your registered email ID and WhatsApp number.
          </p>
        </div>
      </div>

      {/* Contact & Footer */}
      <section className="bg-blue-100 rounded-2xl py-8 px-4 text-center mt-10">
        <FaRegEnvelope className="mx-auto text-3xl text-blue-600 mb-2" />
        <p className="text-gray-700 mb-2">
          For any shipping queries, please contact our support team at{" "}
          <a href="mailto:care@andes.co.in" className="text-blue-600 underline">care@andes.co.in</a>
          {" "}or call <a href="tel:+917499413025" className="text-blue-600 underline">+91 74994 13025</a>.
        </p>
        <p className="text-gray-500">We’re here to ensure your experience is smooth and worry-free.</p>
      </section>

      {/* Animation */}
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
  </div>
);

export default ShippingPolicy;