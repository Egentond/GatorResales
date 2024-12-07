import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Footer from "./Footer";
import gatorCountry from "../assets/gatorCountry.jpg";

const Buy = ({ loggedIn }) => {
  const [tickets, setTickets] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation(); // Access location object
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const sportFilter = queryParams.get("sport"); // Get the sport query parameter

  useEffect(() => {
    const fetchTickets = async () => {    // Fetch tickets
      try {
        // Append the sport query to your API request if it exists
        const url = sportFilter
          ? `/tickets/get-tickets-by-sport?sport=${sportFilter}`
          : "/tickets/get-all-tickets";
        const response = await axiosInstance.get(url);
        console.log(response);
        setTickets(response.data.data); // Store the tickets in state
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
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

  const handleSort = (order) => {  // Sort tickets by price
    setSortOrder(order);
    setDropdownOpen(false);
    const sortedTickets = [...tickets].sort((a, b) => {  
      if (order === "high-low") { 
        return b.price - a.price;
      } else {
        return a.price - b.price;
      }
    });
    setTickets(sortedTickets);  // Set the sorted tickets
  };

  return (
    <>
      {!loggedIn ? (
        // put the gator image in when user not logged in
        <div
          className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${gatorCountry})` }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="relative z-10 max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">Buy Tickets</h1>  
              <p className="mt-4 text-gray-600">
                You must be logged in to buy tickets.
              </p>
              <button
                onClick={() => navigate("/login")}    // Go to the login page
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      ) : (
        // dont use image when the user logged in it looks bad
        <div>
          <h1 className="pt-5 text-4xl flex justify-center">
            Tickets for Sale
          </h1>
          <div className="flex justify-center mt-5">
            <div className="relative inline-block text-left">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gatorsBlue text-white text-sm font-medium hover:bg-blue-700 focus:outline-none"
              >
                Price
              </button>
              {dropdownOpen && (
                <div className="origin-top-center absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <button
                      onClick={() => handleSort("high-low")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      High - Low
                    </button>
                    <button
                      onClick={() => handleSort("low-high")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Low - High
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex pt-5 pb-5 items items-center justify-center mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tickets.map((ticket) => (
                <div className="p-2" key={ticket._id}>
                  <div className="bg-gray-100 p-5 rounded-md hover:bg-gray-200">
                    <h2 className="text-xl">
                      {ticket.title} - ${ticket.price}
                    </h2>
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
      )}
      <Footer />
    </>
  );
};

export default Buy;
