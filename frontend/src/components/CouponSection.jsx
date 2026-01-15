// src/components/CouponSection.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { availableCoupons, validateCoupon } from '../Coupon';

const CouponSection = ({ 
  cartTotal, 
  appliedCoupon, 
  setAppliedCoupon,
  paperBag,
  setPaperBag
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [showCouponModal, setShowCouponModal] = useState(false);

  const calculateDiscounts = () => {
    let discount = 0;
    let deliveryFee = 30;
    let convenienceFee = 8;
    let paperBagFee = paperBag ? 4 : 0;
    let gift = null;

    if (appliedCoupon) {
      switch (appliedCoupon.discountType) {
        case 'fixed':
          discount = appliedCoupon.discountValue;
          break;
        case 'percentage':
          discount = Math.min(
            (cartTotal * appliedCoupon.discountValue) / 100,
            appliedCoupon.maxDiscount || Infinity
          );
          break;
        case 'delivery':
          deliveryFee = 0;
          break;
        case 'gift':
          gift = appliedCoupon.name;
          break;
      }

      if (appliedCoupon.freeDelivery) {
        deliveryFee = 0;
      }
    }

    const subtotal = cartTotal;
    const totalBeforeDiscount = subtotal + deliveryFee + convenienceFee + paperBagFee;
    const totalAfterDiscount = totalBeforeDiscount - discount;

    return {
      subtotal,
      deliveryFee,
      convenienceFee,
      paperBagFee,
      discount,
      gift,
      total: totalAfterDiscount,
      meetsMinimum: totalAfterDiscount >= 50
    };
  };

  const { subtotal, deliveryFee, convenienceFee, paperBagFee, discount, gift, total, meetsMinimum } = calculateDiscounts();

  const handleApplyCoupon = () => {
    const { valid, message, coupon } = validateCoupon(couponCode, cartTotal);
    if (!valid) {
      setCouponError(message);
      return;
    }
    setAppliedCoupon(coupon);
    setCouponError('');
    toast.success(`Coupon applied: ${coupon.name}`);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  return (
    <div className="space-y-4">
      {!meetsMinimum && (
        <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
          Minimum order amount is ₹50 (current: ₹{total})
        </div>
      )}
      
      <div className="flex justify-between">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">₹{subtotal}</span>
      </div>

      {/* Coupon Section */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Coupon</span>
          <button 
            onClick={() => setShowCouponModal(true)}
            className="text-sm text-blue-600 underline"
          >
            {appliedCoupon ? 'Change' : 'Apply Coupon'}
          </button>
        </div>
        
        {appliedCoupon && (
          <div className="bg-green-50 p-2 rounded mb-2">
            <div className="flex justify-between items-center">
              <span className="text-green-700 text-sm">
                {appliedCoupon.name} applied
              </span>
              <button 
                onClick={handleRemoveCoupon}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
            {discount > 0 && (
              <div className="flex justify-between mt-1">
                <span className="text-gray-600 text-sm">Discount</span>
                <span className="font-medium text-green-600">-₹{discount}</span>
              </div>
            )}
            {gift && (
              <div className="text-sm text-gray-600 mt-1">
                🎁 Free gift: {gift}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <span className="text-gray-600">Delivery</span>
        <span className="font-medium">
          {deliveryFee === 0 ? (
            <span className="text-green-600">Free</span>
          ) : (
            `₹${deliveryFee}`
          )}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-600">Convenience Fee</span>
        <span className="font-medium">₹{convenienceFee}</span>
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

      <div className="border-t border-gray-200 pt-4 flex justify-between">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-lg font-semibold text-blue-600">
          ₹{total}
        </span>
      </div>

      {/* Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start pt-16 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative mt-20">
            <button 
              onClick={() => setShowCouponModal(false)}
              className="absolute top-2 right-2 text-xl text-gray-700"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-4">Available Coupons</h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {availableCoupons.map((coupon) => (
                <div 
                  key={coupon.code} 
                  className={`border rounded-lg p-4 ${coupon.autoApply ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{coupon.name}</h4>
                      <p className="text-sm text-gray-600">{coupon.description}</p>
                      <p className="text-xs mt-1 text-gray-500">
                        Min. order: ₹{coupon.minOrder}
                        {coupon.autoApply && ' • Auto-applied'}
                      </p>
                    </div>
                    {coupon.autoApply ? (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        AUTO
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setCouponCode(coupon.code);
                          setShowCouponModal(false);
                        }}
                        className="text-sm text-blue-600 underline"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">Have a coupon code?</h4>
              <div className="flex">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-grow border border-gray-300 rounded-l px-3 py-2"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <p className="text-red-500 text-sm mt-1">{couponError}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponSection;