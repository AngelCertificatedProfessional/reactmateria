import React from 'react';
import Header from './ui/Header';
// import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
