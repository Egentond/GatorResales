import React from 'react';
import Footer from './Footer';
import gatorCountry from '../assets/gatorCountry.jpg';

const Home = () => {
  return (
    <>
      <div className="relative h-screen min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${gatorCountry})` }}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        
        <div className="align-middle content-center justify-center">
            
            <div className='relative flex gap-8 mt-40 content-center justify-center'>
              <div className="bg-white bg-opacity-80 p-4 rounded shadow-md ">
                Football
              </div>
              <div className="bg-white bg-opacity-80 p-4 rounded shadow-md ">
                Mens Basketball                
              </div>
              <div className='bg-white bg-opacity-80 p-4 rounded shadow-md'>
                Volleyball
              </div>
              <div className='bg-white bg-opacity-80 p-4 rounded shadow-md'>
                Womens Basketball
              </div>
            </div>
        </div>
      
      </div>
      <Footer />
    </>
  );
};

export default Home;
