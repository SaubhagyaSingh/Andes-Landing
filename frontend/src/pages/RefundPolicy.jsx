// import { Helmet } from "react-helmet-async";
// import { FaRegSmileBeam, FaRegMoneyBillAlt, FaRegCheckCircle, FaRegClock, FaRegEnvelope } from "react-icons/fa";

// const RefundPolicy = () => (
//   <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-20 px-4 sm:px-6 lg:px-8">
//     <Helmet>
//       <title>Andes Laundry - Refund Policy</title>
//       <meta name="description" content="Read Andes Laundry's customer-friendly refund policy." />
//     </Helmet>
//     <div className="max-w-3xl mx-auto">
//       {/* Header */}
//       <div className="text-center mb-20 animate-fade-in">
//         <FaRegSmileBeam className="mx-auto text-5xl text-blue-600 mb-4" />
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Refund Policy</h1>
//         <p className="text-lg text-gray-600 italic">
//           At Andes, customer satisfaction is our priority.<br />
//           Our Refund Policy outlines how refunds are processed if an issue arises with your order.
//         </p>
//         <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
//       </div>

//       {/* Eligible Refund Scenarios */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
//           <FaRegMoneyBillAlt className="mr-2 text-blue-500" /> Eligible Refund Scenarios
//         </h2>
//         <div className="space-y-6">
//           <div className="bg-white rounded-xl shadow p-5 flex items-start space-x-4 hover:scale-105 transition-transform duration-200">
//             <FaRegCheckCircle className="text-2xl text-green-500 mt-1" />
//             <div>
//               <h3 className="font-semibold text-gray-700">1. Lost or Damaged Clothes</h3>
//               <ul className="list-disc pl-5 text-gray-600">
//                 <li>Eligible for refund up to <span className="font-bold text-blue-700">10 times</span> the processing cost</li>
//                 <li>Additional <span className="font-bold text-blue-700">₹500 credit</span> (if applicable)</li>
//               </ul>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow p-5 flex items-start space-x-4 hover:scale-105 transition-transform duration-200">
//             <FaRegCheckCircle className="text-2xl text-green-500 mt-1" />
//             <div>
//               <h3 className="font-semibold text-gray-700">2. Service Failure or Poor Quality</h3>
//               <ul className="list-disc pl-5 text-gray-600">
//                 <li>If clothes are not cleaned properly and re-cleaning is not possible</li>
//                 <li>Refund will be considered on a case-by-case basis</li>
//               </ul>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow p-5 flex items-start space-x-4 hover:scale-105 transition-transform duration-200">
//             <FaRegCheckCircle className="text-2xl text-green-500 mt-1" />
//             <div>
//               <h3 className="font-semibold text-gray-700">3. Overcharges or Duplicate Payment</h3>
//               <ul className="list-disc pl-5 text-gray-600">
//                 <li>If charged incorrectly, the excess amount will be refunded</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Refund Process */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
//           <FaRegClock className="mr-2 text-blue-500" /> Refund Process
//         </h2>
//         <ol className="list-decimal pl-6 space-y-3 text-gray-700">
//           <li>
//             <span className="font-semibold">Raise a complaint</span> at{" "}
//             <a href="mailto:care@andes.co.in" className="text-blue-600 underline">care@andes.co.in</a> or WhatsApp us <span className="text-gray-500">(within 24 hours of delivery)</span>
//           </li>
//           <li>
//             <span className="font-semibold">Provide order ID, photos (if applicable), and a brief explanation</span>
//           </li>
//           <li>
//             <span className="font-semibold">Approved refunds</span> will be processed within <span className="text-blue-700 font-bold">7 working days</span>
//           </li>
//         </ol>
//       </section>

      

//       {/* Refund Modes */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
//           <FaRegMoneyBillAlt className="mr-2 text-blue-500" /> Refund Modes
//         </h2>
//         <ul className="list-disc pl-6 space-y-2 text-gray-700">
//           <li><span className="font-semibold">App wallet credit</span></li>
//           <li><span className="font-semibold">Direct bank transfer or UPI</span></li>
//           <li><span className="font-semibold">Coupon for future use</span> (based on user preference)</li>
//         </ul>
//       </section>

     

//       {/* Contact & Footer */}
//       <section className="bg-blue-100 rounded-2xl py-8 px-4 text-center">
      
//         <p className="text-gray-500">We’re here to ensure your experience is smooth and worry-free.</p>
//       </section>
//     </div>
//     {/* Animation */}
//     <style jsx>{`
//       @keyframes fadeIn {
//         from { opacity: 0; transform: translateY(20px);}
//         to { opacity: 1; transform: translateY(0);}
//       }
//       .animate-fade-in {
//         animation: fadeIn 0.8s ease-out;
//       }
//     `}</style>
//   </div>
// );

// export default RefundPolicy;

// import { Helmet } from "react-helmet-async";
// import { FaRegSmileBeam, FaRegEnvelope } from "react-icons/fa";

