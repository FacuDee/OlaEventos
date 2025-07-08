// src/components/Layout.jsx
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';

function Layout({ children }) {
  const location = useLocation();
  const esLogin = location.pathname === '/login';

  return (
    <>
      {!esLogin && <NavBar />}
      {children}
    </>
  );
}

export default Layout;
