// src/utils/Coupons.js
export const availableCoupons = [
    {
      code: 'FREE_DEL',
      name: 'Free Delivery',
      description: 'Get free delivery on orders above ₹50',
      minOrder: 50,
      discountType: 'delivery',
      discountValue: 30, // ₹30 delivery fee
      autoApply: false,
      expires: null, // no expiration
    },
    {
      code: 'CADBURY',
      name: 'Free Cadbury Chocolate',
      description: 'Get a free Cadbury chocolate on orders above ₹300',
      minOrder: 300,
      discountType: 'gift',
      discountValue: 0,
      autoApply: true,
      expires: null,
    },
    {
      code: 'ANDES_NOW',
      name: '₹100 Off',
      description: 'Get ₹100 off on orders above ₹800',
      minOrder: 800,
      discountType: 'fixed',
      discountValue: 100,
      autoApply: false,
      expires: null,
    },
    {
      code: 'MEGH_SHAH',
      name: '20% Off + Free Delivery',
      description: 'Get 20% off (up to ₹200) + free delivery on orders above ₹800',
      minOrder: 800,
      discountType: 'percentage',
      discountValue: 20,
      maxDiscount: 200,
      freeDelivery: true,
      autoApply: false,
      expires: null,
    }
  ];
  
  export const getAutoApplyCoupons = (subtotal) => {
    return availableCoupons.filter(coupon => 
      coupon.autoApply && subtotal >= coupon.minOrder
    );
  };
  
  export const validateCoupon = (code, subtotal) => {
    const coupon = availableCoupons.find(c => c.code === code);
    if (!coupon) return { valid: false, message: 'Invalid coupon code' };
    if (subtotal < coupon.minOrder) return { valid: false, message: `Minimum order of ₹${coupon.minOrder} required` };
    return { valid: true, coupon };
  };