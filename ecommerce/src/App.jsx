import React, { useState } from 'react';
import Navbar from './components/navbar';
import ProductCard from './components/ProductCard';
import Carrito from './components/Cart';
import data from './data.json'; 
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(data);
  const [cartItems, setCartItems] = useState([]);
  const [currentView, setCurrentView] = useState('products'); // Nuevo estado para controlar la vista

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    filterProducts(newSearchTerm);
  };

  const filterProducts = (newSearchTerm) => {
    const filtered = data.filter((product) =>
      product.title.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const switchToProductsView = () => {
    setCurrentView('products');
  };

  const switchToCartView = () => {
    setCurrentView('cart');
  };

  return (
    <ThemeProvider>
      <CartProvider>
        <div>
          <Navbar
            onSearchSubmit={filterProducts}
            switchToProductsView={switchToProductsView}
            switchToCartView={switchToCartView}
          />
          <div className="product-list">
            {currentView === 'products' &&
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            {currentView === 'cart' && <Carrito cartItems={cartItems} />}
          </div>
        </div>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
