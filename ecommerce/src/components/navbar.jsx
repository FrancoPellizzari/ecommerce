import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';
import { ThemeContext } from '../context/ThemeContext';



const Navbar = ({ onSearchSubmit, switchToCartView, switchToLoginView }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(searchTerm);
  };

  const {theme, toggleTheme } = useContext(ThemeContext);
  

  // En navbar.jsx
return (
  <nav className={`navbar ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
    <div className="logo">Mi Tienda React</div>
    <form onSubmit={handleSearchSubmit} className="search-form">
      <input
        name='buscador'
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button type="submit">Buscar</button>
    </form>
    <ul className="nav-links">
      <li><a href="/">Inicio</a></li>
      <li><a href="/productos">Productos</a></li>
      <li><button onClick={switchToCartView}>Carrito</button></li>
      <button onClick={switchToLoginView}>Iniciar Sesión</button>
      <button onClick={toggleTheme}>Cambiar Tema</button>
    </ul>
  </nav>
);

};

Navbar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
  switchToCartView: PropTypes.func.isRequired,
  switchToLoginView: PropTypes.func.isRequired
};

export default Navbar;
