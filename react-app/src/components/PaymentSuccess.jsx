import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ticketId = queryParams.get("ticketId");
  const paymentIntentId = queryParams.get("payment_intent");
  const paymentIntentClientSecret = queryParams.get(
    "payment_intent_client_secret",
  );
  const redirectStatus = queryParams.get("redirect_status");

  useEffect(() => {
    const updateDataBase = async () => {
      console.log(ticketId);
      try {
        const response = await axiosInstance.post(
          "tickets/update-ticket-status",
          {
            ticketId,
          },
        );
        console.log("Successful update");
        console.log(response.data);
      } catch (error) {
        console.error("Failed to update database payment status", error);
      }
    };
    updateDataBase();
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
      <div className="mt-6">
        <a
          href="/"
          className="px-4 py-2 bg-gatorsBlue text-white rounded-md hover:bg-gatorsOrange transition-colors"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
