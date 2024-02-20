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
import Modal from './components/Modal'; // Importa el componente Modal
import useModal from './useModal';


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(data);
  const [cartItems, setCartItems] = useState([]);
  const [currentView, setCurrentView] = useState('products');
  const [products, setProducts] = useState(data); // data es tu lista completa de productos
  const [editedProduct, setEditedProduct] = useState({ id: null, title: '', price: 0 });
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    // Simula cargar los productos desde un servidor JSON
    setProducts(data);
    setFilteredProducts(data);
  }, []);

  const handleEdit = (product) => {
    console.log('Editing product:', product);
    setEditedProduct(product);
    openModal();
  };

  const handleSave = () => {
    if (editedProduct !== null) {
      // Editar producto existente
      const updatedProducts = products.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      );
      setProducts(updatedProducts);
      console.log('Saved product:', editedProduct);
      closeModal();
    }
  };

  const handleDelete = (id) => {
    // Eliminar producto
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    closeModal();
  };

  const handleInputChange = (e) => {
    // Manejar cambios en los campos del producto editado
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
            </AuthProvider>
          </CartProvider>
        </ThemeProvider>
      </Layout>
      <Modal
  isOpen={isOpen}
  onClose={closeModal}
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