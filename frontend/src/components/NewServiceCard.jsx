// import React, { useState, useEffect } from 'react';
// import { useCart } from '../components/CartContext';
// import toast from 'react-hot-toast';

// const ServiceCard = ({ service }) => {
//   const { 
//     addToCart, 
//     removeFromCart, 
//     updateQuantity, 
//     cartItems, 
//     isInstantDeliveryMode, 
//     hasAnyInstantItems 
//   } = useCart();
  
//   const [quantity, setQuantity] = useState(1);
//   const [isInstantDeliveryAvailable, setIsInstantDeliveryAvailable] = useState(true);
  
//   // Check if this service is already in cart
//   const cartItem = cartItems.find(item => item.id === service.id);
//   const isInCart = Boolean(cartItem);
//   const isInstantDelivery = service.isInstantDelivery || service.instantDelivery;

//   // Check if instant delivery is available (12am to 2pm)
//   useEffect(() => {
//     const checkAvailability = () => {
//       const now = new Date();
//       const hours = now.getHours();
//       // Available from 0 (12am) to 14 (2pm)
//       setIsInstantDeliveryAvailable(hours >= 0 && hours < 14);
//     };
    
//     checkAvailability();
//     const intervalId = setInterval(checkAvailability, 60000); // Check every minute
    
//     return () => clearInterval(intervalId);
//   }, []);

//   // Check for mode compatibility
//   const incompatibleMode = 
//     (isInstantDeliveryMode && !isInstantDelivery) || 
//     (!isInstantDeliveryMode && isInstantDelivery && hasAnyInstantItems);

//   // Instant delivery items are disabled when outside available hours
//   // Only disable instant delivery items when they're not available
//   const isDisabled = (isInstantDelivery && !isInstantDeliveryAvailable) || (incompatibleMode && !isInCart);

//   const handleCartAction = () => {
//     if (isInCart) {
//       removeFromCart(service.id);
//     } else {
//       // Check mode compatibility
//       if (isInstantDeliveryMode && !isInstantDelivery) {
//         toast.error("Can't add regular items in Instant Delivery mode");
//         return;
//       }
      
//       if (!isInstantDeliveryMode && isInstantDelivery && cartItems.length > 0) {
//         toast.error("Please clear your cart before adding Instant Delivery items");
//         return;
//       }
      
//       // If it's an instant delivery item and outside available hours, show error
//       if (isInstantDelivery && !isInstantDeliveryAvailable) {
//         toast.error("Instant delivery is only available between 12:00 AM and 2:00 PM");
//         return;
//       }
      
//       const success = addToCart({ ...service, quantity });
//       if (success) {
//         setQuantity(1);
//       }
//     }
//   };

//   const handleQuantityChange = (e) => {
//     const value = parseInt(e.target.value) || 1;
//     setQuantity(Math.max(1, value));
//   };

//   const incrementQuantity = () => {
//     setQuantity(prev => prev + 1);
//   };

//   const decrementQuantity = () => {
//     setQuantity(prev => (prev > 1 ? prev - 1 : 1));
//   };

//   const originalPrice = service.unit === 'piece' || service.unit === 'pair' 
//     ? service.rateByPiece 
//     : service.rateByKg;
//   const discountedPrice = service.unit === 'piece' || service.unit === 'pair' 
//     ? service.discountedRateByPiece 
//     : service.discountedRateByKg;
//   const unitText = service.unit === 'piece' 
//     ? 'per piece' 
//     : service.unit === 'pair' 
//       ? 'per pair' 
//       : 'per kg';

//   return (
//     <div className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isInstantDelivery ? isInstantDeliveryAvailable ? 'border-2 border-amber-400' : 'border-2 border-gray-300' : ''}`}>
//       {/* Discount Badge */}
//       <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 animate-pulse">
//         {service.discount}% OFF
//       </div>
      
//       {/* Instant Badge - Only visible on regular service page */}
//       {isInstantDelivery && !service.hideInstantBadge && (
//         <div className={`absolute top-4 left-4 bg-gradient-to-r ${isInstantDeliveryAvailable ? 'from-amber-500 to-orange-500' : 'from-gray-500 to-gray-600'} text-white text-xs font-bold px-3 py-1 rounded-full z-10 flex items-center`}>
//           <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
//           </svg>
//           Same Day
//           {!isInstantDeliveryAvailable && (
//             <span className="ml-1 bg-red-800 text-white text-xs px-1 rounded-sm">
//               Unavailable
//             </span>
//           )}
//         </div>
//       )}
      
//       {/* Service Image */}
//       <div className={`h-48 overflow-hidden ${(isInstantDelivery && !isInstantDeliveryAvailable) ? 'opacity-70' : ''}`}>
//         <img
//           loading="lazy"
//           src={service.image} 
//           alt={service.displayName} 
//           className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//         />
//       </div>
      
//       {/* Incompatible Mode Overlay */}
//       {!isInCart && incompatibleMode && (
//         <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-20">
//           <div className="bg-white p-4 rounded-lg max-w-xs text-center">
//             {isInstantDeliveryMode ? (
//               <>
//                 <p className="text-amber-600 font-bold mb-1">⚡ Instant Delivery Mode Active</p>
//                 <p className="text-sm text-gray-700">
//                   Your cart is set to instant delivery. Only items marked with ⚡ can be added.
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2">
//                   To add regular items, please clear your cart first.
//                 </p>
//               </>
//             ) : (
//               <>
//                 <p className="text-gray-700 font-bold mb-1">Regular Delivery Mode Active</p>
//                 <p className="text-sm text-gray-700">
//                   Your cart contains regular items. Instant delivery items (⚡) can't be mixed with regular items.
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2">
//                   To add instant delivery items, please clear your cart first.
//                 </p>
//               </>
//             )}
//           </div>
//         </div>
//       )}
      
//       {/* Unavailable Instant Delivery Overlay - Only for instant delivery items */}
//       {!isInCart && isInstantDelivery && !isInstantDeliveryAvailable && (
//         <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-20">
//           <div className="bg-white p-4 rounded-lg max-w-xs text-center">
//             <svg className="w-10 h-10 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <p className="text-gray-700 font-bold mt-3 mb-1">Instant Delivery Unavailable</p>
//             <p className="text-sm text-gray-600">
//               Same-day delivery is only available between 12:00 AM and 2:00 PM.
//             </p>
//             <p className="text-xs text-gray-500 mt-2">
//               Please check back during service hours.
//             </p>
//           </div>
//         </div>
//       )}
      
