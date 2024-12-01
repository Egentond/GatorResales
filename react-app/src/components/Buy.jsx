import React from 'react';
import Footer from './Footer';
import axiosInstance from "../api/axiosInstance";
import { useEffect, useState } from 'react';


const Buy = ({ loggedIn }) => { // Accept loggedIn as a prop
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get('/tickets/get-tickets');
        setTickets(response.data); // Store the tickets in state
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
      }
    };
    if (loggedIn) {
      fetchTickets();
    }
  }, [loggedIn]);

  return (
    <>
      {loggedIn ? (
        <div className='flex items items-center justify-center mt-5'>
          <h1 className="text-4xl">Tickets for Sale</h1>
          <ul>
            {tickets.map(ticket => (
              <li key={ticket._id}>
                <h2>{ticket.title} - ${ticket.price}</h2>
                <p>{ticket.description}</p>
                <small>Sport: {ticket.sport}</small>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
