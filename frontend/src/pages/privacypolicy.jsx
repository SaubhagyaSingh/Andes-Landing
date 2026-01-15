// import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

// const PrivacyPolicy = () => (
//   <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
//     <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
//       {/* Header */}
//       <div className="bg-blue-600 p-6 md:p-8 text-white text-center">
//         <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
//         <p className="text-blue-100">Effective Date: 13th April 2025</p>
//       </div>

//       {/* Introduction */}
//       <div className="p-6 md:p-8 border-b border-gray-200">
//         <p className="text-gray-700 mb-4">
//           At Andes, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, share, and safeguard the data you provide when using our website (<span className="font-semibold">www.andes.co.in</span>) and services. By accessing our platform, you agree to the practices described herein.
//         </p>
//       </div>

//       {/* Policy Sections */}
//       <div className="divide-y divide-gray-200">
//         {/* 1. Information We Collect */}
//         <div className="p-6 md:p-8">
//           <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
//           <ul className="list-disc pl-6 text-gray-700 space-y-2">
//             <li>
//               <span className="font-semibold">Personal Details:</span> Name, phone number, email, address, and payment information when placing an order or signing up.
//             </li>
//             <li>
//               <span className="font-semibold">Device Data:</span> IP address, browser type, access date/time, and location data.
//             </li>
//             <li>
//               <span className="font-semibold">Cookies & Tracking:</span> We use cookies to personalize your experience and analyze user behavior.
//             </li>
//           </ul>
//         </div>

//         {/* 2. How We Use Your Information */}
//         <div className="p-6 md:p-8">
//           <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">2. How We Use Your Information</h2>
//           <ul className="list-disc pl-6 text-gray-700 space-y-2">
//             <li>Fulfill service requests and process payments</li>
//             <li>Send order updates and promotional offers</li>
//             <li>Improve user experience and website functionality</li>
//             <li>Prevent fraud and resolve customer issues</li>
//           </ul>
//         </div>

//         {/* 3. Sharing of Information */}
//         <div className="p-6 md:p-8">
//           <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">3. Sharing of Information</h2>
//           <ul className="list-disc pl-6 text-gray-700 space-y-2">
//             <li>We do not sell your personal information.</li>
//             <li>Information may be shared with internal staff or affiliates for order processing and customer support.</li>
//             <li>Data may be disclosed if required by law, or in cases of merger/acquisition.</li>
//           </ul>
//         </div>

//         {/* 4. Security Practices */}
//         <div className="p-6 md:p-8">
//           <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">4. Security Practices</h2>
//           <p className="text-gray-700">
//             We implement secure servers, encryption, and firewalls to protect your information from unauthorized access or misuse.
//           </p>
//         </div>

//         {/* 5. Your Rights & Choices */}
//         <div className="p-6 md:p-8">
//           <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">5. Your Rights & Choices</h2>
//           <ul className="list-disc pl-6 text-gray-700 space-y-2">
//             <li>You may opt out of marketing emails or messages anytime.</li>
//             <li>You can disable cookies via browser settings (note: this may affect your experience).</li>
//           </ul>
//         </div>

//         {/* 6. Third-party Links */}
//         <div className="p-6 md:p-8">
//           <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">6. Third-party Links</h2>
//           <p className="text-gray-700">
//             Our website may contain links to external sites. We are not responsible for their privacy practices.
//           </p>
//         </div>

//         {/* 7. Consent & Communication */}
//         <div className="p-6 md:p-8">
//           <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">7. Consent & Communication</h2>
//           <p className="text-gray-700">
//             By using our services, you consent to our data collection practices and to receiving updates via Email, SMS, WhatsApp, or phone.
//           </p>
//         </div>

