import React from 'react';
import Menu from './Menu';
import Footer from './Footer';
import gatorCountry from '../assets/gatorCountry.jpg'

const Home = () => {
  return (
    <>
      <Menu />
      <div>
        <img src={gatorCountry} alt="Gator Country image" />
      </div>
      <Footer />
    </>
  );
};

export default Home;