//       {/* Service Details */}
//       <div className={`p-6 ${(isInstantDelivery && !isInstantDeliveryAvailable) ? 'opacity-70' : ''}`}>
//         <h3 className="text-xl font-bold text-gray-800 mb-2">
//           {service.displayName}
//           {isInstantDelivery && (
//             <span className={`ml-2 inline-flex items-center text-xs font-medium ${isInstantDeliveryAvailable ? 'text-amber-600' : 'text-gray-500'}`}>
//               <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
//               </svg>
//               {isInstantDeliveryAvailable ? 'Same Day' : 'Same Day (Unavailable)'}
//             </span>
//           )}
//         </h3>
//         <p className="text-gray-600 text-sm mb-4">{service.description}</p>
        
//         <div className="flex items-end justify-between">
//           <div>
//             <span className="text-gray-400 text-sm line-through mr-2">
//               ₹{originalPrice}
//             </span>
//             <span className="text-rose-500 font-bold text-lg">
//               ₹{discountedPrice}
//             </span>
//             <span className="block text-gray-500 text-xs mt-1">
//               {unitText}
//             </span>
//             {isInstantDelivery && isInstantDeliveryAvailable && (
//               <span className="block text-amber-600 text-xs mt-1 font-medium">
//                 Delivered by 10 PM today
//               </span>
//             )}
//             {isInstantDelivery && !isInstantDeliveryAvailable && (
//               <span className="block text-gray-500 text-xs mt-1">
//                 Available: 12:00 AM - 2:00 PM
//               </span>
//             )}
//           </div>
          
//           <div className="flex items-center">
//             {isInCart && (
//               <div className="flex items-center mr-2">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     updateQuantity(service.id, cartItem.quantity - 1);
//                   }}
//                   className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200 text-sm"
//                   disabled={cartItem.quantity <= 1}
//                 >
//                   -
//                 </button>
//                 <span className="w-8 h-6 flex items-center justify-center border-t border-b border-gray-300 bg-white text-sm">
//                   {cartItem.quantity}
//                 </span>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     updateQuantity(service.id, cartItem.quantity + 1);
//                   }}
//                   className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200 text-sm"
//                 >
//                   +
//                 </button>
//               </div>
//             )}
            
//             <button 
//               onClick={handleCartAction}
//               className={`px-4 py-2 rounded-lg text-sm font-medium hover:shadow-md transition-all ${
//                 isInCart 
//                   ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
//                   : isInstantDelivery && isInstantDeliveryAvailable
//                     ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
//                     : isInstantDelivery && !isInstantDeliveryAvailable
//                       ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
//                       : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
//               } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
//               disabled={isDisabled}
//             >
//               {isInCart 
//                 ? 'Remove' 
//                 : isInstantDelivery && !isInstantDeliveryAvailable 
//                   ? 'Not Available' 
//                   : isInstantDelivery
//                     ? 'Express Add'
//                     : 'Add to Cart'
//               }
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default ServiceCard;
// import React, { useState, useEffect } from 'react';
// import { useCart } from '../components/CartContext';
// import toast from 'react-hot-toast';

// const ServiceCard = ({ service }) => {
//   const { 
//     addToCart, 
//     removeFromCart, 
//     updateQuantity, 
//     cartItems, 
//     isInstantDeliveryMode, 
//     hasAnyInstantItems 
//   } = useCart();
  
//   const [quantity, setQuantity] = useState(1);
//   const [isInstantDeliveryAvailable, setIsInstantDeliveryAvailable] = useState(true);
//   const [showPopup, setShowPopup] = useState(false);
//   const [variantQuantities, setVariantQuantities] = useState({
//     wf: 1,
//     wi: 1
//   });

//   // Check if this service is already in cart (for the base service)
//   const cartItem = cartItems.find(item => item.id === service.id);
//   const isInCart = Boolean(cartItem);
//   const isInstantDelivery = service.isInstantDelivery || service.instantDelivery;
//   const isGeneralCategory = service.categories.includes('general');
//   // Skip popup for Iron service (ID 1)
//   const skipPopup = service.id === 1;

//   // Check if instant delivery is available (12am to 2pm)
//   useEffect(() => {
//     const checkAvailability = () => {
//       const now = new Date();
//       const hours = now.getHours();
//       setIsInstantDeliveryAvailable(hours >= 0 && hours < 14);
//     };
    
//     checkAvailability();
//     const intervalId = setInterval(checkAvailability, 60000);
    
//     return () => clearInterval(intervalId);
//   }, []);

//   // Check for mode compatibility
//   const incompatibleMode = 
//     (isInstantDeliveryMode && !isInstantDelivery) || 
//     (!isInstantDeliveryMode && isInstantDelivery && hasAnyInstantItems);

//   const isDisabled = (isInstantDelivery && !isInstantDeliveryAvailable) || (incompatibleMode && !isInCart);

//   const handleCartAction = () => {
//     if (isInCart) {
//       removeFromCart(service.id);
//     } else if (isGeneralCategory && !isInstantDelivery && !skipPopup) {
//       setShowPopup(true);
//     } else {
//       if (isInstantDeliveryMode && !isInstantDelivery) {
//         toast.error("Can't add regular items in Instant Delivery mode");
//         return;
//       }
      
//       if (!isInstantDeliveryMode && isInstantDelivery && cartItems.length > 0) {
//         toast.error("Please clear your cart before adding Instant Delivery items");
//         return;
//       }
      
//       if (isInstantDelivery && !isInstantDeliveryAvailable) {
//         toast.error("Instant delivery is only available between 12:00 AM and 2:00 PM");
//         return;
//       }
      
//       const success = addToCart({ ...service, quantity });
//       if (success) {
//         setQuantity(1);
//       }
//     }
//   };

//   const handleVariantSelection = (variant, variantKey) => {
//     if (isInstantDeliveryMode) {
//       toast.error("Can't add regular items in Instant Delivery mode");
//       return;
//     }
    
//     if (cartItems.length > 0 && hasAnyInstantItems) {
//       toast.error("Please clear your cart before adding regular items");
//       return;
//     }
    
//     const success = addToCart({ ...variant, quantity: variantQuantities[variantKey] });
//     if (success) {
//       setVariantQuantities(prev => ({ ...prev, [variantKey]: 1 }));
//       toast.success(`${variant.displayName} added to cart!`);
//     }
//   };

//   const handleVariantQuantityChange = (variantKey, value) => {
//     const newValue = Math.max(1, parseInt(value) || 1);
//     setVariantQuantities(prev => ({ ...prev, [variantKey]: newValue }));
//   };

//   const incrementVariantQuantity = (variantKey) => {
//     setVariantQuantities(prev => ({ ...prev, [variantKey]: prev[variantKey] + 1 }));
//   };

//   const decrementVariantQuantity = (variantKey) => {
//     setVariantQuantities(prev => ({
//       ...prev,
//       [variantKey]: Math.max(1, prev[variantKey] - 1)
//     }));
//   };

//   const handleQuantityChange = (e) => {
//     const value = parseInt(e.target.value) || 1;
//     setQuantity(Math.max(1, value));
//   };

//   const incrementQuantity = () => {
//     setQuantity(prev => prev + 1);
//   };

//   const decrementQuantity = () => {
//     setQuantity(prev => (prev > 1 ? prev - 1 : 1));
//   };

//   const originalPrice = service.unit === 'piece' || service.unit === 'pair' 
//     ? service.rateByPiece 
//     : service.rateByKg;
//   const discountedPrice = service.unit === 'piece' || service.unit === 'pair' 
//     ? service.discountedRateByPiece 
//     : service.discountedRateByKg;
//   const unitText = service.unit === 'piece' 
//     ? 'per piece' 
//     : service.unit === 'pair' 
//       ? 'per pair' 
//       : 'per kg';

//   // Extract base service name for popup
//   const baseServiceName = service.displayName.replace(/ - (WASH & FOLD|WASH & IRON)/i, '');
  
//   // Define variant data for popup using prices from data.js
//   const variants = [
//     {
//       id: `${service.id}-wf`,
//       name: `${baseServiceName} - Wash & Fold`,
//       description: `Washing and folding service for ${baseServiceName.toLowerCase()}.`,
//       rateByPiece: service.washAndFoldPrice || 0,
//       discountedRateByPiece: service.washAndFoldDiscountedPrice || 0,
//       rateByKg: service.unit === 'kg' ? service.washAndFoldPrice : 0,
//       discountedRateByKg: service.unit === 'kg' ? service.washAndFoldDiscountedPrice : 0,
//       unit: service.unit,
//       displayName: `${baseServiceName} - Wash & Fold`,
//       customText: `₹${service.washAndFoldPrice || 0}`,
//       image: service.image,
//       discount: service.unit === 'kg' ? 30 : Math.round(((service.washAndFoldPrice - service.washAndFoldDiscountedPrice) / service.washAndFoldPrice) * 100) || 25,
//       categories: service.categories,
//       isInstantDelivery: false
//     },
//     {
//       id: `${service.id}-wi`,
//       name: `${baseServiceName} - Wash & Iron`,
//       description: `Washing and ironing service for ${baseServiceName.toLowerCase()}.`,
//       rateByPiece: service.washAndIronPrice || 0,
//       discountedRateByPiece: service.washAndIronDiscountedPrice || 0,
//       rateByKg: service.unit === 'kg' ? service.washAndIronPrice : 0,
//       discountedRateByKg: service.unit === 'kg' ? service.washAndIronDiscountedPrice : 0,
//       unit: service.unit,
//       displayName: `${baseServiceName} - Wash & Iron`,
//       customText: `₹${service.washAndIronPrice || 0}`,
//       image: service.image,
//       discount: service.unit === 'kg' ? 30 : Math.round(((service.washAndIronPrice - service.washAndIronDiscountedPrice) / service.washAndIronPrice) * 100) || 33,
//       categories: service.categories,
//       isInstantDelivery: false
//     }
//   ];

//   return (
//     <div className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isInstantDelivery ? isInstantDeliveryAvailable ? 'border-2 border-amber-400' : 'border-2 border-gray-300' : ''}`}>
//       {/* Discount Badge */}
//       <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 animate-pulse">
//         {service.discount}% OFF
//       </div>
      
//       {/* Instant Badge - Only visible on regular service page */}
//       {isInstantDelivery && !service.hideInstantBadge && (
//         <div className={`absolute top-4 left-4 bg-gradient-to-r ${isInstantDeliveryAvailable ? 'from-amber-500 to-orange-500' : 'from-gray-500 to-gray-600'} text-white text-xs font-bold px-3 py-1 rounded-full z-10 flex items-center`}>
//           <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
//           </svg>
//           Same Day
//           {!isInstantDeliveryAvailable && (
//             <span className="ml-1 bg-red-800 text-white text-xs px-1 rounded-sm">
//               Unavailable
//             </span>
//           )}
//         </div>
//       )}
      
//       {/* Service Image */}
//       <div className={`h-48 overflow-hidden ${(isInstantDelivery && !isInstantDeliveryAvailable) ? 'opacity-70' : ''}`}>
//         <img
//           loading="lazy"
//           src={service.image} 
//           alt={service.displayName} 
//           className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//         />
//       </div>
      
//       {/* Incompatible Mode Overlay */}
//       {!isInCart && incompatibleMode && (
//         <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-20">
//           <div className="bg-white p-4 rounded-lg max-w-xs text-center">
//             {isInstantDeliveryMode ? (
//               <>
//                 <p className="text-amber-600 font-bold mb-1">⚡ Instant Delivery Mode Active</p>
//                 <p className="text-sm text-gray-700">
//                   Your cart is set to instant delivery. Only items marked with ⚡ can be added.
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2">
//                   To add regular items, please clear your cart first.
//                 </p>
//               </>
//             ) : (
//               <>
//                 <p className="text-gray-700 font-bold mb-1">Regular Delivery Mode Active</p>
//                 <p className="text-sm text-gray-700">
//                   Your cart contains regular items. Instant delivery items (⚡) can't be mixed with regular items.
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2">
//                   To add instant delivery items, please clear your cart first.
//                 </p>
//               </>
//             )}
//           </div>
//         </div>
//       )}
      
//       {/* Unavailable Instant Delivery Overlay - Only for instant delivery items */}
//       {!isInCart && isInstantDelivery && !isInstantDeliveryAvailable && (
//         <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-20">
//           <div className="bg-white p-4 rounded-lg max-w-xs text-center">
//             <svg className="w-10 h-10 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <p className="text-gray-700 font-bold mt-3 mb-1">Instant Delivery Unavailable</p>
//             <p className="text-sm text-gray-600">
//               Same-day delivery is only available between 12:00 AM and 2:00 PM.
//             </p>
//             <p className="text-xs text-gray-500 mt-2">
//               Please check back during service hours.
//             </p>
//           </div>
//         </div>
//       )}
      
