// import React from 'react';
// import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
// import { Link } from "react-router-dom";

// const ServiceFooter = () => {
//   return (
//     <footer className="bg-[#0A1321] text-white py-12 mt-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <h3 className="text-xl font-bold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li><Link to="/book-now" className="hover:text-blue-400">Book now</Link></li>
//               <li><Link to="/working" className="hover:text-blue-400">How it works</Link></li>
//               <li><Link to="/services" className="hover:text-blue-400">Pricing</Link></li>
//               <li><Link to="/about" className="hover:text-blue-400">About us</Link></li>
//               <li><Link to="/terms_conditions" className="hover:text-blue-400">Terms & Conditions</Link></li>
//               <li><Link to="/privacy_policy" className="hover:text-blue-400">Privacy Policy</Link></li>
//               <li><Link to="/refund_policy" className="hover:text-blue-400">Refund Policy</Link></li>
//               <li><Link to="/return_policy" className="hover:text-blue-400">Return Policy</Link></li>
//               <li><Link to="/shipping_policy" className="hover:text-blue-400">Shipping Policy</Link></li>
//               <li><Link to="/about" className="hover:text-blue-400">Contact</Link></li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-xl font-bold mb-4">Contact Us</h3>
//             <div className="space-y-3">
//               <div className="flex items-center">
//                 <FaPhone className="mr-2 text-blue-400" />
//                 <span>+91 74994 13025</span>
//               </div>
//               <div className="flex items-center">
//                 <FaEnvelope className="mr-2 text-blue-400" />
//                 <span>care@andes.co.in</span>
//               </div>
//               <div className="flex items-center">
//                 <FaMapMarkerAlt className="mr-2 text-blue-400" />
//                 <span> Kothrud, Pune, Maharashtra, India</span>
//               </div>
//             </div>
//           </div>
//           <div>
//             <h3 className="text-xl font-bold mb-4">Follow Us</h3>
//             <div className="flex space-x-4 mb-6">
//               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
//                 <FaInstagram className="text-2xl" />
//               </a>
//               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
//                 <FaFacebook className="text-2xl" />
//               </a>
//               <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
//                 <FaTwitter className="text-2xl" />
//               </a>
//             </div>
//             <div className="mt-6">
//               <h4 className="font-semibold mb-2">Newsletter</h4>
//               <div className="flex">
//                 <input 
//                   type="email" 
//                   placeholder="Your email" 
//                   className="px-3 py-2 bg-gray-700 text-white rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
//           <p>© {new Date().getFullYear()} Andes Services Pvt. Ltd.</p>
//           <p>Powered by Andes with </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default ServiceFooter;

import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaYoutube, FaLinkedin, FaHeart } from 'react-icons/fa';
import { Link } from "react-router-dom";

const ServiceFooter = () => {
  return (
    <footer className="bg-[#0A1321] text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/book-now" className="hover:text-blue-400">Book now</Link></li>
              <li><Link to="/working" className="hover:text-blue-400">How it works</Link></li>
              <li><Link to="/services" className="hover:text-blue-400">Pricing</Link></li>
              <li><Link to="/about" className="hover:text-blue-400">About us</Link></li>
              <li><Link to="/terms_conditions" className="hover:text-blue-400">Terms & Conditions</Link></li>
              <li><Link to="/privacy_policy" className="hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link to="/refund_policy" className="hover:text-blue-400">Refund Policy</Link></li>
              <li><Link to="/return_policy" className="hover:text-blue-400">Return Policy</Link></li>
              <li><Link to="/shipping_policy" className="hover:text-blue-400">Shipping Policy</Link></li>
              <li><Link to="/about" className="hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaPhone className="mr-2 text-blue-400" />
                <span>+91 74994 13025</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2 text-blue-400" />
                <span>care@andes.co.in</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-400" />
                <span> Kothrud, Pune, Maharashtra, India</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="https://www.instagram.com/andes.now" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="https://www.youtube.com/@andes_now" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                <FaYoutube className="text-2xl" />
              </a>
              <a href="https://www.linkedin.com/company/103914886/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 bg-gray-700 text-white rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 flex flex-col items-center">
          <p>© {new Date().getFullYear()} Andes Services Pvt. Ltd.</p>
          <p>
            Powered by Andes with <FaHeart className="inline text-red-500 mx-1" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ServiceFooter;