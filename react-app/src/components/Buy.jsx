import React from 'react';
import Menu from './Menu';
import Footer from './Footer';

const Buy = () => {
  return (
    <>
      <Menu />
      <div className="text-center py-5">
        <h1 className="text-4xl">Buy Tickets</h1>
        <p>Explore available tickets for resale here.</p>
      </div>
      <Footer />
    </>
  );
};

export default Buy;