//       {/* Variant Selection Popup */}
//       {showPopup && isGeneralCategory && !isInstantDelivery && !skipPopup && (
//         <div className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-b-xl shadow-lg z-30 h-1/2 overflow-y-auto">
//           <h4 className="text-lg font-bold text-gray-800 mb-3">
//             Select Service Type for {baseServiceName}
//           </h4>
//           <div className="space-y-4">
//             {variants.map((variant, index) => {
//               const variantKey = index === 0 ? 'wf' : 'wi';
//               const variantInCart = cartItems.find(item => item.id === variant.id);
//               return (
//                 <div key={variant.id} className="flex items-center justify-between border-b pb-2">
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-gray-700">{variant.displayName}</p>
//                     <p className="text-xs text-gray-500">{variant.description}</p>
//                     <p className="text-sm text-rose-500 font-bold mt-1">
//                       ₹{variant.discountedRateByPiece || variant.discountedRateByKg} {unitText}
//                       <span className="text-gray-400 text-xs line-through ml-2">
//                         ₹{variant.rateByPiece || variant.rateByKg}
//                       </span>
//                     </p>
//                     {variantInCart && (
//                       <p className="text-xs text-gray-500 mt-1">
//                         In cart: {variantInCart.quantity} {unitText}
//                       </p>
//                     )}
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div className="flex items-center">
//                       <button
//                         onClick={() => decrementVariantQuantity(variantKey)}
//                         className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200 text-sm"
//                         disabled={variantQuantities[variantKey] <= 1}
//                       >
//                         -
//                       </button>
//                       <input
//                         type="number"
//                         value={variantQuantities[variantKey]}
//                         onChange={(e) => handleVariantQuantityChange(variantKey, e.target.value)}
//                         className="w-12 h-6 text-center border-t border-b border-gray-300 bg-white text-sm"
//                         min="1"
//                       />
//                       <button
//                         onClick={() => incrementVariantQuantity(variantKey)}
//                         className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200 text-sm"
//                       >
//                         +
//                       </button>
//                     </div>
//                     <button
//                       onClick={() => handleVariantSelection(variant, variantKey)}
//                       className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-md transition-all"
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <button
//             onClick={() => setShowPopup(false)}
//             className="mt-4 w-full px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
//           >
//             Close
//           </button>
//         </div>
//       )}
      
//       {/* Service Details */}
//       <div className={`p-6 ${(isInstantDelivery && !isInstantDeliveryAvailable) ? 'opacity-70' : ''}`}>
//         <h3 className="text-xl font-bold text-gray-800 mb-2">
//           {service.displayName}
//           {isInstantDelivery && (
//             <span className={`ml-2 inline-flex items-center text-xs font-medium ${isInstantDeliveryAvailable ? 'text-amber-600' : 'text-gray-500'}`}>
//               <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
//               </svg>
//               {isInstantDeliveryAvailable ? 'Same Day' : 'Same Day (Unavailable)'}
//             </span>
//           )}
//         </h3>
//         <p className="text-gray-600 text-sm mb-4">{service.description}</p>
        
//         <div className="flex items-end justify-between">
//           <div>
//             <span className="text-gray-400 text-sm line-through mr-2">
//               ₹{originalPrice}
//             </span>
//             <span className="text-rose-500 font-bold text-lg">
//               ₹{discountedPrice}
//             </span>
//             <span className="block text-gray-500 text-xs mt-1">
//               {unitText}
//             </span>
//             {isInstantDelivery && isInstantDeliveryAvailable && (
//               <span className="block text-amber-600 text-xs mt-1 font-medium">
//                 Delivered by 10 PM today
//               </span>
//             )}
//             {isInstantDelivery && !isInstantDeliveryAvailable && (
//               <span className="block text-gray-500 text-xs mt-1">
//                 Available: 12:00 AM - 2:00 PM
//               </span>
//             )}
//           </div>
          
//           <div className="flex items-center">
//             {isInCart && (
//               <div className="flex items-center mr-2">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     updateQuantity(service.id, cartItem.quantity - 1);
//                   }}
//                   className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200 text-sm"
//                   disabled={cartItem.quantity <= 1}
//                 >
//                   -
//                 </button>
//                 <span className="w-8 h-6 flex items-center justify-center border-t border-b border-gray-300 bg-white text-sm">
//                   {cartItem.quantity}
//                 </span>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     updateQuantity(service.id, cartItem.quantity + 1);
//                   }}
//                   className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200 text-sm"
//                 >
//                   +
//                 </button>
//               </div>
//             )}
            
//             <button 
//               onClick={handleCartAction}
//               className={`px-4 py-2 rounded-lg text-sm font-medium hover:shadow-md transition-all ${
//                 isInCart 
//                   ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
//                   : isInstantDelivery && isInstantDeliveryAvailable
//                     ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
//                     : isInstantDelivery && !isInstantDeliveryAvailable
//                       ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
//                       : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
//               } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
//               disabled={isDisabled}
//             >
//               {isInCart 
//                 ? 'Remove' 
//                 : isInstantDelivery && !isInstantDeliveryAvailable 
//                   ? 'Not Available' 
//                   : isInstantDelivery
//                     ? 'Express Add'
//                     : 'Add to Cart'
//               }
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceCard;


// import React, { useState, useEffect } from 'react';
// import { useCart } from '../components/CartContext';
// import toast from 'react-hot-toast';

// const ServiceCard = ({ service }) => {
//   const { 
//     addToCart, 
//     removeFromCart, 
//     updateQuantity, 
//     cartItems, 
//     isInstantDeliveryMode, 
//     hasAnyInstantItems 
//   } = useCart();
  
//   const [quantity, setQuantity] = useState(1);
//   const [isInstantDeliveryAvailable, setIsInstantDeliveryAvailable] = useState(true);
//   const [showPopup, setShowPopup] = useState(false);
//   const [variantQuantities, setVariantQuantities] = useState({
//     wf: 1,
//     wi: 1
//   });

//   // Check if this service is already in cart (for the base service)
//   const cartItem = cartItems.find(item => item.id === service.id);
//   const isInCart = Boolean(cartItem);
//   const isInstantDelivery = service.isInstantDelivery || service.instantDelivery;
//   const isGeneralCategory = service.categories.includes('general');
//   // Skip popup for Iron service (ID 1)
//   const skipPopup = service.id === 1;

//   // Check if instant delivery is available (12am to 2pm)
//   useEffect(() => {
//     const checkAvailability = () => {
//       const now = new Date();
//       const hours = now.getHours();
//       setIsInstantDeliveryAvailable(hours >= 0 && hours < 14);
//     };
    
//     checkAvailability();
//     const intervalId = setInterval(checkAvailability, 60000);
    
//     return () => clearInterval(intervalId);
//   }, []);

//   // Check for mode compatibility
//   const incompatibleMode = 
//     (isInstantDeliveryMode && !isInstantDelivery) || 
//     (!isInstantDeliveryMode && isInstantDelivery && hasAnyInstantItems);

//   const isDisabled = (isInstantDelivery && !isInstantDeliveryAvailable) || (incompatibleMode && !isInCart);

//   const handleCartAction = () => {
//     if (isInCart) {
//       removeFromCart(service.id);
//     } else if (isGeneralCategory && !isInstantDelivery && !skipPopup) {
//       setShowPopup(true);
//     } else {
//       if (isInstantDeliveryMode && !isInstantDelivery) {
//         toast.error("Can't add regular items in Instant Delivery mode");
//         return;
//       }
      
