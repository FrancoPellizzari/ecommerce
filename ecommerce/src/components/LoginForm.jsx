import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ onLogin, onLogout }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('userData'));

  useEffect(() => {
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('IsLoggedIn:', isLoggedIn);
  }, [name, email, isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
  
    
  
  
  
    const userData = { name, email };
    localStorage.setItem('userData', JSON.stringify(userData));
    onLogin(userData);
  
   
    
  };
  
  const handleLogout = () => {
   
    localStorage.removeItem('userData');
  
    onLogout();
  
    setLoggedIn(false);
  };

  return (
    <div>
      <form onSubmit={handleLogin}> 
        <label>
          Nombre:
          <input id='nombre' type="text" value={name} onChange={(e) => setName(e.target.value)} />
          
        </label>
        <label>
          Correo:
          <input id='correo' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default LoginForm;
