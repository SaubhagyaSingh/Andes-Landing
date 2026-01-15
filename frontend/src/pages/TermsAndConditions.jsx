// import React from 'react';
// import { Helmet } from 'react-helmet-async';
// import {
//   FaClock, FaTruck, FaShieldAlt, FaRedo, FaTshirt, FaBoxOpen,
//   FaTags, FaCreditCard, FaPhone, FaBalanceScale, FaGavel, FaCheckCircle, FaEnvelope
// } from 'react-icons/fa';

// const TermsAndConditions = () => {
//   return (
//     <>
//       <Helmet>
//         <title>Andes Laundry - Terms & Conditions</title>
//         <meta name="description" content="Read our terms and conditions for using Andes Laundry services." />
//       </Helmet>

//       <div className="max-w-3xl mx-auto px-4 py-10 font-sans">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-2">
//             Andes Terms & Conditions
//           </h1>
//           <p className="text-lg text-gray-600">
//             Last Updated: 31st July 2025
//           </p>
//           <div className="mt-3 h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
//         </div>

//         {/* Introduction */}
//         <div className="bg-indigo-50 rounded-xl p-6 mb-8 text-indigo-800 text-center">
//           By using Andes services, you agree to the following Terms & Conditions. These apply to all services, including laundry, dry cleaning, and pick-up/drop.
//         </div>

//         {/* Terms List */}
//         <div className="space-y-8">
//           {/* 1. Service Timelines */}
//           <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
//             <div className="flex-shrink-0">
//               <div className="bg-indigo-100 p-4 rounded-full">
//                 <FaClock className="text-indigo-600 text-2xl" />
//               </div>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Service Timelines</h3>
//               <ul className="list-disc pl-5 space-y-2 text-gray-700">
//                 <li>Standard delivery within <span className="font-medium">48 hours</span></li>
//                 <li>Urgent delivery upon request <span className="text-gray-500">(charges may apply)</span></li>
//               </ul>
//             </div>
//           </div>

//           {/* 2. Pick-up & Delivery */}
//           <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
//             <div className="flex-shrink-0">
//               <div className="bg-indigo-100 p-4 rounded-full">
//                 <FaTruck className="text-indigo-600 text-2xl" />
//               </div>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Pick-up & Delivery</h3>
//               <ul className="list-disc pl-5 space-y-2 text-gray-700">
//                 <li>Free for orders above <span className="font-medium">₹300</span></li>
//                 <li>Identity verification required for delivery if bill is missing</li>
//               </ul>
//             </div>
//           </div>

//           {/* 3. Damage or Loss */}
//           <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
//             <div className="flex-shrink-0">
//               <div className="bg-indigo-100 p-4 rounded-full">
//                 <FaShieldAlt className="text-indigo-600 text-2xl" />
//               </div>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Damage or Loss</h3>
//               <ul className="list-disc pl-5 space-y-2 text-gray-700">
//                 <li>Up to <span className="font-medium">10x processing cost refund</span></li>
//                 <li><span className="font-medium">₹500 app credit</span> (if applicable)</li>
//                 <li>Claims must be made within <span className="font-medium">24 hours of delivery</span></li>
//               </ul>
//             </div>
//           </div>

//           {/* 4. Re-cleaning Policy */}
//           <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
//             <div className="flex-shrink-0">
//               <div className="bg-indigo-100 p-4 rounded-full">
//                 <FaRedo className="text-indigo-600 text-2xl" />
//               </div>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">4. Re-cleaning Policy</h3>
//               <ul className="list-disc pl-5 space-y-2 text-gray-700">
//                 <li>If dissatisfied, Andes will <span className="font-medium">re-clean for free</span> (report within 24 hours).</li>
//               </ul>
//             </div>
//           </div>

//           {/* 5. Garment Care */}
//           <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
//             <div className="flex-shrink-0">
//               <div className="bg-indigo-100 p-4 rounded-full">
//                 <FaTshirt className="text-indigo-600 text-2xl" />
//               </div>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">5. Garment Care</h3>
//               <ul className="list-disc pl-5 space-y-2 text-gray-700">
//                 <li>Not liable for:
//                   <ul className="list-circle pl-5 mt-1 space-y-1">
//                     <li>Color bleeding, shrinkage, fabric defects</li>
//                     <li>Embroidery, buttons, or embellishment damage</li>
//                   </ul>
//                 </li>
//                 <li>Articles accepted at <span className="font-medium">customer's risk</span></li>
//               </ul>
//             </div>
//           </div>

