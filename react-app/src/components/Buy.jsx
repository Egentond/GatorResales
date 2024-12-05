import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import axiosInstance from "../api/axiosInstance";
import Footer from './Footer';

const Buy = ({ loggedIn }) => {
  const [tickets, setTickets] = useState([]);
  const location = useLocation(); // Access location object
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const sportFilter = queryParams.get('sport'); // Get the sport query parameter

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // Append the sport query to your API request if it exists
        const url = sportFilter ? `/tickets/get-tickets-by-sport?sport=${sportFilter}` : '/tickets/get-all-tickets';
        const response = await axiosInstance.get(url);
        console.log(response);
        setTickets(response.data.data); // Store the tickets in state
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
      }
    };
    if (loggedIn) {
      fetchTickets();
    }
  }, [loggedIn, sportFilter]); // Add sportFilter as a dependency

  const handleBuyClick = (ticket) => {
    // Go to the checkout page with ticket details as parameters
    
    navigate(`/checkout`, {
      state: {
        ticketId: ticket._id,
      },
    });
  };

  return (
    <>
      {loggedIn ? (
        <div>
          <h1 className="pt-5 text-4xl flex justify-center">Tickets for Sale</h1>
          <div className='flex pt-5 pb-5 items items-center justify-center mt-5'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tickets.map((ticket) => (
                <div className="p-2" key={ticket._id}>
                  <div className="bg-gray-100 p-5 rounded-md hover:bg-gray-200">
                    <h2 className="text-xl">{ticket.title} - ${ticket.price}</h2>
                    <p>{ticket.description}</p>
                    <small className="text-pretty">Sport: {ticket.sport}</small>
                    <button
                      onClick={() => handleBuyClick(ticket)}
                      className="flex border-none bg-gatorsBlue text-white hover:bg-gatorsOrange transition ease-in-out p-1 rounded-md"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">Buy Tickets</h1>
              <p>You must be logged in to buy tickets.</p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Buy;
