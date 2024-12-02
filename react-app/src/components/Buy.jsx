import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import axiosInstance from "../api/axiosInstance";
import Footer from './Footer';

const Buy = ({ loggedIn }) => {
  const [tickets, setTickets] = useState([]);
  const location = useLocation(); // Access location object
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

  return (
    <>
      {loggedIn ? (
        <div>
          <h1 className="pt-5 text-4xl flex justify-center">Tickets for Sale</h1>
          <div className='flex pt-5 pb-5 items items-center justify-center mt-5'>
            <ul className='columns-2 justify-center'>
              {tickets.map(ticket => (
                <div className='p-2 gap-8' key={ticket._id}> {/* Ensure key is here */}
                  <li className='block bg-gray-100 p-5 rounded-md hover:bg-gray-200'>
                    <h2 className='text-xl'>{ticket.title} - ${ticket.price}</h2>
                    <p>{ticket.description}</p>
                    <small className='text-pretty'>Sport: {ticket.sport}</small>
                    <button className='flex border-none bg-gatorsBlue text-white hover:bg-gatorsOrange transition ease-in-out p-1 rounded-md'>Buy</button>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Buy Tickets</h1>
            <p>You must be logged in to buy tickets.</p>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Buy;
