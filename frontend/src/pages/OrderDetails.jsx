import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { PhoneIcon } from '@heroicons/react/24/outline';

// Define available coupons to reference descriptions
const availableCoupons = [
  {
    code: 'FREE_DEL',
    description: 'Save ₹30 on orders above ₹50',
    discount: 30,
    minOrder: 50,
    type: 'delivery',
    autoApply: false
  },
  {
    code: 'Free Cadbury Chocolate',
    description: 'Free Cadbury Chocolate on orders above ₹300',
    discount: 0,
    minOrder: 300,
    type: 'gift',
    autoApply: true
  },
  {
    code: 'ANDES_NOW',
    description: 'Get ₹100 off on orders above ₹800',
    discount: 100,
    minOrder: 800,
    type: 'fixed',
    autoApply: false
  },
  {
    code: 'MEGH_SHAH',
    description: '20% off (up to ₹200) + FREE delivery on orders above ₹800',
    discount: 0.2,
    maxDiscount: 200,
    minOrder: 800,
    type: 'percentage',
    autoApply: false
  },
  {
    code: 'INSTANT_FREE_DELIVERY',
    description: 'Free delivery on Instant Delivery orders above ₹199',
    discount: 25,
    minOrder: 199,
    type: 'delivery',
    autoApply: true,
    onlyForInstantDelivery: true
  }
];

const OrderDetails = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const q = query(collection(db, 'cartdetails'), where('orderNumber', '==', orderNumber));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setOrder({ id: doc.id, ...doc.data() });
        } else {
          setError('Order not found');
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  if (loading) {
    return <div className="text-center py-12">Loading order details...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <Link to="/my-orders" className="text-blue-600 mt-4 inline-block">
          Back to Orders
        </Link>
      </div>
    );
  }



  // Get coupon description
  const appliedCoupon = order.appliedCoupon
    ? availableCoupons.find(coupon => coupon.code === order.appliedCoupon)
    : null;

  // Safely get orderType from order, fallback to empty string if undefined
  const orderType = order.orderType || '';

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-20">
      <Helmet>
        <title>Order #{orderNumber} - Andes Laundry</title>
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Order #{order.orderNumber}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-2">Status</h2>
              <p className="capitalize">{order.status}</p>
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-2">Order Type</h2>
              <p className="flex items-center">
                {orderType === 'rush_hour' && (
                  <span className="text-amber-600 mr-2">⚡</span>
                )}
                {orderType === 'premium_only' && (
                  <span className="text-yellow-600 mr-2">✨</span>
                )}
                {orderType}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-2">Delivery Address</h2>
              <p>{order.address}</p>
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-2">Contact</h2>
              <p>{order.userMobile}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-2">Order Schedule</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Pickup Time</span>
                <span>{order.pickupTime}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Delivery Window</span>
                <span>
                  {order.deliveryWindow}
                  {orderType === 'Premium' && (
                    <span className="ml-2 text-yellow-600">✨</span>
                  )}
                  {orderType === 'Instant Delivery' && (
                    <span className="ml-2 text-amber-600">⚡</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Your Order Details</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {Object.entries(order.services).map(([name, quantity]) => (
        <div key={name} className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 transition-colors">
          <span className="text-gray-700 font-medium">{name}</span>
          <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md text-sm">
            {quantity} {quantity === 1 ? 'item' : 'items'}
          </span>
        </div>
      ))}
              </div>
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Total Items</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {order.totalItems} {order.totalItems === 1 ? 'item' : 'items'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-medium text-gray-800 mb-2">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>
                  {order.deliveryFee === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `₹${order.deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Convenience Fee</span>
                <span>₹{order.convenienceFee}</span>
              </div>
              {order.paperBag && (
                <div className="flex justify-between">
                  <span>Paper Bag</span>
                  <span>₹{order.paperBagFee}</span>
                </div>
              )}
              {appliedCoupon && (
                <div className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-md shadow-sm">
                  <div>
                    <span className="text-gray-700 font-medium">Coupon ({appliedCoupon.code})</span>
                    <p className="text-sm text-gray-500">{appliedCoupon.description}</p>
                  </div>
                  <span className="text-green-600 font-semibold">-₹{order.discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total</span>
                <span>₹{order.totalCost}</span>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-medium text-gray-900 mt-6 mb-4">Payment Information</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600">Cash on Delivery</p>
          </div>

          <div className="flex items-start bg-gray-50 rounded-lg p-4 mt-6">
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
                  className="flex items-center text-green-600 hover:text-green-800"
                >
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <a 
                  href="tel:74994 13025"
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <PhoneIcon className="h-4 w-4 mr-1" />
                  Call
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/my-orders"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back to Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;