// const RefundPolicy = () => (
//   <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-20 px-4 sm:px-6 lg:px-8">
//     <Helmet>
//       <title>Andes Laundry - Refund Policy</title>
//       <meta name="description" content="Read Andes Laundry's customer-friendly refund policy." />
//     </Helmet>
//     <div className="max-w-3xl mx-auto">
//       {/* Header */}
//       <div className="text-center mb-20 animate-fade-in">
//         <FaRegSmileBeam className="mx-auto text-5xl text-blue-600 mb-4" />
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Refund Policy</h1>
//         <p className="text-lg text-gray-600 italic">
//           At Andes, customer satisfaction is our priority.<br />
//           Our Refund Policy outlines how refunds are processed if an issue arises with your order.
//         </p>
//         <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
//       </div>

//       {/* Policy Content */}
//       <div className="bg-white rounded-xl shadow p-6 md:p-8 text-gray-700 leading-relaxed space-y-6">
//         <p>
//           This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service that you have purchased through the Platform. Under this policy:
//         </p>
//         <ul className="list-disc pl-6 space-y-3">
//           <li>
//             Cancellations will only be considered if the request is made 1 days of placing the order. However, cancellation requests may not be entertained if the orders have been communicated to such sellers / merchant(s) listed on the Platform and they have initiated the process of shipping them, or the product is out for delivery. In such an event, you may choose to reject the product at the doorstep.
//           </li>
//           <li>
//             ANDES SERVICES PRIVATE LIMITED does not accept cancellation requests for perishable items like flowers, eatables, etc. However, the refund / replacement can be made if the user establishes that the quality of the product delivered is not good.
//           </li>
//           <li>
//             In case of receipt of damaged or defective items, please report to our customer service team. The request would be entertained once the seller/ merchant listed on the Platform, has checked and determined the same at its own end. This should be reported within 1 days of receipt of products.
//           </li>
//           <li>
//             In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 1 days of receiving the product. The customer service team after looking into your complaint will take an appropriate decision.
//           </li>
//           <li>
//             In case of complaints regarding the products that come with a warranty from the manufacturers, please refer the issue to them.
//           </li>
//           <li>
//             In case of any refunds approved by ANDES SERVICES PRIVATE LIMITED, it will take 1 days for the refund to be processed to you.
//           </li>
//         </ul>
//       </div>

//       {/* Contact & Footer */}
//       <section className="bg-blue-100 rounded-2xl py-8 px-4 text-center mt-10">
//         <FaRegEnvelope className="mx-auto text-3xl text-blue-600 mb-2" />
//         <p className="text-gray-700 mb-4">
//           For any refund or cancellation queries, please contact our customer service team at{" "}
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

// export default RefundPolicy;


import { Helmet } from "react-helmet-async";
import { FaRegSmileBeam, FaRegClock, FaRegEnvelope, FaRegCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const RefundPolicy = () => (
  <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
    <Helmet>
      <title>Andes Laundry - Refund Policy</title>
      <meta name="description" content="Read Andes Laundry's customer-friendly refund policy." />
    </Helmet>
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <FaRegSmileBeam className="mx-auto text-5xl text-blue-600 mb-4" />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Refund & Cancellation Policy</h1>
        <p className="text-lg text-gray-600 italic">
          Effective Date: 17th August 2025
        </p>
        <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
        <p className="mt-4 text-blue-500 font-medium">
          At Andes, customer satisfaction is our priority.<br />
          Our policy ensures fair cancellation and refund practices for all laundry and ironing services.
        </p>
      </div>

      {/* Cancellation Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaExclamationTriangle className="mr-2 text-yellow-500" /> Cancellation
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            Orders can be cancelled within <span className="font-semibold text-blue-700">30 minutes</span> of placing the request, provided pickup has not been initiated.
          </li>
          <li>
            Once the rider has been assigned or the laundry is picked up, cancellation will not be possible.
          </li>
        </ul>
      </section>

      {/* Refunds Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaRegCheckCircle className="mr-2 text-green-500" /> Refunds
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            Refunds are approved in cases where services are not rendered as promised (e.g., damaged/lost clothes after confirmation).
          </li>
          <li>
            Refund requests must be made within <span className="font-semibold text-blue-700">2 days of order completion</span>.
          </li>
          <li>
            Once approved, refunds will be credited within <span className="font-semibold text-blue-700">7 business days (168hrs)</span> to your original payment method.
          </li>
        </ul>
      </section>

      {/* Exemptions Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaExclamationTriangle className="mr-2 text-yellow-500" /> Exemptions
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <span className="font-semibold">Delicate Clothing</span> (silk, wool, leather, designer wear) is excluded from refund unless the issue is caused due to Andes’ mishandling.
          </li>
        </ul>
      </section>

      {/* Contact & Footer */}
      <section className="bg-blue-100 rounded-2xl py-8 px-4 text-center">
        <FaRegEnvelope className="mx-auto text-3xl text-blue-600 mb-2" />
        <p className="text-lg text-gray-700 mb-2">
          For any refund or cancellation queries, please contact our support team at{" "}
          <a href="mailto:care@andes.co.in" className="text-blue-600 underline">care@andes.co.in</a>.
        </p>
        <p className="text-gray-500">We’re here to ensure your experience is smooth and worry-free.</p>
      </section>
    </div>
    {/* Animation */}
    <style jsx>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px);}
        to { opacity: 1; transform: translateY(0);}
      }
      .animate-fade-in {
        animation: fadeIn 0.8s ease-out;
      }
    `}</style>
  </div>
);

export default RefundPolicy;