//         {/* 8. Grievance Officer */}
//         <div className="p-6 md:p-8">
//           <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">8. Grievance Officer</h2>
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <div className="flex items-start mb-3">
//               <FiMapPin className="h-5 w-5 text-blue-600 mt-1" />
//               <div className="ml-3">
//                 <p className="font-medium">Mr. Aryan Ramesh Gupta</p>
//                 <p className="text-gray-600">CEO, Andes</p>
//                 <p className="text-gray-600">Survey No. 124, Paud Rd, Kothrud, Pune - 411038</p>
//               </div>
//             </div>
//             <div className="flex items-center mb-3">
//               <FiMail className="h-5 w-5 text-blue-600" />
//               <a href="mailto:care@andes.co.in" className="ml-3 text-blue-600 hover:underline">care@andes.co.in</a>
//             </div>
//             <div className="flex items-center">
//               <FiPhone className="h-5 w-5 text-blue-600" />
//               <a href="tel:+918626076578" className="ml-3 text-blue-600 hover:underline">+91 86260 76578</a>
//             </div>
//             <p className="mt-3 text-gray-500 flex items-center">
//               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                 🕒
//               </span>
//               <span className="ml-2">Everyday, Anytime, Always for You</span>
//             </p>
//           </div>
//         </div>
//       </div>

  
//     </div>
//   </div>
// );

