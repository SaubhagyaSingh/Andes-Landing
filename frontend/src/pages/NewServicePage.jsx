// import React, { useState, useEffect } from 'react';
// import ServiceFilters from '../components/NewServiceFilters';
// import ServiceList from '../components/NewServiceList';
// import PricingHighlights from '../components/PricingHighlights';
// import InstantDeliverySection from '../components/InstantDeliverySection';
// import ServiceCard from '../components/NewServiceCard';
// import PremiumServices from '../components/PremiumServices';
// import {Helmet} from 'react-helmet-async';

// const ServicesPage = ({ data }) => {
//   const [selectedMode, setSelectedMode] = useState('all');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showingInstantServices, setShowingInstantServices] = useState(false);
//   const [showingPremiumServices, setShowingPremiumServices] = useState(false);
//   const [premiumServices, setPremiumServices] = useState([]);
//   const [loadingPremium, setLoadingPremium] = useState(false);

//   // Make sure instantDeliveryServices exists with a fallback
//   const instantDeliveryServices = data.instantDeliveryServices || [];

//   // Load premium services on component mount
//   useEffect(() => {
//     const loadPremiumServices = async () => {
//       if (data.fetchPremiumServices) {
//         setLoadingPremium(true);
//         try {
//           await data.fetchPremiumServices();
//           setPremiumServices(data.premiumServices || []);
//         } catch (error) {
//           console.error('Error loading premium services:', error);
//         } finally {
//           setLoadingPremium(false);
//         }
//       }
//     };

//     loadPremiumServices();

//     // Subscribe to real-time updates if available
//     let unsubscribe;
//     if (data.subscribeToPremiumServices) {
//       unsubscribe = data.subscribeToPremiumServices((services) => {
//         setPremiumServices(services);
//         setLoadingPremium(false);
//       });
//     }

//     return () => {
//       if (unsubscribe) unsubscribe();
//     };
//   }, [data]);

//   // Filter services based on current view and filters
//   const filteredServices = data.services.filter(service => {
//     // If showing instant or premium services, don't show regular services
//     if (showingInstantServices || showingPremiumServices) {
//       return false;
//     }
    
//     // Filter by mode
//     const modeMatch = selectedMode === 'all' || 
//       (selectedMode === 'piece' && (service.unit === 'piece' || service.unit === 'pair')) || 
//       (selectedMode === 'kg' && service.unit === 'kg');
    
//     // Filter by category
//     const categoryMatch = selectedCategory === 'all' || service.categories.includes(selectedCategory);
    
//     // Filter by search query (case insensitive)
//     const searchMatch = service.displayName.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                        service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
//     return modeMatch && categoryMatch && searchMatch;
//   });

//   const handleInstantViewToggle = (showInstant) => {
//     setShowingInstantServices(showInstant);
//     setShowingPremiumServices(false); // Hide premium when showing instant
    
//     // Reset other filters when switching to instant view
//     if (showInstant) {
//       setSelectedMode('all');
//       setSelectedCategory('all');
//       setSearchQuery('');
//     }
//   };

//   const handlePremiumViewToggle = (showPremium) => {
//     setShowingPremiumServices(showPremium);
//     setShowingInstantServices(false); // Hide instant when showing premium
    
//     // Reset other filters when switching to premium view
//     if (showPremium) {
//       setSelectedMode('all');
//       setSelectedCategory('all');
//       setSearchQuery('');
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Andes Laundry - Services</title>
//         <meta name="description" content="Explore our laundry services and pricing, including instant delivery and premium options." />
//       </Helmet>
//       <div className="min-h-screen bg-gray-50 mt-16">
//         <div className="py-12 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Page Header */}
//             <div className="text-center mb-12">
//               <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
//                 Services & Pricing
//               </h1>
//               <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
//                 Professional cleaning services tailored to your needs
//               </p>
//             </div>
            
//             {/* Pricing Highlights */}
//             <PricingHighlights />
            
//             {/* Service Type Toggle Buttons */}
//             <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
//               {/* Regular Services Button */}
//               <button
//                 onClick={() => {
//                   setShowingInstantServices(false);
//                   setShowingPremiumServices(false);
//                 }}
//                 className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
//                   !showingInstantServices && !showingPremiumServices
//                     ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
//                     : 'bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50'
//                 }`}
//               >
//                 Regular Services
//               </button>

