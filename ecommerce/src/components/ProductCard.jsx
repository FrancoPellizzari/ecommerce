import React, { useContext } from 'react';
import './ProductCard.css';
import PropTypes from 'prop-types';
import { ThemeContext } from '../context/ThemeContext';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, title, price, description, category, image, rating } = product;

  const {theme, toggleTheme } = useContext(ThemeContext);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product); 
  };

  return (
    <nav className={`navbar ${theme === 'dark' ? 'dark-card' : 'light-card'}`}>
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <div className="product-details">
        <h3 className="product-title">{title}</h3>
        <p className="product-description">{description}</p>
        <p className="product-price">${price}</p>
        <p className="product-category">{category}</p>
        <div className="product-rating">
          <p>Rating: {rating.rate} ({rating.count} reviews)</p>
        </div>
        <Link to={`/product/${product.id}`}>Ver Detalles</Link>
        <button onClick={handleAddToCart}>Agregar al Carrito</button>
      </div>
    </div>
    </nav>
  );
}

ProductCard.propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      rating: PropTypes.shape({
        rate: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }

export default ProductCard;
