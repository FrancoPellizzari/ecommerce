// ProtectedRoute.jsx
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ element, redirectTo = '/login' }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route element={element} />
  ) : (
    <Navigate to={redirectTo} />
  );
}

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  redirectTo: PropTypes.string,
};

export default ProtectedRoute;