//               {/* Instant Delivery Button */}
//               <button
//                 onClick={() => handleInstantViewToggle(true)}
//                 className={`relative px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
//                   showingInstantServices
//                     ? 'bg-amber-500 text-white shadow-lg transform scale-105'
//                     : 'bg-white text-amber-600 border-2 border-amber-500 hover:bg-amber-50'
//                 }`}
//               >
//                 <span className="flex items-center gap-2">
//                   ⚡ Instant Delivery
//                   {!showingInstantServices && (
//                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//                       Same Day
//                     </span>
//                   )}
//                 </span>
//               </button>

//               {/* Premium Services Button */}
//               <button
//                 onClick={() => handlePremiumViewToggle(true)}
//                 className={`relative px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 overflow-hidden ${
//                   showingPremiumServices
//                     ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-gold-500 text-white shadow-xl transform scale-105'
//                     : 'bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-yellow-600 shadow-lg'
//                 }`}
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   ✨ Premium Services
//                   {!showingPremiumServices && (
//                     <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs px-2 py-1 rounded-full font-bold">
//                       VIP
//                     </span>
//                   )}
//                 </span>
//                 {/* Animated background for premium button */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                
//                 {/* Sparkle effect */}
//                 {!showingPremiumServices && (
//                   <div className="absolute inset-0 overflow-hidden">
//                     <div className="absolute top-0 left-0 w-full h-full">
//                       <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
//                       <div className="absolute top-3 right-3 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
//                       <div className="absolute bottom-2 left-1/2 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
//                     </div>
//                   </div>
//                 )}
//               </button>
//             </div>
            
//             {/* Only show search and filters if not in instant delivery or premium mode */}
//             {!showingInstantServices && !showingPremiumServices && (
//               <>
//                 {/* Search Bar */}
//                 <div className="mb-8">
//                   <div className="relative max-w-md mx-auto">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <input
//                       type="text"
//                       className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                       placeholder="Search services..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                     {searchQuery && (
//                       <button
//                         onClick={() => setSearchQuery('')}
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                       >
//                         <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>
//                     )}
//                   </div>
//                 </div>
                
//                 {/* Filters */}
//                 <div className="space-y-8">
//                   <ServiceFilters 
//                     serviceModes={data.serviceModes}
//                     serviceCategories={data.serviceCategories}
//                     selectedMode={selectedMode}
//                     selectedCategory={selectedCategory}
//                     onModeChange={setSelectedMode}
//                     onCategoryChange={setSelectedCategory}
//                   />
//                 </div>
//               </>
//             )}
            
//             {/* Service List - Regular Services */}
//             {!showingInstantServices && !showingPremiumServices && filteredServices.length > 0 && (
//               <div className="mt-8">
//                 <ServiceList services={filteredServices} />
//               </div>
//             )}
            
//             {/* Service List - Instant Services */}
//             {showingInstantServices && instantDeliveryServices.length > 0 && (
//               <div>
//                 <div className="text-center mb-8">
//                   <h3 className="text-3xl font-bold text-amber-600 mb-2">⚡ Instant Delivery Services</h3>
//                   <p className="text-gray-600 text-lg">Same-day delivery when ordered before 2 PM</p>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {instantDeliveryServices.map(service => (
//                     <div key={service.id} className="relative">
//                       <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20 shadow-md">
//                         Same Day ⚡
//                       </div>
//                       <ServiceCard service={{...service, instantDelivery: true}} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
            
//             {/* Service List - Premium Services */}
//             {showingPremiumServices && (
//               <PremiumServices 
//                 services={premiumServices} 
//                 loading={loadingPremium}
//                 onBackToRegular={() => setShowingPremiumServices(false)}
//               />
//             )}
            
//             {/* No Results Message */}
//             {!showingInstantServices && !showingPremiumServices && filteredServices.length === 0 && (
//               <div className="text-center py-12">
//                 <svg
//                   className="mx-auto h-12 w-12 text-gray-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1}
//                     d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <h3 className="mt-2 text-lg font-medium text-gray-900">No services found</h3>
//                 <p className="mt-1 text-gray-500">
//                   Try adjusting your search or filter to find what you're looking for.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ServicesPage;







