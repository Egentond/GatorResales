import React, { useEffect, useState } from 'react';
import axiosInstance from "../api/axiosInstance";
import Footer from "./Footer";

const Sell = ({ loggedIn }) => {
  const [userData, setUserData] = useState(null);
  const [ticketData, setTicketData] = useState({
    sellerId: '',
    buyer: '',
    title: '',
    sport: '',
    description: '',
    price: '',
    status: '',
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axiosInstance.get('/users/user-data', {
                  withCredentials: true,
              });
              setUserData(response.data);
          } catch(error) {
              console.error('Failed to fetch user data', error);
          }
      };

      if (loggedIn) {
          fetchData();
      }
  }, [loggedIn]);

  useEffect(() => {
      if (userData) {
          setTicketData(prevData => ({
              ...prevData,
              sellerId: userData.id || '',
          }));
      }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData(prevData => ({ ...prevData, [name]: value }));
    setSuccessMsg('');
    setErrMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loggedIn) {
      setErrMsg("You must be logged in to post a ticket.");
      return;
    }
    try {
      const response = await axiosInstance.post('/tickets/list-ticket', ticketData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSuccessMsg('Ticket listing posted successfully.');
      setTicketData({
        sellerId: userData.id || '',
        buyer: '',
        title: '',
        sport: '',
        description: '',
        price: '',
        status: '',
      });
    } catch (error) {
      console.error('Error posting listing:', error);
      setErrMsg('Failed to post listing.');
    }
  };
  

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
          
          {loggedIn ? (
            <>
              <h1 className="text-center text-3xl font-bold text-gray-800">List a Ticket for Sale</h1>
              
              {successMsg && (
                <p className="text-green-500 text-center">{successMsg}</p>
              )}
              {errMsg && (
                <p className="text-red-500 text-center">{errMsg}</p>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Set a <b>TITLE</b> for the ticket you are selling: </label>
                  <input 
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-gatorsBlue focus:border-gatorsBlue"
                    type="text"
                    name="title"
                    value={ticketData.title}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">What <b>SPORTS GAME</b> is this ticket for </label>
                  <input 
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-gatorsBlue focus:border-gatorsBlue"
                    type="text"
                    name="sport"
                    value={ticketData.sport}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Write a <b>DESCRIPTION</b> of the ticket you are selling: </label>
                  <input 
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-gatorsBlue focus:border-gatorsBlue"
                    type="text"
                    name="description"
                    value={ticketData.description}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700"><b>PRICE</b> ($): </label>
                  <input 
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-gatorsBlue focus:border-gatorsBlue"
                    type="number"
                    name="price"
                    min={0.00}
                    value={ticketData.price}
                    onChange={handleInputChange}
                  />
                </div>
                
                <button className="w-full py-2 px-4 bg-gatorsBlue text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Post Ticket
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">Sell Tickets</h1>
              <p>You must be logged in to list tickets for sale.</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Sell;
