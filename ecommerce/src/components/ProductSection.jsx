import React from 'react';
import ProductCard from './ProductCard';
import PropTypes from 'prop-types';

const ProductSection = ({ filteredProducts, addToCart }) => (
  <>
    {filteredProducts.map((product) => (
      <ProductCard key={product.id} product={product} addToCart={addToCart} />
    ))}
  </>
);

ProductSection.propTypes = {
    filteredProducts: PropTypes.array.isRequired,
    addToCart: PropTypes.func.isRequired,
  };
  

export default ProductSection;