import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { 
  TruckIcon, 
  CheckIcon, 
  ClockIcon, 
  ShoppingBagIcon,
  ArrowPathIcon,
  MapPinIcon,
  PhoneIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const statusSteps = [
  { id: 'placed', name: 'Order Placed', icon: ShoppingBagIcon },
  { id: 'processing', name: 'Processing', icon: ArrowPathIcon },
  { id: 'picked', name: 'Picked Up', icon: TruckIcon },
  { id: 'cleaning', name: 'Cleaning', icon: ArrowPathIcon },
  { id: 'quality_check', name: 'Quality Check', icon: CheckIcon },
  { id: 'ready', name: 'Ready for Delivery', icon: CheckIcon },
  { id: 'delivering', name: 'Delivery Partner On Way', icon: TruckIcon },
  { id: 'delivered', name: 'Delivered', icon: CheckIcon },
];

const TrackOrder = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusTimes, setStatusTimes] = useState({});

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const q = query(collection(db, 'cartdetails'), where('orderNumber', '==', orderNumber));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          if (querySnapshot.empty) {
            throw new Error('Order not found');
          }

          const orderDoc = querySnapshot.docs[0];
          const data = orderDoc.data();
          
          if (!data.createdAt) {
            throw new Error('Invalid order data');
          }

          const orderDate = data.createdAt.toDate();
          
          // Calculate estimated times for each status based on order creation time
          const calculatedTimes = {
            placed: {
              time: orderDate.toLocaleString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                day: 'numeric',
                month: 'short'
              }),
              description: 'Order placed'
            },
            processing: {
              time: new Date(orderDate.getTime() + 30*60000).toLocaleString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                day: 'numeric',
                month: 'short'
              }),
              description: 'Within 30 minutes'
            },
            picked: {
              time: new Date(orderDate.getTime() + 2*3600*1000).toLocaleString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                day: 'numeric',
                month: 'short'
              }),
              description: 'Same day evening'
            },
            cleaning: {
              time: new Date(orderDate.getTime() + 24*3600*1000).toLocaleString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                day: 'numeric',
                month: 'short'
              }),
              description: 'Next day morning'
            },
            quality_check: {
              time: new Date(orderDate.getTime() + 28*3600*1000).toLocaleString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                day: 'numeric',
                month: 'short'
              }),
              description: 'Next day afternoon'
            },
            ready: {
              time: new Date(orderDate.getTime() + 32*3600*1000).toLocaleString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                day: 'numeric',
                month: 'short'
              }),
              description: 'Next day evening'
            },
            delivering: {
              time: new Date(orderDate.getTime() + 34*3600*1000).toLocaleString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                day: 'numeric',
                month: 'short'
              }),
              description: 'Next day night'
            },
            delivered: {
              time: new Date(orderDate.getTime() + 36*3600*1000).toLocaleString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                day: 'numeric',
                month: 'short'
              }),
              description: 'Within 48 hours'
            }
          };

          setStatusTimes(calculatedTimes);
          
          setOrder({ 
            id: orderDoc.id,
            orderNumber: data.orderNumber,
            status: data.status || 'placed',
            items: Object.entries(data.services || {}).map(([name, details]) => ({ 
              name, 
              quantity: Number(details.quantity) || Number(details) || 0 
            })),
            totalCost: data.totalCost || 0,
            address: data.address || 'Address not specified',
            userMobile: data.userMobile || 'Not provided',
            createdAt: orderDate,
            statusUpdatedAt: data.statusUpdatedAt?.toDate() || orderDate,
            orderType: data.orderType || 'standard', // Use raw orderType
            deliveryWindow: data.deliveryWindow || 'N/A' // Added deliveryWindow
          });
          console.log('Order fetched:', data);
          
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching order:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-medium text-gray-700 mb-4">{error}</h2>
        <Link to="/my-orders" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200">
          Back to Orders
        </Link>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const currentStatusIndex = statusSteps.findIndex(step => step.id === order.status);
  const orderDate = order.createdAt.toLocaleString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Determine styling for orderType
  const orderTypeStyle = order.orderType === 'premium_only'
    ? 'bg-yellow-100 text-yellow-800'
    : order.orderType === 'rush_hour'
      ? 'bg-amber-100 text-amber-900'
      : 'bg-gray-100 text-gray-800';

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-20">
      <Helmet>
        <title>Track Order #{order.orderNumber} - Andes Laundry</title>
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Order Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Order #{order.orderNumber}</h1>
              <p className="text-gray-500 mt-1">Placed on {orderDate}</p>
            </div>
            <div className="mt-3 md:mt-0 flex space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' ')}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${orderTypeStyle}`}>
                {order.orderType === 'premium' && (
                  <span className="mr-1">✨</span>
                )}
                {order.orderType === 'rush_hour' && (
                  <span className="mr-1">⚡</span>
                )}
                {order.orderType}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Estimated Delivery</p>
              <p className="font-medium flex items-center">
                {order.orderType === 'premium_only' && (
                  <span className="mr-1 text-yellow-600">✨</span>
                )}
                {order.orderType === 'rush_hour' && (
                  <span className="mr-1 text-amber-600">⚡</span>
                )}
                {order.deliveryWindow}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-medium">₹{order.totalCost?.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-medium">Cash on Delivery</p>
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        {order.orderType === 'standard' && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Status (only For Standard Order)</h2>
            
            <div className="relative">
              {/* Progress line */}
              <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200">
                <div 
                  className="bg-green-500 w-0.5 absolute top-0 left-0 transition-all duration-700 ease-in-out"
                  style={{ 
                    height: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%` 
                  }}
                ></div>
              </div>

              {/* Timeline items */}
              <div className="space-y-8">
                {statusSteps.map((step, index) => {
                  const isCompleted = index <= currentStatusIndex;
                  const isCurrent = index === currentStatusIndex;
                  const Icon = step.icon;
                  const statusTime = statusTimes[step.id];

                  return (
                    <div key={step.id} className="relative flex items-start group">
                      <div className={`absolute left-5 top-0 h-10 w-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 transform hover:scale-110
                        ${isCompleted ? 'bg-green-500 text-white' : 
                          isCurrent ? 'bg-blue-100 border-4 border-blue-500 text-blue-500' : 
                          'bg-white border-4 border-gray-200 text-gray-400'}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className={`ml-16 pb-8 ${index !== statusSteps.length - 1 ? 'border-b border-gray-100' : ''}`}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h3 className={`text-lg font-medium ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'}`}>
                            {step.name}
                          </h3>
                          {statusTime && (
                            <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                              {statusTime.time} {statusTime.description && `(${statusTime.description})`}
                            </span>
                          )}
                        </div>
                        {isCurrent && order.status !== 'delivered' && (
                          <p className="text-blue-500 text-sm mt-1 flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" /> In progress
                          </p>
                        )}
                        {isCompleted && (
                          <p className="text-green-500 text-sm mt-1 flex items-center">
                            <CheckIcon className="h-4 w-4 mr-1" /> Completed
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Information</h2>
          
          <div className="flex items-start mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <MapPinIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Delivery Address</h3>
              <p className="text-gray-600">{order.address}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <PhoneIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Delivery Partner</h3>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center">
                  <PhoneIcon className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-gray-600">86260 76578</span>
                </div>
                <a 
                  href={`https://wa.me/918626076578?text=Regarding order ${order.orderNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center text-green-600 hover:text-green-800 transition duration-150"
                >
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <a 
                  href="tel:74994 13025"
                  className="flex items-center text-blue-600 hover:text-blue-800 transition duration-150"
                >
                  <PhoneIcon className="h-4 w-4 mr-1" />
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link 
            to="/my-orders" 
            className="flex items-center text-blue-600 hover:text-blue-800 transition duration-150"
          >
            ← Back to Orders
          </Link>
          <Link 
            to="/services" 
            className="flex items-center text-blue-600 hover:text-blue-800 transition duration-150"
          >
            Browse Services →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;