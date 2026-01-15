// components/ProcessDetail.js
import React, { useState } from 'react';
import { XMarkIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const ProcessDetail = ({ type, onClose }) => {
  const [expandedStep, setExpandedStep] = useState(null);
  
  const processData = {
    washAndFold: {
      title: "🧺 Wash & Fold Process",
      subtitle: "Simple, gentle, and handled with care",
      description: "When customers choose Wash & Fold, they're trusting us with their everyday essentials — their favorite t-shirts, comfy pajamas, gym wear, and everything in between. At Andes, we treat them like they're our own.",
      steps: [
        {
          title: "Sorting with Sensitivity",
          description: "Clothes are carefully sorted by fabric type, color group, and any delicate/miscellaneous items. This ensures that nothing gets damaged or discolored.",
          duration: "5-10 mins",
          icon: "🧺"
        },
        {
          title: "Stain Check",
          description: "Every item is personally inspected for stains. If we spot anything, we pre-treat it with a gentle but powerful stain remover — not a splash more than necessary.",
          duration: "3-5 mins",
          icon: "🔍"
        },
        {
          title: "Washing with Precision",
          description: "Clothes go into high-efficiency washing machines. We use measured detergent to protect the fabric. Wash cycle runs for 51 minutes — balanced to be thorough yet gentle.",
          duration: "51 mins",
          icon: "🧼"
        },
        {
          title: "Rinse & Rewash if Needed",
          description: "After washing, clothes are checked again. If a stain remains, we rewash it without hesitation — because almost clean isn't good enough.",
          duration: "Varies",
          icon: "🔄"
        },
        {
          title: "Drying Naturally",
          description: "Clothes are air-dried in a cool, well-ventilated room or placed in a dryer set for 30 minutes — depending on fabric need and weather conditions.",
          duration: "30-45 mins",
          icon: "☀️"
        },
        {
          title: "Folding with Love",
          description: "Once dried, our team folds each item neatly with practiced hands and a lot of heart. They're ready to return, looking fresh and feeling soft.",
          duration: "10-15 mins",
          icon: "👐"
        }
      ]
    },
    washAndIron: {
      title: "👔 Wash & Iron Process",
      subtitle: "Everyday elegance, delivered",
      description: "The Wash & Iron service is perfect for clothes that need a little extra love — office shirts, dresses, school uniforms, and semi-formals. It's for when looking crisp matters.",
      steps: [
        // Similar structure as washAndFold
      ]
    },
    dryCleaning: {
      title: "🧥 Dry Cleaning Process",
      subtitle: "For your finest clothes — treated with the utmost respect",
      description: "From wedding outfits to wool suits and silk sarees — dry cleaning is reserved for the garments closest to your heart. We understand the emotional and monetary value behind them.",
      steps: [
        // Similar structure as washAndFold
      ]
    },
    fullJourney: {
      title: "📱 Full Order Journey",
      subtitle: "From your phone to fresh clothes",
      description: "Here's what happens when you place an order through the Andes app",
      steps: [
        // All the steps from order placement to delivery
      ]
    }
  };

  const currentProcess = processData[type];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{currentProcess.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{currentProcess.subtitle}</h3>
          <p className="text-gray-600 mb-6">{currentProcess.description}</p>
          
          <div className="space-y-4">
            {currentProcess.steps.map((step, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50"
                  onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{step.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{step.title}</h4>
                      <span className="text-xs text-gray-500">{step.duration}</span>
                    </div>
                  </div>
                  {expandedStep === index ? (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {expandedStep === index && (
                  <div className="p-4 pt-0 bg-gray-50">
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Our Quality Promise</h4>
            <p className="text-blue-700 text-sm">
              At Andes, laundry is not just a task — it's a service built on trust. We know what your clothes mean to you. That's why we never cut corners, never skip steps, and always return your clothes fresh, folded, and ready to wear.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessDetail;