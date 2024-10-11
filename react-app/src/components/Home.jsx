import React from 'react';
import Menu from './Menu';
import gatorCountry from '../assets/gatorCountry.jpg'

const Home = () => {
  return (
    <>
      <Menu />
      <div>
        <img src={gatorCountry} alt="Gator Country image" />
      </div>

    
    </>
  );
};

export default Home;
