import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id, 10));
  const { addToCart } = useContext(CartContext);

  console.log("ProductDetails - product:", product);

  if (!product) {
    // Redirigir a la página principal si el producto no se encuentra
    navigate('/');
    // O mostrar un mensaje de error más descriptivo
    return <div>Producto no encontrado</div>;
  }
  const handleAddToCart = () => {
    addToCart(product); 
  };

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <button onClick={handleAddToCart}>Añadir a la cesta</button>
      <Link to="/">Volver a la página principal</Link>
    </div>
  );
};

ProductDetails.propTypes = {
  products: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductDetails;
