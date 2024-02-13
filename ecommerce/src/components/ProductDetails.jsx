import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProductDetails = ({ products, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id, 10));

  console.log("ProductDetails - product:", product);

  if (!product) {
    // Redirigir a la página principal si el producto no se encuentra
    navigate('/');
    // O mostrar un mensaje de error más descriptivo
    return <div>Producto no encontrado</div>;
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <button onClick={() => addToCart(product)}>Añadir a la cesta</button>
      <Link to="/">Volver a la página principal</Link>
    </div>
  );
};

ProductDetails.propTypes = {
  products: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductDetails;
