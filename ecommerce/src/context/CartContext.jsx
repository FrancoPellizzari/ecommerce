//CartContext.jsx
import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (element) => {
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find((item) => item.id === element.id);

    if (existingItem) {
      // Si el producto ya está en el carrito, incrementar la cantidad
      const updatedCart = cart.map((item) =>
        item.id === element.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      // Si el producto no está en el carrito, agregarlo con cantidad 1
      setCart([...cart, { ...element, quantity: 1 }]);
    }
  };
  
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
        {children}
      </CartContext.Provider>
    );
  
  }

  CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };