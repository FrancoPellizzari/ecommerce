// LoginForm.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const { login, logout } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('userData'));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const userData = { name, email };
    localStorage.setItem('userData', JSON.stringify(userData));
    login(userData);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    logout();
    setLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <form onSubmit={handleLogin}>
          <label>
            Nombre:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Correo:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default LoginForm;