//           {/* 6. Lost Items */}
//           <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
//             <div className="flex-shrink-0">
//               <div className="bg-indigo-100 p-4 rounded-full">
//                 <FaBoxOpen className="text-indigo-600 text-2xl" />
//               </div>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">6. Lost Items</h3>
//               <ul className="list-disc pl-5 space-y-2 text-gray-700">
//                 <li>Clothes unclaimed after <span className="font-medium">15 days</span> will not be stored</li>
//                 <li>Andes is not liable for lost personal belongings in garments</li>
//               </ul>
//             </div>
//           </div>

//           {/* 7. Custom Pricing */}
//           <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
//             <div className="flex-shrink-0">
//               <div className="bg-indigo-100 p-4 rounded-full">
//                 <FaTags className="text-indigo-600 text-2xl" />
//               </div>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">7. Custom Pricing</h3>
//               <p className="text-gray-700">
//                 Designer or delicate wear may be priced based on material complexity.
//               </p>
//             </div>
//           </div>

//           {/* 8. Payments */}
//           <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
//             <div className="flex-shrink-0">
//               <div className="bg-indigo-100 p-4 rounded-full">
//                 <FaCreditCard className="text-indigo-600 text-2xl" />
//               </div>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">8. Payments</h3>
//               <ul className="list-disc pl-5 space-y-2 text-gray-700">
//                 <li>Payment is mandatory before delivery</li>
//                 <li>Modes: Online, UPI, App wallet, or cash</li>
//                 <li>Refunds will follow Andes' <a href="/refund-policy" className="text-indigo-600 underline">refund policy</a></li>
//               </ul>
//             </div>
//           </div>

//           {/* 9. Communication Consent */}
//           <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
//             <div className="flex-shrink-0">
//               <div className="bg-indigo-100 p-4 rounded-full">
//                 <FaPhone className="text-indigo-600 text-2xl" />
//               </div>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">9. Communication Consent</h3>
//               <p className="text-gray-700 mb-2">
//                 By using Andes, you agree to receive messages and offers via:
//               </p>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">WhatsApp</span>
//                 <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Email</span>
//                 <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">SMS</span>
//                 <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Phone</span>
//               </div>
//             </div>
//           </div>

//           {/* 10. Legal */}
//           <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
//             <div className="flex-shrink-0">
//               <div className="bg-indigo-100 p-4 rounded-full">
//                 <FaBalanceScale className="text-indigo-600 text-2xl" />
//               </div>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">10. Legal</h3>
//               <ul className="list-disc pl-5 space-y-2 text-gray-700">
//                 <li>Max liability: <span className="font-medium">₹3000 or 10x item cost, whichever is lower</span></li>
//                 <li>Jurisdiction: <span className="font-medium">Pune, Maharashtra</span></li>
//                 <li>Terms may change anytime without prior notice</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Acceptance Section */}
//         <div className="mt-12 p-6 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
//           <FaCheckCircle className="mx-auto text-3xl text-indigo-600 mb-2" />
//           <h3 className="text-xl font-semibold text-indigo-800 mb-2">Acceptance of Terms</h3>
//           <p className="text-indigo-700">
//             By using Andes services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TermsAndConditions;

// import React from 'react';
// import { Helmet } from 'react-helmet-async';
// import { FaCheckCircle } from 'react-icons/fa';

// const TermsAndConditions = () => {
//   return (
//     <>
//       <Helmet>
//         <title>Andes Laundry - Terms & Conditions</title>
//         <meta name="description" content="Read our terms and conditions for using Andes Laundry services." />
//       </Helmet>

//       <div className="max-w-3xl mx-auto px-4 py-10 font-sans">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-2">
//             Andes Terms & Conditions
//           </h1>
//           <p className="text-lg text-gray-600">
//             Last Updated: 31st July 2025
//           </p>
//           <div className="mt-3 h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
//         </div>