// //after removing all categories button
// import React, { useState, useEffect } from 'react';
// import ServiceFilters from '../components/NewServiceFilters';
// import ServiceList from '../components/NewServiceList';
// import PricingHighlights from '../components/PricingHighlights';
// import InstantDeliverySection from '../components/InstantDeliverySection';
// import ServiceCard from '../components/NewServiceCard';
// // import PremiumServices from '../components/PremiumServices';
// import { Helmet } from 'react-helmet-async';

// const ServicesPage = ({ data }) => {
//   const [selectedMode, setSelectedMode] = useState('all');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showingInstantServices, setShowingInstantServices] = useState(false);
//   // const [showingPremiumServices, setShowingPremiumServices] = useState(false);
//   // const [premiumServices, setPremiumServices] = useState([]);
//   // const [loadingPremium, setLoadingPremium] = useState(false);

//   // Make sure instantDeliveryServices exists with a fallback
//   const instantDeliveryServices = data.instantDeliveryServices || [];

//   // // Load premium services on component mount
//   // useEffect(() => {
//   //   const loadPremiumServices = async () => {
//   //     if (data.fetchPremiumServices) {
//   //       setLoadingPremium(true);
//   //       try {
//   //         await data.fetchPremiumServices();
//   //         setPremiumServices(data.premiumServices || []);
//   //       } catch (error) {
//   //         console.error('Error loading premium services:', error);
//   //       } finally {
//   //         setLoadingPremium(false);
//   //       }
//   //     }
//   //   };
//   //
//   //   loadPremiumServices();
//   //
//   //   // Subscribe to real-time updates if available
//   //   let unsubscribe;
//   //   if (data.subscribeToPremiumServices) {
//   //     unsubscribe = data.subscribeToPremiumServices((services) => {
//   //       setPremiumServices(services);
//   //       setLoadingPremium(false);
//   //     });
//   //   }
//   //
//   //   return () => {
//   //     if (unsubscribe) unsubscribe();
//   //   };
//   // }, [data]);

//   // Filter services based on current view and filters
//   const filteredServices = data.services.filter(service => {
//     // If showing instant services, don't show regular services
//     if (showingInstantServices /* || showingPremiumServices */) {
//       return false;
//     }
    
//     // Filter by mode
//     const modeMatch = selectedMode === 'all' || 
//       (selectedMode === 'piece' && (service.unit === 'piece' || service.unit === 'pair')) || 
//       (selectedMode === 'kg' && service.unit === 'kg');
    
//     // Filter by category
//     const categoryMatch = selectedCategory === 'all' || service.categories.includes(selectedCategory);
    
//     // Filter by search query (case insensitive)
//     const searchMatch = service.displayName.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                        service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
//     return modeMatch && categoryMatch && searchMatch;
//   });

//   const handleInstantViewToggle = (showInstant) => {
//     setShowingInstantServices(showInstant);
//     // setShowingPremiumServices(false); // Hide premium when showing instant
    
//     // Reset other filters when switching to instant view
//     if (showInstant) {
//       setSelectedMode('all');
//       setSelectedCategory('all');
//       setSearchQuery('');
//     }
//   };

//   // const handlePremiumViewToggle = (showPremium) => {
//   //   setShowingPremiumServices(showPremium);
//   //   setShowingInstantServices(false); // Hide instant when showing premium
//   //   
//   //   // Reset other filters when switching to premium view
//   //   if (showPremium) {
//   //     setSelectedMode('all');
//   //     setSelectedCategory('all');
//   //     setSearchQuery('');
//   //   }
//   // };

//   return (
//     <>
//       <Helmet>
//         <title>Andes Laundry - Services</title>
//         <meta name="description" content="Explore our laundry services and pricing, including instant delivery options." />
//       </Helmet>
//       <div className="min-h-screen bg-gray-50 mt-16">
//         <div className="py-12 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Page Header */}
//             <div className="text-center mb-12">
//               <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
//                 Services & Pricing
//               </h1>
//               <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
//                 Professional cleaning services tailored to your needs
//               </p>
//             </div>
            
//             {/* Pricing Highlights */}
//             <PricingHighlights />
            
//             {/* Service Type Toggle Buttons */}
//             <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
//               {/* Regular Services Button */}
//               <button
//                 onClick={() => {
//                   setShowingInstantServices(false);
//                   // setShowingPremiumServices(false);
//                 }}
//                 className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
//                   !showingInstantServices /* && !showingPremiumServices */
//                     ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
//                     : 'bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50'
//                 }`}
//               >
//                 Regular Services
//               </button>

