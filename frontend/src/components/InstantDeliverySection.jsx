import React, { useState, useEffect } from 'react';
import { FaBolt, FaClock, FaShoppingBasket, FaInfoCircle } from 'react-icons/fa';

const InstantDeliverySection = ({ onToggleView, showingInstantServices }) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [nextDeliveryTime, setNextDeliveryTime] = useState('');
  
  // Check if instant delivery is available (12am to 2pm)
  const checkAvailability = () => {
    const now = new Date();
    const hours = now.getHours();
    
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Available from 0 (12am) to 14 (2pm)
    const available = hours >= 0 && hours < 14;
    setIsAvailable(available);
    
    if (available) {
      // Calculate remaining time until 2pm
      const minutesRemaining = (14 - hours) * 60 - minutes;
      const secondsRemaining = minutesRemaining * 60 - seconds;
      
      const hoursRemaining = Math.floor(minutesRemaining / 60);
      const mins = minutesRemaining % 60;
      const secs = seconds;
      
      setTimeRemaining(`${hoursRemaining.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`);
    } else {
      // Calculate time until next instant delivery period (midnight)
      let hoursUntilMidnight, minutesUntilMidnight, secondsUntilMidnight;
      
      if (hours >= 14) {
        // If it's after 2pm, calculate time until midnight
        hoursUntilMidnight = 23 - hours;
        minutesUntilMidnight = 59 - minutes;
        secondsUntilMidnight = 60 - seconds;
        
        if (secondsUntilMidnight === 60) {
          secondsUntilMidnight = 0;
          minutesUntilMidnight += 1;
        }
        
        if (minutesUntilMidnight === 60) {
          minutesUntilMidnight = 0;
          hoursUntilMidnight += 1;
        }
      } else {
        // This should never happen since we're in the else branch of isAvailable
        hoursUntilMidnight = 0;
        minutesUntilMidnight = 0;
        secondsUntilMidnight = 0;
      }
      
      setNextDeliveryTime(`${hoursUntilMidnight.toString().padStart(2, '0')}h ${minutesUntilMidnight.toString().padStart(2, '0')}m ${secondsUntilMidnight.toString().padStart(2, '0')}s`);
    }
  };
  
  useEffect(() => {
    checkAvailability();
    // Update every second to show real-time countdown
    const intervalId = setInterval(checkAvailability, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mb-12">
      <div className={`relative overflow-hidden rounded-2xl shadow-xl ${isAvailable ? 'bg-gradient-to-br from-amber-400 to-red-500' : 'bg-gradient-to-br from-gray-600 to-gray-800'} p-6 mb-6`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white bg-opacity-5 rounded-full transform -translate-x-20 translate-y-20"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="flex items-center bg-white bg-opacity-20 rounded-full p-2 mr-3">
                  <FaBolt className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Instant Delivery</h2>
                  <div className="flex items-center space-x-2">
                    {isAvailable ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-amber-600">
                        Available Now
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                        Currently Unavailable
                      </span>
                    )}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white bg-opacity-30 text-white">
                      Free delivery above ₹199
                    </span>
                  </div>
                </div>
              </div>
              
              {isAvailable ? (
                <p className="text-white text-opacity-90 mt-2 flex items-center">
                  <FaClock className="mr-2 opacity-70" /> Order before 2:00 PM for same-day delivery by 10:00 PM
                </p>
              ) : (
                <p className="text-white text-opacity-90 mt-2 flex items-center">
                  <FaInfoCircle className="mr-2 opacity-70" /> Browse instant services, but ordering only available 12:00 AM - 2:00 PM
                </p>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-3 border border-white border-opacity-30 flex flex-col items-center sm:items-end">
                <span className="text-white text-sm font-medium mb-1">
                  {isAvailable ? 'Offer ends in:' : 'Next window in:'}
                </span>
                <span className="text-white font-bold text-xl font-mono tracking-tight">
                  {isAvailable ? timeRemaining : nextDeliveryTime}
                </span>
              </div>
              
              <button
                onClick={() => onToggleView(!showingInstantServices)}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all shadow-lg flex items-center ${
                  showingInstantServices
                    ? 'bg-white text-amber-600 hover:bg-gray-100'
                    : isAvailable 
                      ? 'bg-amber-600 text-white border border-amber-300 hover:bg-amber-700 hover:shadow-xl'
                      : 'bg-gray-700 text-white border border-gray-300 hover:bg-gray-600'
                }`}
              >
                <FaShoppingBasket className="mr-2" />
                {showingInstantServices ? 'View All Services' : 'View Instant Services'}
              </button>
            </div>
          </div>
          
        
        </div>
      </div>
    </div>
  );
};

export default InstantDeliverySection;