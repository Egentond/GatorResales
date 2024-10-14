import axiosInstance from "../api/axiosInstance";
import Footer from "./Footer";
import Menu from "./Menu";
import { useEffect, useState } from "react";

export default function ListTicket() {
    
    const [userData, setUserData] = useState(null);
    const [ticketData, setTicketData] = useState({
        seller: '',
        sellerEmail: '',
        buyer: '',
        title: '',
        description: '',
        price: '',
        status: '',
    });
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axiosInstance.get('/users/user-data', {
    //                 withCredentials: true,
    //             });
    //             setUserData(response.data);
    //         } catch(error) {
    //             console.error('Failed to fetch user data', error);
    //         }
            
    //     };

    //     fetchData();
    // }, []);

    // useEffect(() => {
    //     if(userData) {
    //         setTicketData((prevData) => ({
    //             ...prevData,
    //             seller: userData._id,
    //             sellerEmail: userData.email,
    //         }))
    //     }
    // }, [userData]);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTicketData((prevData) => ({ ...prevData, [name]: value }));
        setSuccessMsg('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        Object.entries(ticketData).forEach(([key, value]) => {
          formData.append(key, value);
        });
    
        try {
          const response = await axiosInstance.post('', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          setSuccessMsg('Ticket listing posted successfully.');
          setErrMsg('');
          console.log(response.data);
    
          setTicketData((prevData) => ({
            ...prevData,
            
          }));
        } catch (error) {
          console.error('Error posting listing:', error);
          setErrMsg('Failed to post listing.');
        }
    };
    
    return(
        <>
            <Menu />
            <div>
                <h1> List a Ticket for Sale </h1>
                <form onSubmit={handleSubmit}>
                    
                    <div>
                        <label>The seller's (your) email</label>
                        {/* <p>{ticketData.sellerEmail}</p> */}
                    </div>
                    
                    <div>
                        <label>Set a title for the ticket you are selling</label>
                        <input 
                            className=""
                            type="text"
                            name="title"
                            value={ticketData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Write a description of the ticket you are selling</label>
                        <input 
                            className=""
                            type="text"
                            name="description"
                            value={ticketData.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <button>
                        Post Ticket
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );

}

