import React from 'react';
import Footer from './Footer';
import gatorCountry from '../assets/gatorCountry.jpg';

const Home = () => {
  return (
    <>
      <div>
        <img src={gatorCountry} alt="Gator Country image" />
      </div>
      <Footer />
    </>
  );
};

export default Home;
