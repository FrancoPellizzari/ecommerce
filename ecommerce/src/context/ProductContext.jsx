//ProductContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = 'http://localhost:3000/products';

export const ProductContext = createContext();

export const ProductProvider =({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  useEffect(() => {
    getProducts();
  }, []);
    

  const getProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      
      setProducts(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setTimeout(()=>{
        setLoading(false);
      },2000);
    }
  };

  const getProductsById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      const product = response.data;
      return product;
      
    } catch (error) {
      setError(error);
    } finally {
      
        setLoading(false);
     
    }
  };

  const updateProduct = async (id, editedProduct) => {
    try{
        setLoading(true)
        const response = await axios.put(
        `${API_URL}/${id}`, editedProduct);
        const updatedProduct = {
          ...response.data,
          updatedAt: new Date().toISOString(),
        };
        setProducts((prevProducts) =>
            prevProducts.map((product)=>
            product.id === id ? updatedProduct : product
            ) 
        );
        
    } catch (error){
        console.error("Error editando producto: ", error);
    } finally{
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      setError(error); 
    } finally{
      setLoading(false);
    }
  };

  const createProduct = async (newProduct) => {
    try {
      
      setLoading(true);        
      const response = await axios.post(API_URL, newProduct);
      const addedProduct = response.data;
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
      
    } catch (error) {
      console.error("Error agregando el producto: ", error);
    } finally{
      setLoading(false);
    }
  };
    
  return(
    <ProductContext.Provider
    value = {{
      products,
      loading,
      error,
      getProducts,
      getProductsById,
      updateProduct,
      deleteProduct,
      createProduct,
    }}
  >
    {children}
    </ProductContext.Provider>
  );
};

  

  

 