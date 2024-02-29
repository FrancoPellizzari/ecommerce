import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Modal from './Modal';
import { useProducts } from '../useProducts';
import ProductCard from '../components/ProductCard';

const ProductSection = ({ filteredProducts, addToCart }) => {
  const { isAuthenticated, userRole } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { products, loading, error, createProduct} = useProducts();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleAddProduct = () => {
    openModal();
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          createProduct={(newProduct) => {
            createProduct(newProduct);
            closeModal();
          }}
        />
      )}
  
      <div className="products-section">
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={`${product.id}-${product.updatedAt}`}
              product={product}
              addToCart={addToCart}
            />
          ))
        ) : (
          !error && <p>No hay productos que coincidan con tu búsqueda</p>
        )}
      </div>
  
      {isAuthenticated && (
        <div className="add-product-btn-container">
          <button className="add-product-btn" onClick={handleAddProduct}>
            Agregar Nuevo Producto
          </button>
        </div>
      )}
    </>
  );
};

export default ProductSection;