//               {/* Instant Delivery Button */}
//               <button
//                 onClick={() => handleInstantViewToggle(true)}
//                 className={`relative px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
//                   showingInstantServices
//                     ? 'bg-amber-500 text-white shadow-lg transform scale-105'
//                     : 'bg-white text-amber-600 border-2 border-amber-500 hover:bg-amber-50'
//                 }`}
//               >
//                 <span className="flex items-center gap-2">
//                   ⚡ Instant Delivery
//                   {!showingInstantServices && (
//                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//                       Same Day
//                     </span>
//                   )}
//                 </span>
//               </button>

//               {/* Premium Services Button */}
//               {/* <button
//                 onClick={() => handlePremiumViewToggle(true)}
//                 className={`relative px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 overflow-hidden ${
//                   showingPremiumServices
//                     ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-gold-500 text-white shadow-xl transform scale-105'
//                     : 'bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-yellow-600 shadow-lg'
//                 }`}
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   ✨ Premium Services
//                   {!showingPremiumServices && (
//                     <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs px-2 py-1 rounded-full font-bold">
//                       VIP
//                     </span>
//                   )}
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                
//                 <div className="absolute inset-0 overflow-hidden">
//                   <div className="absolute top-0 left-0 w-full h-full">
//                     <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
//                     <div className="absolute top-3 right-3 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
//                     <div className="absolute bottom-2 left-1/2 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
//                   </div>
//                 </div>
//               </button> */}
//             </div>
            
//             {/* Only show search and filters if not in instant delivery mode */}
//             {!showingInstantServices /* && !showingPremiumServices */ && (
//               <>
//                 {/* Search Bar */}
//                 <div className="mb-8">
//                   <div className="relative max-w-md mx-auto">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <input
//                       type="text"
//                       className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                       placeholder="Search services..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                     {searchQuery && (
//                       <button
//                         onClick={() => setSearchQuery('')}
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                       >
//                         <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>
//                     )}
//                   </div>
//                 </div>
                
//                 {/* Filters */}
//                 <div className="space-y-8">
//                   <ServiceFilters 
//                     serviceModes={data.serviceModes}
//                     serviceCategories={data.serviceCategories}
//                     selectedMode={selectedMode}
//                     selectedCategory={selectedCategory}
//                     onModeChange={setSelectedMode}
//                     onCategoryChange={setSelectedCategory}
//                   />
//                 </div>
//               </>
//             )}
            
//             {/* Service List - Regular Services */}
//             {!showingInstantServices /* && !showingPremiumServices */ && filteredServices.length > 0 && (
//               <div className="mt-8">
//                 <ServiceList services={filteredServices} />
//               </div>
//             )}
            
//             {/* Service List - Instant Services */}
//             {showingInstantServices && instantDeliveryServices.length > 0 && (
//               <div>
//                 <div className="text-center mb-8">
//                   <h3 className="text-3xl font-bold text-amber-600 mb-2">⚡ Instant Delivery Services</h3>
//                   <p className="text-gray-600 text-lg">Same-day delivery when ordered before 2 PM</p>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {instantDeliveryServices.map(service => (
//                     <div key={service.id} className="relative">
//                       <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20 shadow-md">
//                         Same Day ⚡
//                       </div>
//                       <ServiceCard service={{ ...service, instantDelivery: true }} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
            
//             {/* Service List - Premium Services */}
//             {/* {showingPremiumServices && (
//               <PremiumServices 
//                 services={premiumServices} 
//                 loading={loadingPremium}
//                 onBackToRegular={() => setShowingPremiumServices(false)}
//               />
//             )} */}
            
//             {/* No Results Message */}
//             {!showingInstantServices /* && !showingPremiumServices */ && filteredServices.length === 0 && (
//               <div className="text-center py-12">
//                 <svg
//                   className="mx-auto h-12 w-12 text-gray-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1}
//                     d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <h3 className="mt-2 text-lg font-medium text-gray-900">No services found</h3>
//                 <p className="mt-1 text-gray-500">
//                   Try adjusting your search or filter to find what you're looking for.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ServicesPage;