//         {/* Terms Content */}
//         <div className="bg-white rounded-xl p-6 mb-8 text-gray-700 leading-relaxed space-y-6">
//           <p>
//             This document is an electronic record in terms of Information Technology Act, 2000 and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.
//           </p>
//           <p>
//             This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of domain name <a href="https://www.andes.co.in" className="text-indigo-600 underline">https://www.andes.co.in</a> ('Website'), including the related mobile site and mobile application (hereinafter referred to as 'Platform').
//           </p>
//           <p>
//             The Platform is owned by ANDES SERVICES PRIVATE LIMITED, a company incorporated under the Companies Act, 1956 with its registered office at Rohan abhilasha wagholi pune maharashtra 412207 (hereinafter referred to as ‘Platform Owner’, 'we', 'us', 'our').
//           </p>
//           <p>
//             Your use of the Platform and services and tools are governed by the following terms and conditions (“Terms of Use”) as applicable to the Platform including the applicable policies which are incorporated herein by way of reference. If You transact on the Platform, You shall be subject to the policies that are applicable to the Platform for such transaction. By mere use of the Platform, You shall be contracting with the Platform Owner and these terms and conditions including the policies constitute Your binding obligations, with Platform Owner. These Terms of Use relate to your use of our website, goods (as applicable) or services (as applicable) (collectively, 'Services'). Any terms and conditions proposed by You which are in addition to or which conflict with these Terms of Use are expressly rejected by the Platform Owner and shall be of no force or effect. These Terms of Use can be modified at any time without assigning any reason. It is your responsibility to periodically review these Terms of Use to stay informed of updates.
//           </p>
//           <p>
//             For the purpose of these Terms of Use, wherever the context so requires ‘you’, 'your' or ‘user’ shall mean any natural or legal person who has agreed to become a user/buyer on the Platform.
//           </p>
//           <p className="font-bold uppercase">
//             ACCESSING, BROWSING OR OTHERWISE USING THE PLATFORM INDICATES YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE, SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE PROCEEDING.
//           </p>
//           <p>
//             The use of Platform and/or availing of our Services is subject to the following Terms of Use:
//           </p>
//           <ol className="list-decimal pl-6 space-y-4">
//             <li>
//               To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account on the Platform.
//             </li>
//             <li>
//               Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
//             </li>
//             <li>
//               Your use of our Services and the Platform is solely and entirely at your own risk and discretion for which we shall not be liable to you in any manner. You are required to independently assess and ensure that the Services meet your requirements.
//             </li>
//             <li>
//               The contents of the Platform and the Services are proprietary to us and are licensed to us. You will not have any authority to claim any intellectual property rights, title, or interest in its contents. The contents includes and is not limited to the design, layout, look and graphics.
//             </li>
//             <li>
//               You acknowledge that unauthorized use of the Platform and/or the Services may lead to action against you as per these Terms of Use and/or applicable laws.
//             </li>
//             <li>
//               You agree to pay us the charges associated with availing the Services.
//             </li>
//             <li>
//               You agree not to use the Platform and/ or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you.
//             </li>
//             <li>
//               You agree and acknowledge that website and the Services may contain links to other third party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third party websites. These links are provided for your convenience for provide further information.
//             </li>
//             <li>
//               You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with the Platform Owner for the Services.
//             </li>
//             <li>
//               You shall indemnify and hold harmless Platform Owner, its affiliates, group companies (as applicable) and their respective officers, directors, agents, and employees, from any claim or demand, or actions including reasonable attorney's fees, made by any third party or penalty imposed due to or arising out of Your breach of this Terms of Use, privacy Policy and other Policies, or Your violation of any law, rules or regulations or the rights (including infringement of intellectual property rights) of a third party.
//             </li>
//             <li>
//               Notwithstanding anything contained in these Terms of Use, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.
//             </li>
//             <li>
//               These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India.
//             </li>
//             <li>
//               All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Sanaswadi and Maharashtra.
//             </li>
//             <li>
//               All concerns or communications relating to these Terms must be communicated to us using the contact information provided on this website.
//             </li>
//           </ol>
//         </div>

