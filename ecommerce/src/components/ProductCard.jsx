import React, { useContext, useState } from 'react';
import './ProductCard.css';
import { ThemeContext } from '../context/ThemeContext';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EditModal from './EditModal';
import { useProducts } from '../useProducts';



const ProductCard = ({ product, onEdit, onDelete, isAuthenticated, userRole }) => {
  const { id, title, price, description, category, image, rating } = product;
  
  const {theme, toggleTheme } = useContext(ThemeContext);
  const { addToCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {deleteProduct} = useProducts();

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = () => {
    if (isAuthenticated) {
      addToCart(product);
    } else {
      
      console.log("Usuario no autenticado. Redirigiendo a la página de inicio de sesión.");
    }
  };

  
  
  return (
    
      <div className="product-card" key={id}>
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
          {isAuthenticated && (
            <button onClick={handleAddToCart}>Agregar al Carrito</button>
          )}
          {isAuthenticated && userRole === 'admin' && (
          <>
           <button onClick={openModal}>Editar</button>
          <button onClick={() => deleteProduct(id)}>Eliminar</button>
          </>
        )}
          
        </div>
        
      </div>
    
  );
}

export default ProductCard;
