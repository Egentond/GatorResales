import React from 'react';
import Footer from './Footer';

const Buy = ({ loggedIn }) => { // Accept loggedIn as a prop
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
          {loggedIn ? (
            <div>
              <h1 className="text-4xl">Tickets for Sale</h1>
              {/* Ticket listing or component goes here */}
            </div>
          ) : (
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">Buy Tickets</h1>
                <p>You must be logged in to buy tickets.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Buy;