//after adding first time load to general not all categories
import React, { useState, useEffect } from 'react';
import ServiceFilters from '../components/NewServiceFilters';
import ServiceList from '../components/NewServiceList';
import PricingHighlights from '../components/PricingHighlights';
import InstantDeliverySection from '../components/InstantDeliverySection';
import ServiceCard from '../components/NewServiceCard';
import { Helmet } from 'react-helmet-async';

const ServicesPage = ({ data }) => {
  const [selectedMode, setSelectedMode] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('general'); // Changed from 'all' to 'general'
  const [searchQuery, setSearchQuery] = useState('');
  const [showingInstantServices, setShowingInstantServices] = useState(false);

  // Make sure instantDeliveryServices exists with a fallback
  const instantDeliveryServices = data.instantDeliveryServices || [];

  // Filter services based on current view and filters
  const filteredServices = data.services.filter(service => {
    // If showing instant services, don't show regular services
    if (showingInstantServices) {
      return false;
    }
    
    // Filter by mode
    const modeMatch = selectedMode === 'all' || 
      (selectedMode === 'piece' && (service.unit === 'piece' || service.unit === 'pair')) || 
      (selectedMode === 'kg' && service.unit === 'kg');
    
    // Filter by category
    const categoryMatch = selectedCategory === 'all' || service.categories.includes(selectedCategory);
    
    // Filter by search query (case insensitive)
    const searchMatch = service.displayName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return modeMatch && categoryMatch && searchMatch;
  });

  const handleInstantViewToggle = (showInstant) => {
    setShowingInstantServices(showInstant);
    
    // Reset other filters when switching to instant view
    if (showInstant) {
      setSelectedMode('all');
      setSelectedCategory('general'); // Changed from 'all' to 'general'
      setSearchQuery('');
    }
  };

  return (
    <>
      <Helmet>
        <title>Andes Laundry - Services</title>
        <meta name="description" content="Explore our laundry services and pricing, including instant delivery options." />
      </Helmet>
      <div className="min-h-screen bg-gray-50 mt-16">
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Services & Pricing
              </h1>
              <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                Professional cleaning services tailored to your needs
              </p>
            </div>
            
            {/* Pricing Highlights */}
            <PricingHighlights />
            
            {/* Service Type Toggle Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              {/* Regular Services Button */}
              <button
                onClick={() => {
                  setShowingInstantServices(false);
                }}
                className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                  !showingInstantServices
                    ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50'
                }`}
              >
                Regular Services
              </button>

              {/* Instant Delivery Button */}
              <button
                onClick={() => handleInstantViewToggle(true)}
                className={`relative px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                  showingInstantServices
                    ? 'bg-amber-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-amber-600 border-2 border-amber-500 hover:bg-amber-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  ⚡ Instant Delivery
                  {!showingInstantServices && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Same Day
                    </span>
                  )}
                </span>
              </button>
            </div>
            
            {/* Only show search and filters if not in instant delivery mode */}
            {!showingInstantServices && (
              <>
                {/* Search Bar */}
                <div className="mb-8">
                  <div className="relative max-w-md mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                      placeholder="Search services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Filters */}
                <div className="space-y-8">
                  <ServiceFilters 
                    serviceModes={data.serviceModes}
                    serviceCategories={data.serviceCategories}
                    selectedMode={selectedMode}
                    selectedCategory={selectedCategory}
                    onModeChange={setSelectedMode}
                    onCategoryChange={setSelectedCategory}
                  />
                </div>
              </>
            )}
            
            {/* Service List - Regular Services */}
            {!showingInstantServices && filteredServices.length > 0 && (
              <div className="mt-8">
                <ServiceList services={filteredServices} />
              </div>
            )}
            
            {/* Service List - Instant Services */}
            {showingInstantServices && instantDeliveryServices.length > 0 && (
              <div>
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-amber-600 mb-2">⚡ Instant Delivery Services</h3>
                  <p className="text-gray-600 text-lg">Same-day delivery when ordered before 2 PM</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {instantDeliveryServices.map(service => (
                    <div key={service.id} className="relative">
                      <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20 shadow-md">
                        Same Day ⚡
                      </div>
                      <ServiceCard service={{ ...service, instantDelivery: true }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* No Results Message */}
            {!showingInstantServices && filteredServices.length === 0 && (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No services found</h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;