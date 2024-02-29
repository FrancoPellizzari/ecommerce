import React, { useState, useEffect } from 'react';
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
import ProtectedRoute from './components/ProtectedRoutes'; 
import NotFound from './views/NotFound';
import Modal from './components/Modal'; 

import { useProducts } from './useProducts';
import { ProductContext } from './context/ProductContext';


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [currentView, setCurrentView] = useState('products');
  const [editedProduct, setEditedProduct] = useState(null);
  const {loading, error, products,getProducts, updateProduct, deleteProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);

 

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleEdit = (product) => {
    setEditedProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editedProduct !== null) {
      updateProduct(editedProduct.id, editedProduct);
      setIsModalOpen(false);
    }
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    filterProducts(newSearchTerm);
  };

  const filterProducts = (newSearchTerm) => {
    const filtered = products.filter((product) =>
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
        <ProductContext.Provider value={{ products, loading, error, getProducts, updateProduct, deleteProduct }}>
          <CartProvider>
            <AuthProvider>
              <Layout
                filterProducts={filterProducts}
                switchToCartView={switchToCartView}
                switchToLoginView={switchToLoginView}
              >
                <div>
                  {/* <Navbar /> */}
                  <Banner />
                  <div className="product-list">
                    <Routes>
                      <Route
                        path="/"
                        element={
                          currentView === 'products' && (
                            <ProductSection
                              filteredProducts={filteredProducts}
                              addToCart={addToCart}
                              onEdit={handleEdit}
                              onDelete={handleDelete}
                            />
                          )
                        }
                      />
                      <Route
                        path="/cart"
                        element={
                          <ProtectedCart>
                            <Carrito />
                          </ProtectedCart>
                        }
                      />
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
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </div>
              </Layout>
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} 
                onConfirm={handleSave}
                title="Editar Producto"
                content={
                  <>
                    <label>
                      Título:
                      <input
                        type="text"
                        name="title"
                        value={editedProduct?.title || ''}
                        onChange={handleInputChange}
                      />
                    </label>
                  </>
                }
              />
            </AuthProvider>
          </CartProvider>
        </ProductContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

const ProtectedCart = () => (
  <ProtectedRoute redirectTo="/cart">
    <Carrito />
  </ProtectedRoute>
);

export default App;