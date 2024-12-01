import React from 'react';
import Footer from './Footer';
import gatorCountry from '../assets/gatorCountry.jpg';
import gatorsBasketball from '../assets/gators-basketball.jpg';
import gatorsFootball from '../assets/gators-football.jpg';
import gatorsVolleyball from '../assets/gators-volleyball.jpg';
import gatorsWmsBasketball from '../assets/gators-womens-basketball.jpg';


const Home = () => {

  const filterTickets = (sport) => {
    try {

    } catch(error) {
      console.error(error);
    }
  }


  return (
    <>
      <div className="relative h-screen min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${gatorCountry})` }}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        
        <div className="align-middle content-center justify-center">

            <div className='mt-40 align-middle text-center relative gap-8 content-center justify-center text-white text-6xl'><h1>Welcome To Gator Resales</h1></div>
            <div className='mt-4 align-middle text-center relative gap-8 content-center justify-center text-white text-xl'><h1>Score big, Trade smart, only as a Gator</h1></div>

            
            <div className='align-middle text-center relative flex gap-8 mt-40 content-center justify-center'>
            
              <div onClick={filterTickets('football')} className="bg-white bg-opacity-80 p-4 rounded shadow-md w-80 transition ease-in-out delay-150 text-gatorsBlue hover:bg-gatorsBlue hover:scale-110 hover:text-white">
                <p className='text-xl'>Football</p>
                <img src={gatorsFootball} alt="Gators Football"/>
              </div>
              
              <div onClick={filterTickets('mensBasketball')} className="bg-white bg-opacity-80 p-4 rounded shadow-md w-80 transition ease-in-out delay-75 text-gatorsBlue hover:bg-gatorsBlue hover:scale-110 hover:text-white">
                <p className='text-xl'>Mens Basketball</p>
                <img src={gatorsBasketball} alt="gators-mens-basketball-image" />
                                
              </div>
              
              <div onClick={filterTickets('volleyball')} className='bg-white bg-opacity-80 p-4 rounded shadow-md w-80 transition ease-in-out delay-75 text-gatorsBlue hover:bg-gatorsBlue hover:scale-110 hover:text-white'>
                <p className='text-xl'>Volleyball</p>
                <img src={gatorsVolleyball} alt="gators-volleyball-image" />
                
              </div>
              
              <div onClick={filterTickets('womensBasketball')} className='bg-white bg-opacity-80 p-4 rounded shadow-md w-80 transition ease-in-out delay-75 text-gatorsBlue hover:bg-gatorsBlue hover:scale-110 hover:text-white'>
                <p className='text-xl'>Womens Basketball</p>
                <img src={gatorsWmsBasketball} alt="gators-womens-basketball-image" />
              </div>
            
            </div>
        </div>
      
      </div>
      <Footer />
    </>
  );
};

export default Home;