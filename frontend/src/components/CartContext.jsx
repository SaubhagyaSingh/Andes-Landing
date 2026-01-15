import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initialize state with items from localStorage or empty array
    const [cartItems, setCartItems] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    // Track instant delivery mode state
    const [isInstantDeliveryMode, setIsInstantDeliveryMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedMode = localStorage.getItem('instantDeliveryMode');
            return savedMode ? JSON.parse(savedMode) : false;
        }
        return false;
    });

    // Update localStorage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Update localStorage whenever instant delivery mode changes
    useEffect(() => {
        localStorage.setItem('instantDeliveryMode', JSON.stringify(isInstantDeliveryMode));
    }, [isInstantDeliveryMode]);

    const addToCart = (service) => {
        // Check if cart is in instant delivery mode but item is not an instant delivery item
        if (isInstantDeliveryMode && !service.isInstantDelivery && !service.instantDelivery) {
            toast.error("Can't add regular items when Instant Delivery is active");
            return false;
        }
        
        // Check if cart has regular items but trying to add an instant delivery item
        if (!isInstantDeliveryMode && cartItems.length > 0 && 
            (service.isInstantDelivery || service.instantDelivery)) {
            toast.error("Please clear your cart first before adding Instant Delivery items");
            return false;
        }
        
        // If this is the first item and it's an instant delivery item, set the mode
        if (cartItems.length === 0 && (service.isInstantDelivery || service.instantDelivery)) {
            setIsInstantDeliveryMode(true);
        }

        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === service.id);
            if (existingItem) {
                const updatedItems = prevItems.map(item =>
                    item.id === service.id 
                        ? { ...item, quantity: item.quantity + (service.quantity || 1) } 
                        : item
                );
                return updatedItems;
            }
            return [...prevItems, { ...service, quantity: service.quantity || 1 }];
        });
        
        toast.success(`${service.displayName} added to cart!`);
        return true;
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => {
            const newItems = prevItems.filter(item => item.id !== id);
            // If cart becomes empty, reset instant delivery mode
            if (newItems.length === 0) {
                setIsInstantDeliveryMode(false);
            }
            return newItems;
        });
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id);
            return;
        }
        
        setCartItems(prev => 
            prev.map(item => 
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        setIsInstantDeliveryMode(false);
    };

    // Function to toggle instant delivery mode
    const toggleInstantDeliveryMode = (value) => {
        // Can only switch modes if cart is empty
        if (cartItems.length > 0) {
            toast.error("Please clear your cart before switching delivery modes");
            return false;
        }
        
        setIsInstantDeliveryMode(value);
        return true;
    };

    const cartTotal = cartItems.reduce(
        (total, item) => {
            const price = item.unit === 'piece' || item.unit === 'pair' 
                ? item.discountedRateByPiece 
                : item.discountedRateByKg;
            return total + (price * item.quantity);
        }, 0
    );

    // Helper functions to check cart state
    const hasOnlyInstantItems = cartItems.length > 0 && 
        cartItems.every(item => item.isInstantDelivery || item.instantDelivery);
    
    const hasAnyInstantItems = cartItems.some(item => 
        item.isInstantDelivery || item.instantDelivery);

            const hasAnyPremiumItems = cartItems.some(item => item.isPremium);


    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount: cartItems.reduce((count, item) => count + item.quantity, 0),
                isInstantDeliveryMode,
                toggleInstantDeliveryMode,
                hasOnlyInstantItems,
                hasAnyInstantItems,
                hasAnyPremiumItems
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);