import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../components/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import AddressForm from '../AddressForm';
import { doc, getDoc, updateDoc, collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import toast from 'react-hot-toast';

const CartSidebar = ({ isOpen, onClose }) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    clearCart,
    isInstantDeliveryMode,
    toggleInstantDeliveryMode,hasAnyPremiumItems
  } = useCart();

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [showMobilePrompt, setShowMobilePrompt] = useState(false);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paperBag, setPaperBag] = useState(false);
  const [showCoupons, setShowCoupons] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  
  const navigate = useNavigate();
  const sidebarRef = useRef();

  // Available coupons
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
      discount: 0.2, // 20%
      maxDiscount: 200,
      minOrder: 800,
      type: 'percentage',
      autoApply: false
    },
    // Add instant delivery free coupon
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

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking on a modal
      if (event.target.closest('.modal-container')) {
        return;
      }
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    if (userData?.uid) {
      fetchMobile(userData.uid);
      fetchUserAddress(userData.uid);
    }
    
    // Check for auto-apply coupons
    // Check if current applied coupon is still valid
    if (appliedCoupon && cartTotal < appliedCoupon.minOrder) {
      setAppliedCoupon(null);
      toast(`Coupon ${appliedCoupon.code} removed as order value dropped below ₹${appliedCoupon.minOrder}`);
    }
    
    checkAutoApplyCoupons();
  }, [cartTotal, isInstantDeliveryMode]); // Use isInstantDeliveryMode from context

  const checkAutoApplyCoupons = () => {
    // Remove any instant delivery coupon if instant delivery is not selected
    if (!isInstantDeliveryMode && appliedCoupon?.onlyForInstantDelivery) {
      setAppliedCoupon(null);
    }

    // First, check for instant delivery free delivery coupon
    if (isInstantDeliveryMode && cartTotal >= 199) {
      const instantDeliveryCoupon = availableCoupons.find(
        c => c.code === 'INSTANT_FREE_DELIVERY' && c.autoApply && cartTotal >= c.minOrder
      );
      
      if (instantDeliveryCoupon && 
          (!appliedCoupon || appliedCoupon.code !== instantDeliveryCoupon.code)) {
        setAppliedCoupon(instantDeliveryCoupon);
        toast.success(`Free delivery applied: Your order is eligible for free instant delivery!`);
        return;
      }
    }

    // If no instant delivery coupon applied, check other auto-apply coupons
    if (!appliedCoupon || appliedCoupon.onlyForInstantDelivery) {
      const autoCoupon = availableCoupons.find(
        c => c.autoApply && 
             cartTotal >= c.minOrder && 
             !c.onlyForInstantDelivery
      );
      
      if (autoCoupon) {
        setAppliedCoupon(autoCoupon);
        toast.success(`Coupon applied: ${autoCoupon.description}`);
      }
    }
  };

  const fetchUserAddress = async (uid) => {
    try {
      const q = query(collection(db, 'addresses'), where('userId', '==', uid));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const addressData = querySnapshot.docs[0].data();
        const formattedAddress = `${addressData.address}, ${addressData.landmark}, ${addressData.pincode} (${addressData.addressType})`;
        setAddress(formattedAddress);
      } else {
        setAddress(null);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress(null);
    }
  };

  const fetchMobile = async (uid) => {
    try {
      const userSnap = await getDoc(doc(db, 'users', uid));
      if (userSnap.exists()) {
        setMobileNumber(userSnap.data().mobile || '');
      }
    } catch (error) {
      console.error('Error fetching mobile:', error);
    }
  };
  const roundToTwo = (num) => Math.round(num * 100) / 100;

  const applyCoupon = (code) => {
    // Check if manually entering code
    console.log('Coupon code:', code);  
    if (code && typeof code === 'string') {
      const couponToApply = availableCoupons.find(c => c.code.toLowerCase() === code.toLowerCase());
      if (!couponToApply) {
        toast.error('Invalid coupon code');
        return;
      }
      code = couponToApply;
    }
    
    // Validate coupon
    if (cartTotal < code.minOrder) {
      toast.error(`Minimum order amount for this coupon is ₹${code.minOrder}`);
      return;
    }
    
    // Check if already applied
    if (appliedCoupon && appliedCoupon.code === code.code) {
      toast('This coupon is already applied');
      return;
    }
    
    // Check if this is an instant delivery only coupon
    if (code.onlyForInstantDelivery && !isInstantDeliveryMode) {
      toast.error('This coupon is only available for instant delivery orders');
      return;
    }
    
    // Remove any previously applied coupon
    if (appliedCoupon) {
      toast(`Replaced ${appliedCoupon.code} with ${code.code}`);
    }
    
    setAppliedCoupon(code);
    setCouponCode('');
    setShowCoupons(false);
    toast.success(`Coupon applied: ${code.description}`);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast('Coupon removed');
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    
    const { type, discount, maxDiscount } = appliedCoupon;
    
    if (type === 'fixed') {
      return discount;
    } else if (type === 'percentage') {
      const calculatedDiscount = cartTotal * discount;
      const finalDiscount = maxDiscount ? Math.min(calculatedDiscount, maxDiscount) : calculatedDiscount;
      return roundToTwo(finalDiscount);    
    } else if (type === 'delivery') {
      return 0; // Delivery discount is handled separately
    }
    return 0;
  };

  const calculateDeliveryFee = () => {
    // If coupon provides free delivery or it's a qualifying instant delivery order
    if (appliedCoupon?.type === 'delivery' || appliedCoupon?.code === 'MEGH_SHAH') {
      return 0;
    }
    
    // Regular delivery fee is 30, instant delivery fee is 25
    return isInstantDeliveryMode ? 25 : 30;
  };

  // Calculate total amount and check minimum order requirement
  const paperBagFee = paperBag ? 4 : 0;
  const deliveryFee = calculateDeliveryFee();
  const discountAmount = calculateDiscount();
  const subtotalAfterDiscount = Math.max(0, cartTotal - discountAmount);
  const totalAmount = subtotalAfterDiscount + deliveryFee + 8 + paperBagFee;
  const meetsMinimum = totalAmount >= 50;

  const handleCheckout = async () => {
    setIsLoading(true);
    
    // Check minimum order amount first
    if (!meetsMinimum) {
      toast.error(`Minimum order amount is ₹50 (current: ₹${totalAmount})`);
      setIsLoading(false);
      return;
    }

    if (!user) {
      alert('Please login to proceed.');
      setIsLoading(false);
      navigate('/'); // Redirect to login
      return;
    }

    if(!address) {
      alert('Please add a delivery address to proceed.');
      setShowAddressForm(true);
      setIsLoading(false);
      return;
    }

    if (!mobileNumber) {
      alert('Mobile number is required');
      setShowMobilePrompt(true);
      setIsLoading(false);
      return;
    }

    try {
      const orderNumber = await createOrder();
      clearCart();
      toast.success('Order placed successfully!');  
      navigate(`/order-confirmation/${orderNumber}`);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async () => {
    const services = cartItems.reduce((acc, item) => {
      acc[item.displayName] = item.quantity;
      return acc;
    }, {});

    const timestamp = Date.now();
    const orderNumber = `ORD-${timestamp}`;
    const paperBagFee = paperBag ? 4 : 0;
    const deliveryFee = calculateDeliveryFee();
    const discountAmount = calculateDiscount();

    const orderData = {
      userId: user.uid,
      userName: user.name || 'Anonymous',
      userMobile: mobileNumber,
      address: address,
      services: services,
      subtotal: cartTotal,
      deliveryFee: deliveryFee,
      convenienceFee: 8,
      paperBag: paperBag,
      orderType: isInstantDeliveryMode ? 'rush_hour' : hasAnyPremiumItems ? 'premium_only' : 'standard',
      totalItems: cartCount,
      paperBagFee: paperBagFee,
      pickupTime: isInstantDeliveryMode? " after 2:00 PM" :"6:00 PM - 10:00 PM",
      // Use the context value for instant delivery mode
      isInstantDelivery: isInstantDeliveryMode,
      // If instant delivery, set a faster delivery window
      deliveryWindow: isInstantDeliveryMode ? "Same day by 10:00 PM" : hasAnyPremiumItems ? '72 hrs': "Standard (24-48 hours)",
      discountAmount: discountAmount,
      appliedCoupon: appliedCoupon?.code || null,
      totalCost: cartTotal + deliveryFee + 8 + paperBagFee - discountAmount,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      orderTimestamp: timestamp,
      orderNumber: orderNumber,
    };

    await addDoc(collection(db, 'cartdetails'), orderData);
    return orderNumber;
  };

  const handleSaveMobile = async () => {
    if (mobileNumber.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        mobile: mobileNumber
      });
      setShowMobilePrompt(false);
      toast.success('Mobile number saved');
    } catch (error) {
      console.error('Error saving mobile:', error);
      alert('Failed to save mobile number');
    }
  };

  // Get the current time to check if instant delivery is available (12am to 2pm)
  const checkInstantDeliveryAvailability = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 0 && hours < 14; // Between 12am and 2pm
  };

  // Calculate time remaining for instant delivery
  const calculateTimeRemaining = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    const totalMinutesRemaining = (14 - hours) * 60 - minutes;
    const hoursRemaining = Math.floor(totalMinutesRemaining / 60);
    const minsRemaining = totalMinutesRemaining % 60;
    
    return `${hoursRemaining}h ${minsRemaining}m`;
  };

  // Check if instant delivery is available
  const instantDeliveryAvailable = checkInstantDeliveryAvailability();
  const timeRemaining = calculateTimeRemaining();

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Your Laundry Cart ({cartCount})
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartCount === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Your cart is empty</h3>
                <Link 
                  to="/services" 
                  onClick={onClose}
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Browse Services
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Instant Delivery Option - Only show if available */}
                {instantDeliveryAvailable && (
                  <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200 relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3 text-amber-500 text-xl">⚡</div>
                        <div>
                          <h3 className="font-medium text-gray-800">Instant Delivery</h3>
                          <p className="text-xs text-gray-600">Order now, receive by 10:00 PM today</p>
                          <p className="text-xs text-amber-600 font-medium mt-1">
                            {cartTotal >= 199 ? 'Free delivery on orders above ₹199' : 'Delivery charges: ₹25'}
                          </p>
                          <p className="text-xs text-amber-800">Offer ends in {timeRemaining}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isInstantDeliveryMode}
                            onChange={(e) => {
                              const success = toggleInstantDeliveryMode(e.target.checked);
                              if (!success) {
                                e.preventDefault();
                              }
                            }}
                            disabled={cartItems.length > 0}
                            className="sr-only peer"
                          />
                          <div className={`relative w-11 h-6 ${cartItems.length > 0 ? 'bg-gray-300' : 'bg-gray-200'} 
                            peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer 
                            peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                            after:start-[2px] after:bg-white after:border-gray-300 after:border 
                            after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600`}></div>
                        </label>
                      </div>
                    </div>
                    
                    {cartItems.length > 0 && (
                      <div className="mt-2 text-xs text-amber-700 bg-amber-50 p-2 rounded">
                        {isInstantDeliveryMode 
                          ? "Your cart contains instant delivery items. To switch to regular delivery, please clear your cart first."
                          : "Your cart contains regular delivery items. To switch to instant delivery, please clear your cart first."}
                      </div>
                    )}
                  </div>
                )}

                {/* Cart Items */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start p-4 border-b border-gray-100">
                      <div className="flex-shrink-0 w-20 h-20 border border-gray-200 rounded-md overflow-hidden mr-4">
                        <img
                          src={item.image}
                          alt={item.displayName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-800">
                            {item.displayName}
                            {(item.isInstantDelivery || item.instantDelivery) && (
                              <span className="ml-2 text-xs text-amber-600 font-medium">⚡ Same Day</span>
                            )}
                          </h3>
                          <button 
                            onClick={() => removeFromCart(item.id)} 
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                            >
                              -
                            </button>
                            <span className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-400 line-through mr-2">
                              ₹{(item.unit === 'piece' || item.unit === 'pair' ? item.rateByPiece : item.rateByKg) * item.quantity}
                            </span>
                            <span className="font-semibold text-blue-600">
                              ₹{(item.unit === 'piece' || item.unit === 'pair' ? item.discountedRateByPiece : item.discountedRateByKg) * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  
                  {!meetsMinimum && (
                    <div className="text-sm text-red-500 bg-red-50 p-2 rounded mb-4">
                      Minimum order amount is ₹50 (current: ₹{totalAmount})
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₹{cartTotal}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-gray-600">Coupon Applied</span>
                          <span className="block text-xs text-green-600">{appliedCoupon.description}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-green-600 mr-2">-₹{calculateDiscount()}</span>
                          <button 
                            onClick={removeCoupon}
                            className="text-xs text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {isInstantDeliveryMode ? 'Instant Delivery' : 'Delivery'}
                        {isInstantDeliveryMode && cartTotal >= 199 && (
                          <span className="text-xs text-green-600 block">Free on orders above ₹199</span>
                        )}
                      </span>
                      <span className="font-medium">
                        {deliveryFee === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `₹${deliveryFee}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Convenience Fee</span>
                      <span className="font-medium">₹8</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="paperBag"
                          checked={paperBag}
                          onChange={(e) => setPaperBag(e.target.checked)}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor="paperBag" className="ml-2 text-sm text-gray-600">
                          Paper Bag (+₹4)
                        </label>
                      </div>
                      <span className="font-medium">{paperBag ? '₹4' : '₹0'}</span>
                    </div>

                    <div className="border-t border-gray-200 pt-3 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold text-blue-600">
                        ₹{totalAmount}
                      </span>
                    </div>
                  </div>

                  {/* Coupon Section */}
                  <div className="mt-6 space-y-3">
                    {!appliedCoupon ? (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-4 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-gray-800">Have a coupon code?</h3>
                          <button 
                            onClick={() => setShowCoupons(true)}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center"
                          >
                            View All Coupons
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="flex shadow-sm rounded-lg overflow-hidden">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter coupon code"
                            className="flex-grow px-4 py-3 text-sm border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                          />
                          <button
                            onClick={() => applyCoupon(couponCode)}
                            disabled={!couponCode.trim()}
                            className={`px-5 py-3 text-sm font-medium text-white transition-colors ${
                              couponCode.trim() 
                                ? 'bg-indigo-600 hover:bg-indigo-700' 
                                : 'bg-gray-400 cursor-not-allowed'
                            }`}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 shadow-sm relative">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center mb-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="font-semibold text-green-800">Coupon Applied</span>
                            </div>
                            <p className="text-green-700 text-sm">{appliedCoupon.description}</p>
                          </div>
                          <button
                            onClick={removeCoupon}
                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                            aria-label="Remove coupon"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        
                        {/* Coupon code badge */}
                        <div className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                          {appliedCoupon.code}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Address and Mobile */}
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">Address</span>
                      </div>
                      <button
                        onClick={() => setShowAddressForm(true)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {address ? 'Edit' : 'Add'}
                      </button>
                    </div>
                    {address ? (
                      <div className="text-sm text-gray-800 bg-white p-2 rounded border border-gray-200">
                        {address}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No address provided</p>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">Mobile</span>
                      </div>
                      <button
                        onClick={() => setShowMobilePrompt(true)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {mobileNumber ? 'Edit' : 'Add'}
                      </button>
                    </div>
                    <p className={`text-sm ${mobileNumber ? 'text-gray-800' : 'text-gray-500 italic'}`}>
                      {mobileNumber || 'No mobile number provided'}
                    </p>
                  </div>

                  {/* Clear Cart Button */}
                  {cartCount > 0 && (
                    <button 
                      onClick={clearCart}
                      className="mt-4 text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                    >
                      <svg className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Clear Cart
                    </button>
                  )}

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={isLoading || !meetsMinimum}
                    className={`mt-6 w-full py-3 rounded-lg transition duration-200 ${
                      isLoading || !meetsMinimum
                        ? 'bg-gray-400 cursor-not-allowed'
                        : isInstantDeliveryMode 
                          ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isLoading
                      ? 'Processing...'
                      : !meetsMinimum
                        ? `Add ₹${50 - totalAmount} more`
                        : isInstantDeliveryMode 
                          ? '⚡ Instant Checkout'
                          : 'Proceed to Checkout'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals (keep them inside the sidebar component) */}
      {showAddressForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 modal-container">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button 
              onClick={() => setShowAddressForm(false)}
              className="absolute top-2 right-2 text-xl text-gray-700"
            >
              ×
            </button>
            <AddressForm 
              onClose={() => {
                setShowAddressForm(false);
                if (user?.uid) fetchUserAddress(user.uid);
              }} 
              userId={user?.uid}
            />
          </div>
        </div>
      )}

      {showMobilePrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 modal-container">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button 
              onClick={() => setShowMobilePrompt(false)}
              className="absolute top-2 right-2 text-xl text-gray-700"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-4">Enter Mobile Number</h3>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="10-digit mobile number"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              maxLength="10"
            />
            <button
              onClick={handleSaveMobile}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Save Mobile Number
            </button>
          </div>
        </div>
      )}

      {showCoupons && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 modal-container">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative max-h-[80vh] overflow-y-auto">
            <button 
              onClick={() => setShowCoupons(false)}
              className="absolute top-2 right-2 text-xl text-gray-700"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-4">Available Coupons</h3>
            <div className="space-y-4">
              {availableCoupons.filter(coupon => 
                // Only show instant delivery coupons when instant delivery is selected
                !coupon.onlyForInstantDelivery || isInstantDeliveryMode
              ).map((coupon) => (
                <div key={coupon.code} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {coupon.code}
                        {coupon.onlyForInstantDelivery && (
                          <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                            Instant Only
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-gray-600">{coupon.description}</p>
                      <p className="text-xs text-gray-500 mt-1">Min. order: ₹{coupon.minOrder}</p>
                    </div>
                    <button
                      onClick={() => applyCoupon(coupon)}
                      disabled={cartTotal < coupon.minOrder || (coupon.onlyForInstantDelivery && !isInstantDeliveryMode)}
                      className={`px-3 py-1 rounded text-sm ${
                        cartTotal < coupon.minOrder || (coupon.onlyForInstantDelivery && !isInstantDeliveryMode)
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {cartTotal < coupon.minOrder 
                        ? 'Not eligible' 
                        : (coupon.onlyForInstantDelivery && !isInstantDeliveryMode)
                          ? 'Instant only'
                          : 'Apply'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;