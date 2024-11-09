import axiosInstance from "../api/axiosInstance";
import Footer from "./Footer";
import { useEffect, useState } from "react";

const Sell = () => {
  const [userData, setUserData] = useState(null);
  const [ticketData, setTicketData] = useState({
    seller: '',
    buyer: '',
    title: '',
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
      fetchData();
  }, []);

  useEffect(() => {
      if(userData) {
          console.log(userData);
          setTicketData((prevData) => ({
              ...prevData,
              seller: userData.id || '',
          }));
      }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({ ...prevData, [name]: value }));
    setSuccessMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axiosInstance.post('/tickets/list-ticket', ticketData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSuccessMsg('Ticket listing posted successfully.');
      setErrMsg('');
  
      setTicketData({
        ...ticketData,
        title: '',
        description: '',
        price: '',
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
          <h1 className="text-center text-3xl font-bold text-gray-800">List a Ticket for Sale</h1>
          
          {successMsg && (
            <p className="text-green-500 text-center">{successMsg}</p>
          )}
          {errMsg && (
            <p className="text-red-500 text-center">{errMsg}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Set a title for the ticket you are selling: </label>
              <input 
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-gatorsBlue focus:border-gatorsBlue"
                type="text"
                name="title"
                value={ticketData.title}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Write a description of the ticket you are selling: </label>
              <input 
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-gatorsBlue focus:border-gatorsBlue"
                type="text"
                name="description"
                value={ticketData.description}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Price ($): </label>
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sell;
