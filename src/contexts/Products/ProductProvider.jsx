// ProductContext.js

import React, { createContext, useState } from 'react';

// Create a new context
export const ProductContext = createContext();

// Define the ProductProvider component
export const ProductProvider = ({ children }) => {
  // Define initial state for product data
  const [products, setProducts] = useState([]);

  // Function to update product data
  const updateProducts = (newProducts) => {
    setProducts(newProducts);
  };

  return (
    // Provide the product data and update function to child components
    <ProductContext.Provider value={{ products, updateProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
