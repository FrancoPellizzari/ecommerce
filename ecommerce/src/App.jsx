import React, { useState } from 'react';
import Navbar from './components/navbar';
import ProductCard from './components/ProductCard';
import Carrito from './components/Cart';
import data from './data.json'; 
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import LoginForm from './components/LoginForm';



const App = () => {

  console.log('App is rendered'); // Agrega este log
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(data);
  const [cartItems, setCartItems] = useState([]);
  const [currentView, setCurrentView] = useState('products'); 

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

  const switchToLoginView = () => {
    switchToLoginView('login');
  };

  

  
  return (
    <ThemeProvider>
      <CartProvider>
        <div>
          <Navbar
            onSearchSubmit={handleSearchChange}
            switchToProductsView={switchToProductsView}
            switchToCartView={switchToCartView}
            switchToLoginView={switchToLoginView} 
          />
          <div className="product-list">
            {currentView === 'products' &&
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}

            {currentView === 'cart' && <Carrito cartItems={cartItems} />}

            <LoginForm
              onLogin={(userData) => {
                localStorage.setItem('userData', JSON.stringify(userData));
              }}
              onLogout={() => {
                localStorage.removeItem('userData');
                // ... Puedes realizar otras acciones necesarias al hacer logout
              }}
            />
          </div>
        </div>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