//       if (!isInstantDeliveryMode && isInstantDelivery && cartItems.length > 0) {
//         toast.error("Please clear your cart before adding Instant Delivery items");
//         return;
//       }
      
//       if (isInstantDelivery && !isInstantDeliveryAvailable) {
//         toast.error("Instant delivery is only available between 12:00 AM and 2:00 PM");
//         return;
//       }
      
//       const success = addToCart({ ...service, quantity });
//       if (success) {
//         setQuantity(1);
//       }
//     }
//   };

//   const handleVariantSelection = (variant, variantKey) => {
//     if (isInstantDeliveryMode) {
//       toast.error("Can't add regular items in Instant Delivery mode");
//       return;
//     }
    
//     if (cartItems.length > 0 && hasAnyInstantItems) {
//       toast.error("Please clear your cart before adding regular items");
//       return;
//     }
    
//     const success = addToCart({ ...variant, quantity: variantQuantities[variantKey] });
//     if (success) {
//       setVariantQuantities(prev => ({ ...prev, [variantKey]: 1 }));
//       toast.success(`${variant.displayName} added to cart!`);
//     }
//   };

//   const handleVariantQuantityChange = (variantKey, value) => {
//     const newValue = Math.max(1, parseInt(value) || 1);
//     setVariantQuantities(prev => ({ ...prev, [variantKey]: newValue }));
//   };

//   const incrementVariantQuantity = (variantKey) => {
//     setVariantQuantities(prev => ({ ...prev, [variantKey]: prev[variantKey] + 1 }));
//   };

//   const decrementVariantQuantity = (variantKey) => {
//     setVariantQuantities(prev => ({
//       ...prev,
//       [variantKey]: Math.max(1, prev[variantKey] - 1)
//     }));
//   };

//   const handleQuantityChange = (e) => {
//     const value = parseInt(e.target.value) || 1;
//     setQuantity(Math.max(1, value));
//   };

//   const incrementQuantity = () => {
//     setQuantity(prev => prev + 1);
//   };

//   const decrementQuantity = () => {
//     setQuantity(prev => (prev > 1 ? prev - 1 : 1));
//   };

//   const originalPrice = service.unit === 'piece' || service.unit === 'pair' 
//     ? service.rateByPiece 
//     : service.rateByKg;
//   const discountedPrice = service.unit === 'piece' || service.unit === 'pair' 
//     ? service.discountedRateByPiece 
//     : service.discountedRateByKg;
//   const unitText = service.unit === 'piece' 
//     ? 'per piece' 
//     : service.unit === 'pair' 
//       ? 'per pair' 
//       : 'per kg';

//   // Extract base service name for popup
//   const baseServiceName = service.displayName.replace(/ - (WASH & FOLD|WASH & IRON)/i, '');
  
//   // Define variant data for popup using prices from data.js
//   const variants = [
//     {
//       id: `${service.id}-wf`,
//       name: `${baseServiceName} - Wash & Fold`,
//       description: `Washing and folding service for ${baseServiceName.toLowerCase()}.`,
//       rateByPiece: service.washAndFoldPrice || 0,
//       discountedRateByPiece: service.washAndFoldDiscountedPrice || 0,
//       rateByKg: service.unit === 'kg' ? service.washAndFoldPrice : 0,
//       discountedRateByKg: service.unit === 'kg' ? service.washAndFoldDiscountedPrice : 0,
//       unit: service.unit,
//       displayName: `${baseServiceName} - Wash & Fold`,
//       customText: `₹${service.washAndFoldDiscountedPrice || 0}`,
//       image: service.image,
//       discount: service.unit === 'kg' ? 30 : Math.round(((service.washAndFoldPrice - service.washAndFoldDiscountedPrice) / service.washAndFoldPrice) * 100) || 25,
//       categories: service.categories,
//       isInstantDelivery: false
//     },
//     {
//       id: `${service.id}-wi`,
//       name: `${baseServiceName} - Wash & Iron`,
//       description: `Washing and ironing service for ${baseServiceName.toLowerCase()}.`,
//       rateByPiece: service.washAndIronPrice || 0,
//       discountedRateByPiece: service.washAndIronDiscountedPrice || 0,
//       rateByKg: service.unit === 'kg' ? service.washAndIronPrice : 0,
//       discountedRateByKg: service.unit === 'kg' ? service.washAndIronDiscountedPrice : 0,
//       unit: service.unit,
//       displayName: `${baseServiceName} - Wash & Iron`,
//       customText: `₹${service.washAndIronDiscountedPrice || 0}`,
//       image: service.image,
//       discount: service.unit === 'kg' ? 30 : Math.round(((service.washAndIronPrice - service.washAndIronDiscountedPrice) / service.washAndIronPrice) * 100) || 33,
//       categories: service.categories,
//       isInstantDelivery: false
//     }
//   ];

//   // Check if we should use customText
//   const useCustomText = isGeneralCategory && service.washAndFoldDiscountedPrice !== undefined;

//   return (
//     <div className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isInstantDelivery ? isInstantDeliveryAvailable ? 'border-2 border-amber-400' : 'border-2 border-gray-300' : ''}`}>
//       {/* Discount Badge */}
//       <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 animate-pulse">
//         {service.discount}% OFF
//       </div>
      
//       {/* Instant Badge - Only visible on regular service page */}
//       {isInstantDelivery && !service.hideInstantBadge && (
//         <div className={`absolute top-4 left-4 bg-gradient-to-r ${isInstantDeliveryAvailable ? 'from-amber-500 to-orange-500' : 'from-gray-500 to-gray-600'} text-white text-xs font-bold px-3 py-1 rounded-full z-10 flex items-center`}>
//           <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
//           </svg>
//           Same Day
//           {!isInstantDeliveryAvailable && (
//             <span className="ml-1 bg-red-800 text-white text-xs px-1 rounded-sm">
//               Unavailable
//             </span>
//           )}
//         </div>
//       )}
      
//       {/* Service Image */}
//       <div className={`h-48 overflow-hidden ${(isInstantDelivery && !isInstantDeliveryAvailable) ? 'opacity-70' : ''}`}>
//         <img
//           loading="lazy"
//           src={service.image} 
//           alt={service.displayName} 
//           className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//         />
//       </div>
      
//       {/* Incompatible Mode Overlay */}
//       {!isInCart && incompatibleMode && (
//         <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-20">
//           <div className="bg-white p-4 rounded-lg max-w-xs text-center">
//             {isInstantDeliveryMode ? (
//               <>
//                 <p className="text-amber-600 font-bold mb-1">⚡ Instant Delivery Mode Active</p>
//                 <p className="text-sm text-gray-700">
//                   Your cart is set to instant delivery. Only items marked with ⚡ can be added.
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2">
//                   To add regular items, please clear your cart first.
//                 </p>
//               </>
//             ) : (
//               <>
//                 <p className="text-gray-700 font-bold mb-1">Regular Delivery Mode Active</p>
//                 <p className="text-sm text-gray-700">
//                   Your cart contains regular items. Instant delivery items (⚡) can't be mixed with regular items.
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2">
//                   To add instant delivery items, please clear your cart first.
//                 </p>
//               </>
//             )}
//           </div>
//         </div>
//       )}
      