// export default PrivacyPolicy;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 p-6 md:p-8 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-blue-100">Effective Date: 13th April 2025</p>
      </div>

      {/* Policy Content */}
      <div className="p-6 md:p-8 text-gray-700 leading-relaxed space-y-6">
        <p>
          This Privacy Policy describes how ANDES SERVICES PRIVATE LIMITED and its affiliates (collectively "ANDES SERVICES PRIVATE LIMITED, we, our, us") collect, use, share, protect or otherwise process your information/ personal data through our website <a href="https://www.andes.co.in" className="text-blue-600 underline">https://www.andes.co.in</a> (hereinafter referred to as Platform). Please note that you may be able to browse certain sections of the Platform without registering with us. We do not offer any product/service under this Platform outside India and your personal data will primarily be stored and processed in India. By visiting this Platform, providing your information or availing any product/service offered on the Platform, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use and the applicable service/product terms and conditions, and agree to be governed by the laws of India including but not limited to the laws applicable to data protection and privacy. If you do not agree please do not use or access our Platform.
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-3">Collection</h2>
        <p>
          We collect your personal data when you use our Platform, services or otherwise interact with us during the course of our relationship and related information provided from time to time. Some of the information that we may collect includes but is not limited to personal data / information provided to us during sign-up/registering or using our Platform such as name, date of birth, address, telephone/mobile number, email ID and/or any such information shared as proof of identity or address. Some of the sensitive personal data may be collected with your consent, such as your bank account or credit or debit card or other payment instrument information or biometric information such as your facial features or physiological information (in order to enable use of certain features when opted for, available on the Platform) etc all of the above being in accordance with applicable law(s). You always have the option to not provide information, by choosing not to use a particular service or feature on the Platform. We may track your behaviour, preferences, and other information that you choose to provide on our Platform. This information is compiled and analysed on an aggregated basis. We will also collect your information related to your transactions on Platform and such third-party business partner platforms. When such a third-party business partner collects your personal data directly from you, you will be governed by their privacy policies. We shall not be responsible for the third-party business partner’s privacy practices or the content of their privacy policies, and we request you to read their privacy policies prior to disclosing any information. If you receive an email, a call from a person/association claiming to be ANDES SERVICES PRIVATE LIMITED seeking any personal data like debit/credit card PIN, net-banking or mobile banking password, we request you to never provide such information. If you have already revealed such information, report it immediately to an appropriate law enforcement agency.
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-3">Usage</h2>
        <p>
          We use personal data to provide the services you request. To the extent we use your personal data to market to you, we will provide you the ability to opt-out of such uses. We use your personal data to assist sellers and business partners in handling and fulfilling orders; enhancing customer experience; to resolve disputes; troubleshoot problems; inform you about online and offline offers, products, services, and updates; customise your experience; detect and protect us against error, fraud and other criminal activity; enforce our terms and conditions; conduct marketing research, analysis and surveys; and as otherwise described to you at the time of collection of information. You understand that your access to these products/services may be affected in the event permission is not provided to us.
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-3">Sharing</h2>
        <p>
          We may share your personal data internally within our group entities, our other corporate entities, and affiliates to provide you access to the services and products offered by them. These entities and affiliates may market to you as a result of such sharing unless you explicitly opt-out. We may disclose personal data to third parties such as sellers, business partners, third party service providers including logistics partners, prepaid payment instrument issuers, third-party reward programs and other payment opted by you. These disclosure may be required for us to provide you access to our services and products offered to you, to comply with our legal obligations, to enforce our user agreement, to facilitate our marketing and advertising activities, to prevent, detect, mitigate, and investigate fraudulent or illegal activities related to our services. We may disclose personal and sensitive personal data to government agencies or other authorised law enforcement agencies if required to do so by law or in the good faith belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal process. We may disclose personal data to law enforcement offices, third party rights owners, or others in the good faith belief that such disclosure is reasonably necessary to: enforce our Terms of Use or Privacy Policy; respond to claims that an advertisement, posting or other content violates the rights of a third party; or protect the rights, property or personal safety of our users or the general public.
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-3">Security Precautions</h2>
        <p>
          To protect your personal data from unauthorised access or disclosure, loss or misuse we adopt reasonable security practices and procedures. Once your information is in our possession or whenever you access your account information, we adhere to our security guidelines to protect it against unauthorised access and offer the use of a secure server. However, the transmission of information is not completely secure for reasons beyond our control. By using the Platform, the users accept the security implications of data transmission over the internet and the World Wide Web which cannot always be guaranteed as completely secure, and therefore, there would always remain certain inherent risks regarding use of the Platform. Users are responsible for ensuring the protection of login and password records for their account.
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-3">Data Deletion and Retention</h2>
        <p>
          You have an option to delete your account by visiting your profile and settings on our Platform, this action would result in you losing all information related to your account. You may also write to us at the contact information provided below to assist you with these requests. We may in event of any pending grievance, claims, pending shipments or any other services we may refuse or delay deletion of the account. Once the account is deleted, you will lose access to the account. We retain your personal data information for a period no longer than is required for the purpose for which it was collected or as required under any applicable law. However, we may retain data related to you if we believe it may be necessary to prevent fraud or future abuse or for other legitimate purposes. We may continue to retain your data in anonymised form for analytical and research purposes.
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-3">Your Rights</h2>
        <p>
          You may access, rectify, and update your personal data directly through the functionalities provided on the Platform.
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-3">Consent</h2>
        <p>
          By visiting our Platform or by providing your information, you consent to the collection, use, storage, disclosure and otherwise processing of your information on the Platform in accordance with this Privacy Policy. If you disclose to us any personal data relating to other people, you represent that you have the authority to do so and permit us to use the information in accordance with this Privacy Policy. You, while providing your personal data over the Platform or any partner platforms or establishments, consent to us (including our other corporate entities, affiliates, lending partners, technology partners, marketing channels, business partners and other third parties) to contact you through SMS, instant messaging apps, call and/or e-mail for the purposes specified in this Privacy Policy. You have an option to withdraw your consent that you have already provided by writing to the Grievance Officer at the contact information provided below. Please mention “Withdrawal of consent for processing personal data” in your subject line of your communication. We may verify such requests before acting on our request. However, please note that your withdrawal of consent will not be retrospective and will be in accordance with the Terms of Use, this Privacy Policy, and applicable laws. In the event you withdraw consent given to us under this Privacy Policy, we reserve the right to restrict or deny the provision of our services for which we consider such information to be necessary.
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-3">Changes to this Privacy Policy</h2>
        <p>
          Please check our Privacy Policy periodically for changes. We may update this Privacy Policy to reflect changes to our information practices. We may alert / notify you about the significant changes to the Privacy Policy, in the manner as may be required under applicable laws.
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-3">Grievance Officer</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start mb-3">
            <FiMapPin className="h-5 w-5 text-blue-600 mt-1" />
            <div className="ml-3">
              <p className="font-medium">Aryan Ramesh Gupta</p>
              <p className="text-gray-600">CEO</p>
              <p className="text-gray-600">Andes Services Pvt. Ltd., Kothrud, Pune, Maharashtra, India </p>
            </div>
          </div>
          <div className="flex items-center mb-3">
            <FiMail className="h-5 w-5 text-blue-600" />
            <a href="mailto:care@andes.co.in" className="ml-3 text-blue-600 hover:underline">care@andes.co.in</a>
          </div>
          <div className="flex items-center">
            <FiPhone className="h-5 w-5 text-blue-600" />
            <a href="tel:+9174994 13025" className="ml-3 text-blue-600 hover:underline">+91 74994 13025</a>
          </div>
          <p className="mt-3 text-gray-500 flex items-center">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              🕒
            </span>
            <span className="ml-2">Monday - Friday (9:00 - 18:00)</span>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;