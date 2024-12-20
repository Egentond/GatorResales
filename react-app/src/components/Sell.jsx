import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Footer from "./Footer";
import gatorCountry from "../assets/gatorCountry.jpg";

const Sell = ({ loggedIn }) => {  // Sell component
  const [userData, setUserData] = useState(null);
  const [ticketData, setTicketData] = useState({  // Ticket data
    sellerId: "",
    buyer: "",
    title: "",
    sport: "",
    description: "",
    price: "",
    status: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {   // Fetch user data
    const fetchData = async () => {  // Fetch user data
      try {
        const response = await axiosInstance.get("/users/user-data", { // Send a request to get user data
          withCredentials: true,  // Include credentials in the request
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    if (loggedIn) {
      fetchData();
    }
  }, [loggedIn]);

  useEffect(() => {   // Set the sellerId in ticketData
    if (userData) {
      setTicketData((prevData) => ({  // Set the sellerId in ticketData
        ...prevData,
        sellerId: userData.id || "",
      }));
    }
  }, [userData]);

  const handleInputChange = (e) => {  // Handle input change
    const { name, value } = e.target;
    setTicketData((prevData) => ({ ...prevData, [name]: value }));  // Update ticket data
    setSuccessMsg("");
    setErrMsg("");
  };

  const handleSubmit = async (e) => {  // Handle form submission
    e.preventDefault();
    if (!loggedIn) {
      setErrMsg("You must be logged in to post a ticket.");
      return;
    }
    try {
      const response = await axiosInstance.post(   // Send a request to post a ticket listing
        "/tickets/list-ticket",  // Post ticket listing
        ticketData, // Ticket data
        {
          headers: { "Content-Type": "application/json" }, // Set the content type
        },
      );
      setSuccessMsg("Ticket listing posted successfully.");
      setTicketData({
        sellerId: userData.id || "",      // Reset ticket data
        buyer: "",
        title: "",
        sport: "",
        description: "",
        price: "",
        status: "",
      });
    } catch (error) {
      console.error("Error posting listing:", error);
      setErrMsg("Failed to post listing.");
    }
  };

  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${gatorCountry})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
          {loggedIn ? (
            <>
              <h1 className="text-center text-3xl font-bold text-gray-800">
                List a Ticket for Sale
              </h1>

              {successMsg && (
                <p className="text-green-500 text-center">{successMsg}</p>
              )}
              {errMsg && <p className="text-red-500 text-center">{errMsg}</p>}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Set a <b>TITLE</b> for the ticket you are selling:{" "}
                  </label>
                  <input
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-gatorsBlue focus:border-gatorsBlue"
                    type="text"
                    name="title"
                    value={ticketData.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    What <b>SPORTS GAME</b> is this ticket for{" "}
                  </label>
                  <input
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-gatorsBlue focus:border-gatorsBlue"
                    type="text"
                    name="sport"
                    value={ticketData.sport}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Write a <b>DESCRIPTION</b> of the ticket you are selling:{" "}
                  </label>
                  <input
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-gatorsBlue focus:border-gatorsBlue"
                    type="text"
                    name="description"
                    value={ticketData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <b>PRICE</b> ($):{" "}
                  </label>
                  <input
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-gatorsBlue focus:border-gatorsBlue"
                    type="number"
                    name="price"
                    min={0.0}
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
              <p className="mt-4 text-gray-600">
                You must be logged in to list tickets for sale.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sell;
