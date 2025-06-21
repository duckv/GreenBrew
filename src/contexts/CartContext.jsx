/**
 * Shopping Cart Context Provider
 * Manages cart state, localStorage persistence, and cart operations
 */
import React, { createContext, useContext, useState, useEffect } from "react";

// Cart context for sharing cart state across components
const CartContext = createContext(undefined);

/**
 * CartProvider component that wraps the app and provides cart functionality
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Context provider with cart state and methods
 */
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Save cart to localStorage whenever cart state changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  /**
   * Adds an item to the cart or increases quantity if item already exists
   * @param {Object} item - Menu item to add (with id, name, price, image, description)
   * @param {number} quantity - Quantity to add
   */
  const addToCart = (item, quantity) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (cartItem) => cartItem.item.id === item.id,
      );
      if (existingItem) {
        // Item exists, update quantity
        return prev.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem,
        );
      }
      // New item, add to cart
      return [...prev, { item, quantity }];
    });
  };

  /**
   * Updates the quantity of a specific item in the cart
   * @param {string} itemId - ID of the item to update
   * @param {number} newQuantity - New quantity (removes item if <= 0)
   */
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart((prev) =>
        prev.map((cartItem) =>
          cartItem.item.id === itemId
            ? { ...cartItem, quantity: newQuantity }
            : cartItem,
        ),
      );
    }
  };

  /**
   * Removes an item completely from the cart
   * @param {string} itemId - ID of the item to remove
   */
  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((cartItem) => cartItem.item.id !== itemId));
  };

  /**
   * Clears all items from the cart and localStorage
   */
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  /**
   * Calculates total number of items in cart
   * @returns {number} Total quantity of all items
   */
  const getTotalItems = () => {
    return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  /**
   * Calculates total price of all items in cart
   * @returns {number} Total price in dollars
   */
  const getTotalPrice = () => {
    return cart.reduce(
      (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
      0,
    );
  };

  // Context value with all cart operations
  const contextValue = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

/**
 * Hook to access cart context
 * @returns {Object} Cart state and methods
 * @throws {Error} If used outside of CartProvider
 */
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
