import React from 'react';
import Menu from './Menu';
import Footer from './Footer';

const Sell = () => {
  return (
    <>
      <Menu />
      <div className="text-center py-5">
        <h1 className="text-4xl">Sell Tickets</h1>
        <p>List your tickets for sale here.</p>
      </div>
      <Footer />
    </>
  );
};

export default Sell;