//       {/* Unavailable Instant Delivery Overlay - Only for instant delivery items */}
//       {!isInCart && isInstantDelivery && !isInstantDeliveryAvailable && (
//         <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-20">
//           <div className="bg-white p-4 rounded-lg max-w-xs text-center">
//             <svg className="w-10 h-10 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <p className="text-gray-700 font-bold mt-3 mb-1">Instant Delivery Unavailable</p>
//             <p className="text-sm text-gray-600">
//               Same-day delivery is only available between 12:00 AM and 2:00 PM.
//             </p>
//             <p className="text-xs text-gray-500 mt-2">
//               Please check back during service hours.
//             </p>
//           </div>
//         </div>
//       )}
      
//       {/* Variant Selection Popup */}
//       {showPopup && isGeneralCategory && !isInstantDelivery && !skipPopup && (
//         <div className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-b-xl shadow-lg z-30 h-1/2 overflow-y-auto">
//           <h4 className="text-lg font-bold text-gray-800 mb-3">
//             Select Service Type for {baseServiceName}
//           </h4>
//           <div className="space-y-4">
//             {variants.map((variant, index) => {
//               const variantKey = index === 0 ? 'wf' : 'wi';
//               const variantInCart = cartItems.find(item => item.id === variant.id);
//               return (
//                 <div key={variant.id} className="flex items-center justify-between border-b pb-2">
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-gray-700">{variant.displayName}</p>
//                     <p className="text-xs text-gray-500">{variant.description}</p>
//                     <p className="text-sm text-rose-500 font-bold mt-1">
//                       {useCustomText ? variant.customText : (
//                         <>
//                           ₹{variant.discountedRateByPiece || variant.discountedRateByKg} {unitText}
//                           <span className="text-gray-400 text-xs line-through ml-2">
//                             ₹{variant.rateByPiece || variant.rateByKg}
//                           </span>
//                         </>
//                       )}
//                     </p>
//                     {variantInCart && (
//                       <p className="text-xs text-gray-500 mt-1">
//                         In cart: {variantInCart.quantity} {unitText}
//                       </p>
//                     )}
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div className="flex items-center">
//                       <button
//                         onClick={() => decrementVariantQuantity(variantKey)}
//                         className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200 text-sm"
//                         disabled={variantQuantities[variantKey] <= 1}
//                       >
//                         -
//                       </button>
//                       <input
//                         type="number"
//                         value={variantQuantities[variantKey]}
//                         onChange={(e) => handleVariantQuantityChange(variantKey, e.target.value)}
//                         className="w-12 h-6 text-center border-t border-b border-gray-300 bg-white text-sm"
//                         min="1"
//                       />
//                       <button
//                         onClick={() => incrementVariantQuantity(variantKey)}
//                         className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200 text-sm"
//                       >
//                         +
//                       </button>
//                     </div>
//                     <button
//                       onClick={() => handleVariantSelection(variant, variantKey)}
//                       className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-md transition-all"
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <button
//             onClick={() => setShowPopup(false)}
//             className="mt-4 w-full px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
//           >
//             Close
//           </button>
//         </div>
//       )}
      
//       {/* Service Details */}
//       <div className={`p-6 ${(isInstantDelivery && !isInstantDeliveryAvailable) ? 'opacity-70' : ''}`}>
//         <h3 className="text-xl font-bold text-gray-800 mb-2">
//           {service.displayName}
//           {isInstantDelivery && (
//             <span className={`ml-2 inline-flex items-center text-xs font-medium ${isInstantDeliveryAvailable ? 'text-amber-600' : 'text-gray-500'}`}>
//               <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
//               </svg>
//               {isInstantDeliveryAvailable ? 'Same Day' : 'Same Day (Unavailable)'}
//             </span>
//           )}
//         </h3>
//         <p className="text-gray-600 text-sm mb-4">{service.description}</p>
        
//         <div className="flex items-end justify-between">
//           <div>
//             {useCustomText ? (
//               <span className="text-rose-500 font-bold text-lg">
//                 {service.customText}
//               </span>
//             ) : (
//               <>
//                 <span className="text-gray-400 text-sm line-through mr-2">
//                   ₹{originalPrice}
//                 </span>
//                 <span className="text-rose-500 font-bold text-lg">
//                   ₹{discountedPrice}
//                 </span>
//               </>
//             )}
//             <span className="block text-gray-500 text-xs mt-1">
//               {unitText}
//             </span>
//             {isInstantDelivery && isInstantDeliveryAvailable && (
//               <span className="block text-amber-600 text-xs mt-1 font-medium">
//                 Delivered by 10 PM today
//               </span>
//             )}
//             {isInstantDelivery && !isInstantDeliveryAvailable && (
//               <span className="block text-gray-500 text-xs mt-1">
//                 Available: 12:00 AM - 2:00 PM
//               </span>
//             )}
//           </div>
          
//           <div className="flex items-center">
//             {isInCart && (
//               <div className="flex items-center mr-2">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     updateQuantity(service.id, cartItem.quantity - 1);
//                   }}
//                   className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200 text-sm"
//                   disabled={cartItem.quantity <= 1}
//                 >
//                   -
//                 </button>
//                 <span className="w-8 h-6 flex items-center justify-center border-t border-b border-gray-300 bg-white text-sm">
//                   {cartItem.quantity}
//                 </span>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     updateQuantity(service.id, cartItem.quantity + 1);
//                   }}
//                   className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200 text-sm"
//                 >
//                   +
//                 </button>
//               </div>
//             )}
            
//             <button 
//               onClick={handleCartAction}
//               className={`px-4 py-2 rounded-lg text-sm font-medium hover:shadow-md transition-all ${
//                 isInCart 
//                   ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
//                   : isInstantDelivery && isInstantDeliveryAvailable
//                     ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
//                     : isInstantDelivery && !isInstantDeliveryAvailable
//                       ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
//                       : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
//               } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
//               disabled={isDisabled}
//             >
//               {isInCart 
//                 ? 'Remove' 
//                 : isInstantDelivery && !isInstantDeliveryAvailable 
//                   ? 'Not Available' 
//                   : isInstantDelivery
//                     ? 'Express Add'
//                     : 'Add to Cart'
//               }
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceCard;



