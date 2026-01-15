import React, { useEffect, useState } from 'react';
import ServiceCard from './NewServiceCard';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, StarIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

const PremiumServices = ({ services, loading, onBackToRegular }) => {
  // State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Log props when component renders or services change
  useEffect(() => {
    console.log('PremiumServices Props:', {
      services: services,
      loading: loading,
      onBackToRegular: typeof onBackToRegular,
      selectedCategory: selectedCategory
    });
  }, [services, loading, onBackToRegular, selectedCategory]);

  // Filter services based on selected category
  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.categories.includes(selectedCategory));

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for individual service cards
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  // Category options for filter
  const categoryOptions = [
    { id: 'all', name: 'All' },
    { id: 'general', name: 'General' },
    { id: 'others', name: 'Others' }
  ];

  return (
    <motion.div
      className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <motion.h3
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ✨ Premium Services
          </motion.h3>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Experience luxury cleaning with faster delivery, expert care, and premium quality.
          </p>
          {/* Decorative underline */}
          <div className="mt-4 h-1 w-32 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Features Highlight */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <motion.div
            className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md"
            variants={cardVariants}
          >
            <StarIcon className="h-8 w-8 text-yellow-500" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Premium Quality</h4>
              <p className="text-gray-600">Top-tier cleaning for your garments.</p>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md"
            variants={cardVariants}
          >
            <ClockIcon className="h-8 w-8 text-purple-500" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Fast Delivery</h4>
              <p className="text-gray-600">Priority processing in 72 hours.</p>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md"
            variants={cardVariants}
          >
            <ShieldCheckIcon className="h-8 w-8 text-pink-500" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Expert Care</h4>
              <p className="text-gray-600">Handled by our best professionals.</p>
            </div>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex justify-center space-x-4">
          {categoryOptions.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold text-base transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-purple-200 hover:bg-purple-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500 mx-auto" />
            <p className="mt-4 text-gray-600">Loading premium services...</p>
          </div>
        )}

        {/* Premium Services List */}
        {!loading && filteredServices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <motion.div key={service.id} variants={cardVariants} className="relative">
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs font-bold px-3 py-1 rounded-full z-20 shadow-md">
                  VIP
                </div>
                <ServiceCard
                  service={{
                    ...service,
                    isPremium: true,
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* No Services Message */}
        {!loading && filteredServices.length === 0 && (
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
            <h3 className="mt-2 text-lg font-medium text-gray-900">No premium services found</h3>
            <p className="mt-1 text-gray-500">
              {selectedCategory === 'all'
                ? 'Please check back later for exclusive premium offerings.'
                : `No premium services found in the ${selectedCategory} category.`}
            </p>
          </div>
        )}

        {/* Back to Regular Services Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onBackToRegular}
            className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-lg bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 transition-all duration-300"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Regular Services
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumServices;