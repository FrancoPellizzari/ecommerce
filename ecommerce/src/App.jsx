import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Carrito from './components/Cart';
import data from './data.json';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import LoginForm from './components/LoginForm';
import { AuthProvider } from './context/AuthContext';
import ProductSection from './components/ProductSection';
import Banner from './components/Banner';
import Layout from './views/layout';
import ProductDetails from './components/ProductDetails';

const App = () => {
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
    setCurrentView('login');
  };

  const handleLogin = () => {
    
    console.log("Usuario autenticado con éxito.");
  };

  return (
    <BrowserRouter>
    <ThemeProvider>
      <Layout
        filterProducts={filterProducts}
        switchToCartView={switchToCartView}
        switchToLoginView={switchToLoginView}
      >
        <ThemeProvider>
          <CartProvider>
            <AuthProvider>
              <div>
                
                <Banner />
                <div className="product-list">
                  <Routes>
                    <Route
                      path="/"
                      element={
                        currentView === 'products' && (
                          <ProductSection filteredProducts={filteredProducts} addToCart={addToCart} />
                        )
                      }
                    />
                    <Route path="/cart" element={<Carrito cartItems={cartItems} />} />
                    <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                    <Route
                    path="/product/:id"
                    element={
                      <ProductDetails
                        products={filteredProducts}
                        addToCart={addToCart}
                      />
                    }
                  />
                  </Routes>
                </div>
              </div>
            </AuthProvider>
          </CartProvider>
        </ThemeProvider>
      </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