import React, { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext';
import toast from 'react-hot-toast';

const ServiceCard = ({ service }) => {
  const { 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    cartItems, 
    isInstantDeliveryMode, 
    hasAnyInstantItems 
  } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [isInstantDeliveryAvailable, setIsInstantDeliveryAvailable] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [variantQuantities, setVariantQuantities] = useState({
    wf: 1,
    wi: 1
  });

  // Check if this service is already in cart (for the base service)
  const cartItem = cartItems.find(item => item.id === service.id);
  const isInCart = Boolean(cartItem);
  const isInstantDelivery = service.isInstantDelivery || service.instantDelivery;
  const isGeneralCategory = service.categories.includes('general');
  // Skip popup for Iron service (ID 1)
  const skipPopup = service.id === 1;

  // Sync variant quantities with cart
  useEffect(() => {
    const wfVariant = cartItems.find(item => item.id === `${service.id}-wf`);
    const wiVariant = cartItems.find(item => item.id === `${service.id}-wi`);
    setVariantQuantities({
      wf: wfVariant ? wfVariant.quantity : 1,
      wi: wiVariant ? wiVariant.quantity : 1
    });
  }, [cartItems, service.id]);

  // Check if instant delivery is available (12am to 2pm)
  useEffect(() => {
    const checkAvailability = () => {
      const now = new Date();
      const hours = now.getHours();
      setIsInstantDeliveryAvailable(hours >= 0 && hours < 14);
    };
    
    checkAvailability();
    const intervalId = setInterval(checkAvailability, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Check for mode compatibility
  const incompatibleMode = 
    (isInstantDeliveryMode && !isInstantDelivery) || 
    (!isInstantDeliveryMode && isInstantDelivery && hasAnyInstantItems);

  const isDisabled = (isInstantDelivery && !isInstantDeliveryAvailable) || (incompatibleMode && !isInCart);

  const handleCartAction = () => {
    if (isInCart) {
      removeFromCart(service.id);
    } else if (isGeneralCategory && !isInstantDelivery && !skipPopup) {
      setShowPopup(true);
    } else {
      if (isInstantDeliveryMode && !isInstantDelivery) {
        toast.error("Can't add regular items in Instant Delivery mode");
        return;
      }
      
      if (!isInstantDeliveryMode && isInstantDelivery && cartItems.length > 0) {
        toast.error("Please clear your cart before adding Instant Delivery items");
        return;
      }
      
      if (isInstantDelivery && !isInstantDeliveryAvailable) {
        toast.error("Instant delivery is only available between 12:00 AM and 2:00 PM");
        return;
      }
      
      const success = addToCart({ ...service, quantity });
      if (success) {
        setQuantity(1);
      }
    }
  };

  const handleVariantSelection = (variant, variantKey) => {
    if (isInstantDeliveryMode) {
      toast.error("Can't add regular items in Instant Delivery mode");
      return;
    }
    
    if (cartItems.length > 0 && hasAnyInstantItems) {
      toast.error("Please clear your cart before adding regular items");
      return;
    }
    
    const variantInCart = cartItems.find(item => item.id === variant.id);
    if (variantInCart) {
      // Update quantity if already in cart
      const newQuantity = variantInCart.quantity + variantQuantities[variantKey];
      const success = updateQuantity(variant.id, newQuantity);
      if (success) {
        toast.success(`${variant.displayName} updated in cart!`);
      }
    } else {
      // Add new item to cart
      const success = addToCart({ ...variant, quantity: variantQuantities[variantKey] });
      if (success) {
        toast.success(`${variant.displayName} added to cart!`);
      }
    }
  };

  const handleVariantQuantityChange = (variantKey, value) => {
    const newValue = Math.max(1, parseInt(value) || 1);
    setVariantQuantities(prev => ({ ...prev, [variantKey]: newValue }));
  };

  const incrementVariantQuantity = (variantKey) => {
    setVariantQuantities(prev => ({ ...prev, [variantKey]: prev[variantKey] + 1 }));
  };

  const decrementVariantQuantity = (variantKey) => {
    setVariantQuantities(prev => ({
      ...prev,
      [variantKey]: Math.max(1, prev[variantKey] - 1)
    }));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const originalPrice = service.unit === 'piece' || service.unit === 'pair' 
    ? service.rateByPiece 
    : service.rateByKg;
  const discountedPrice = service.unit === 'piece' || service.unit === 'pair' 
    ? service.discountedRateByPiece 
    : service.discountedRateByKg;
  const unitText = service.unit === 'piece' 
    ? 'per piece' 
    : service.unit === 'pair' 
      ? 'per pair' 
      : 'per kg';

  // Extract base service name for popup
  const baseServiceName = service.displayName.replace(/ - (WASH & FOLD|WASH & IRON)/i, '');
  
  // Define variant data for popup using prices from data.js
  const variants = [
    {
      id: `${service.id}-wf`,
      name: `${baseServiceName} - Wash & Fold`,
      description: `Washing and folding service for ${baseServiceName.toLowerCase()}.`,
      rateByPiece: service.washAndFoldPrice || 0,
      discountedRateByPiece: service.washAndFoldDiscountedPrice || 0,
      rateByKg: service.unit === 'kg' ? service.washAndFoldPrice : 0,
      discountedRateByKg: service.unit === 'kg' ? service.washAndFoldDiscountedPrice : 0,
      unit: service.unit,
      displayName: `${baseServiceName} - Wash & Fold`,
      customText: `₹${service.washAndFoldDiscountedPrice || 0}`,
      image: service.image,
      discount: service.unit === 'kg' ? 30 : Math.round(((service.washAndFoldPrice - service.washAndFoldDiscountedPrice) / service.washAndFoldPrice) * 100) || 25,
      categories: service.categories,
      isInstantDelivery: false
    },
    {
      id: `${service.id}-wi`,
      name: `${baseServiceName} - Wash & Iron`,
      description: `Washing and ironing service for ${baseServiceName.toLowerCase()}.`,
      rateByPiece: service.washAndIronPrice || 0,
      discountedRateByPiece: service.washAndIronDiscountedPrice || 0,
      rateByKg: service.unit === 'kg' ? service.washAndIronPrice : 0,
      discountedRateByKg: service.unit === 'kg' ? service.washAndIronDiscountedPrice : 0,
      unit: service.unit,
      displayName: `${baseServiceName} - Wash & Iron`,
      customText: `₹${service.washAndIronDiscountedPrice || 0}`,
      image: service.image,
      discount: service.unit === 'kg' ? 30 : Math.round(((service.washAndIronPrice - service.washAndIronDiscountedPrice) / service.washAndIronPrice) * 100) || 33,
      categories: service.categories,
      isInstantDelivery: false
    }
  ];

  // Check if we should use customText
  const useCustomText = isGeneralCategory && service.washAndFoldDiscountedPrice !== undefined;

  return (
    <div className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isInstantDelivery ? isInstantDeliveryAvailable ? 'border-2 border-amber-400' : 'border-2 border-gray-300' : ''}`}>
      {/* Discount Badge */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 animate-pulse">
        {service.discount}% OFF
      </div>
      
      {/* Instant Badge - Only visible on regular service page */}
      {isInstantDelivery && !service.hideInstantBadge && (
        <div className={`absolute top-4 left-4 bg-gradient-to-r ${isInstantDeliveryAvailable ? 'from-amber-500 to-orange-500' : 'from-gray-500 to-gray-600'} text-white text-xs font-bold px-3 py-1 rounded-full z-10 flex items-center`}>
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
          </svg>
          Same Day
          {!isInstantDeliveryAvailable && (
            <span className="ml-1 bg-red-800 text-white text-xs px-1 rounded-sm">
              Unavailable
            </span>
          )}
        </div>
      )}
      
      {/* Service Image */}
      <div className={`h-48 overflow-hidden ${(isInstantDelivery && !isInstantDeliveryAvailable) ? 'opacity-70' : ''}`}>
        <img
          loading="lazy"
          src={service.image} 
          alt={service.displayName} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      {/* Incompatible Mode Overlay */}
      {!isInCart && incompatibleMode && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-20">
          <div className="bg-white p-4 rounded-lg max-w-xs text-center">
            {isInstantDeliveryMode ? (
              <>
                <p className="text-amber-600 font-bold mb-1">⚡ Instant Delivery Mode Active</p>
                <p className="text-sm text-gray-700">
                  Your cart is set to instant delivery. Only items marked with ⚡ can be added.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  To add regular items, please clear your cart first.
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-700 font-bold mb-1">Regular Delivery Mode Active</p>
                <p className="text-sm text-gray-700">
                  Your cart contains regular items. Instant delivery items (⚡) can't be mixed with regular items.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  To add instant delivery items, please clear your cart first.
                </p>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Unavailable Instant Delivery Overlay - Only for instant delivery items */}
      {!isInCart && isInstantDelivery && !isInstantDeliveryAvailable && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-4 rounded-lg max-w-xs text-center">
            <svg className="w-10 h-10 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-700 font-bold mt-3 mb-1">Instant Delivery Unavailable</p>
            <p className="text-sm text-gray-600">
              Same-day delivery is only available between 12:00 AM and 2:00 PM.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Please check back during service hours.
            </p>
          </div>
        </div>
      )}
      
      {/* Variant Selection Popup */}
      {showPopup && isGeneralCategory && !isInstantDelivery && !skipPopup && (
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-white bg-opacity-90 rounded-t-xl shadow-xl p-3 z-30">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-base font-bold text-gray-800">
              Select {baseServiceName} Service
            </h4>
            <button
              onClick={() => setShowPopup(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {variants.map((variant, index) => {
            const variantKey = index === 0 ? 'wf' : 'wi';
            const variantInCart = cartItems.find(item => item.id === variant.id);
            return (
              <div
                key={variant.id}
                className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0"
              >
                <div className="flex-1 pr-3">
                  <p className="text-sm font-semibold text-gray-800">{variant.displayName}</p>
                  <p className="text-sm text-rose-500 font-bold mt-1">
                    {useCustomText ? variant.customText : (
                      <>
                        ₹{variant.discountedRateByPiece || variant.discountedRateByKg} {unitText}
                        <span className="text-gray-400 text-xs line-through ml-1">
                          ₹{variant.rateByPiece || variant.rateByKg}
                        </span>
                      </>
                    )}
                  </p>
                  {variantInCart && (
                    <p className="text-xs text-gray-500">
                      In cart: {variantInCart.quantity} {unitText}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => decrementVariantQuantity(variantKey)}
                      className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200 text-sm font-medium transition-colors duration-200"
                      disabled={variantQuantities[variantKey] <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={variantQuantities[variantKey]}
                      onChange={(e) => handleVariantQuantityChange(variantKey, e.target.value)}
                      className="w-8 h-6 text-center border-t border-b border-gray-300 bg-white text-sm font-medium"
                      min="1"
                    />
                    <button
                      onClick={() => incrementVariantQuantity(variantKey)}
                      className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200 text-sm font-medium transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleVariantSelection(variant, variantKey)}
                    className="px-2 py-1 rounded-lg text-xs font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Service Details */}
      <div className={`p-6 ${(isInstantDelivery && !isInstantDeliveryAvailable) ? 'opacity-70' : ''}`}>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {service.displayName}
          {isInstantDelivery && (
            <span className={`ml-2 inline-flex items-center text-xs font-medium ${isInstantDeliveryAvailable ? 'text-amber-600' : 'text-gray-500'}`}>
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
              </svg>
              {isInstantDeliveryAvailable ? 'Same Day' : 'Same Day (Unavailable)'}
            </span>
          )}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
        
        <div className="flex items-end justify-between">
          <div>
            {useCustomText ? (
              <span className="text-rose-500 font-bold text-lg">
                {service.customText}
              </span>
            ) : (
              <>
                <span className="text-gray-400 text-sm line-through mr-2">
                  ₹{originalPrice}
                </span>
                <span className="text-rose-500 font-bold text-lg">
                  ₹{discountedPrice}
                </span>
              </>
            )}
            <span className="block text-gray-500 text-xs mt-1">
              {unitText}
            </span>
            {isInstantDelivery && isInstantDeliveryAvailable && (
              <span className="block text-amber-600 text-xs mt-1 font-medium">
                Delivered by 10 PM today
              </span>
            )}
            {isInstantDelivery && !isInstantDeliveryAvailable && (
              <span className="block text-gray-500 text-xs mt-1">
                Available: 12:00 AM - 2:00 PM
              </span>
            )}
          </div>
          
          <div className="flex items-center">
            {isInCart && (
              <div className="flex items-center mr-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(service.id, cartItem.quantity - 1);
                  }}
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200 text-sm"
                  disabled={cartItem.quantity <= 1}
                >
                  -
                </button>
                <span className="w-8 h-6 flex items-center justify-center border-t border-b border-gray-300 bg-white text-sm">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(service.id, cartItem.quantity + 1);
                  }}
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200 text-sm"
                >
                  +
                </button>
              </div>
            )}
            
            <button 
              onClick={handleCartAction}
              className={`px-4 py-2 rounded-lg text-sm font-medium hover:shadow-md transition-all ${
                isInCart 
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                  : isInstantDelivery && isInstantDeliveryAvailable
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                    : isInstantDelivery && !isInstantDeliveryAvailable
                      ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isDisabled}
            >
              {isInCart 
                ? 'Remove' 
                : isInstantDelivery && !isInstantDeliveryAvailable 
                  ? 'Not Available' 
                  : isInstantDelivery
                    ? 'Express Add'
                    : 'Add to Cart'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