//         {/* Acceptance Section */}
//         <div className="mt-12 p-6 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
//           <FaCheckCircle className="mx-auto text-3xl text-indigo-600 mb-2" />
//           <h3 className="text-xl font-semibold text-indigo-800 mb-2">Acceptance of Terms</h3>
//           <p className="text-indigo-700">
//             By using Andes services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TermsAndConditions;



import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaCheckCircle, FaUserShield, FaClock, FaClipboardList, FaRupeeSign, FaExclamationTriangle, FaBalanceScale, FaGavel } from 'react-icons/fa';

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Andes Laundry - Terms & Conditions</title>
        <meta name="description" content="Read our terms and conditions for using Andes Laundry services." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-10 font-sans">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">
            Andes Terms & Conditions
          </h1>
          <p className="text-lg text-gray-600">
            Effective Date: 17th August 2025
          </p>
          <div className="mt-3 h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-base text-blue-500">
            Welcome to Andes (<span className="font-semibold">andes.co.in</span>) – your trusted laundry and ironing partner.<br />
            By using our services, you agree to the following terms:
          </p>
        </div>

        {/* Terms List */}
        <div className="space-y-8">
          {/* 1. Account & Information */}
          <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex-shrink-0">
              <div className="bg-blue-100 p-4 rounded-full">
                <FaUserShield className="text-blue-600 text-2xl" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Account & Information</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>You must provide accurate details (name, address, contact number) when placing an order.</li>
                <li>You are responsible for maintaining the confidentiality of your account.</li>
              </ul>
            </div>
          </div>

          {/* 2. Service Commitment */}
          <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex-shrink-0">
              <div className="bg-blue-100 p-4 rounded-full">
                <FaClock className="text-blue-600 text-2xl" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Service Commitment</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Ironing, Laundry & Dry Cleaning within <span className="font-semibold">48–72 hours</span> of pickup.</li>
                <li>While Andes strives for punctuality, unforeseen delays (traffic, weather, technical issues) may occur.</li>
              </ul>
            </div>
          </div>

          {/* 3. User Responsibility */}
          <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex-shrink-0">
              <div className="bg-blue-100 p-4 rounded-full">
                <FaClipboardList className="text-blue-600 text-2xl" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">3. User Responsibility</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Customers are responsible for checking clothing care instructions before giving items for processing.</li>
                <li>Andes will not be liable for damage to garments with pre-existing defects, weak fabrics, or incorrect labeling.</li>
              </ul>
            </div>
          </div>

          {/* 4. Charges & Payments */}
          <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex-shrink-0">
              <div className="bg-blue-100 p-4 rounded-full">
                <FaRupeeSign className="text-blue-600 text-2xl" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">4. Charges & Payments</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>All service charges are visible on the app/website before checkout.</li>
                <li>Payments once made are subject to the Refund Policy stated above.</li>
              </ul>
            </div>
          </div>

          {/* 5. Liability */}
          <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex-shrink-0">
              <div className="bg-blue-100 p-4 rounded-full">
                <FaExclamationTriangle className="text-blue-600 text-2xl" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">5. Liability</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Andes’ maximum liability in case of damaged or lost garments shall be limited to <span className="font-semibold">5 times the service charge of the item or ₹1,000 per order, whichever is lower.</span></li>
              </ul>
            </div>
          </div>

          {/* 6. Force Majeure */}
          <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex-shrink-0">
              <div className="bg-blue-100 p-4 rounded-full">
                <FaBalanceScale className="text-blue-600 text-2xl" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">6. Force Majeure</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Andes shall not be held responsible for delays or non-performance caused by circumstances beyond its control (natural disasters, strikes, technical failures, etc.).</li>
              </ul>
            </div>
          </div>

          {/* 7. Dispute Resolution */}
          <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex-shrink-0">
              <div className="bg-blue-100 p-4 rounded-full">
                <FaGavel className="text-blue-600 text-2xl" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">7. Dispute Resolution</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>These terms shall be governed by the laws of India.</li>
                <li>Any disputes will be subject to the exclusive jurisdiction of Pune, Maharashtra courts.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Acceptance Section */}
        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100 text-center">
          <FaCheckCircle className="mx-auto text-3xl text-blue-600 mb-2" />
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Acceptance of Terms</h3>
          <p className="text-blue-700">
            By using Andes services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;