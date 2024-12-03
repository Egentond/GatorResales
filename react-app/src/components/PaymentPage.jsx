import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router-dom'; 
import axiosInstance from '../api/axiosInstance';
import Menu from './Menu';

const stripePromise = loadStripe('pk_test_51QROxHHTccflFChqWBmvWXakB242MQTY75AF2OVal1kHPrIjezauC3owcfxguzaI62kXAihQS4FukOcMBGu2UWdT00HtOaskbL');

const PaymentForm = ({ amount, sellerId, ticketId}) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate(); // Initialize navigate hook

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const { error: submitError } = await elements.submit();
        if (submitError) {
            console.error('Form submission failed:', submitError.message);
            return;
        }
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment-success?redirect_status=successful&sellerId=${sellerId}&amount=${amount}&ticketId=${ticketId}`,
            },
        });
        if (error) {
            console.error('Payment failed:', error.message);
        }
        else if (paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded!');
        }  
    };

    return (
        <>
            <div className="flex bg-gray-100 min-h-screen">
                <div className=" mx-auto py-8">
                    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md">
                        <div className="space-y-6">
                            {/* Add spacing between form elements */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Card Details
                                </label>
                                <div className="border border-gray-300 rounded-md p-3">
                                    <PaymentElement />
                                </div>
                            </div>
                            {/* Button spacing and alignment */}
                            <div className="flex justify-end">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                    type="submit"
                                    disabled={!stripe}
                                >
                                    Pay Now
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

const PaymentPage = () => {
    const location = useLocation(); // Get state passed from navigation
    const { ticketId } = location.state || {}; // Destructure offerId from state

    const [details, setTicketDetails] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTicketDetails = async () => {
            try {
                console.log(ticketId);
                const response = await axiosInstance.get(`/tickets/get-ticket/${ticketId}`);
                console.log(response);
                setTicketDetails(response.data.data);
                
                // After offer details are fetched, create the payment intent
                if (response.data) {
                    const { price, sellerId } = response.data.data;
                    const paymentIntentResponse = await axiosInstance.post('/stripe/create-payment-intent', {
                        price,
                        sellerId,
                    });
                    setClientSecret(paymentIntentResponse.data.clientSecret);
                }

                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch offer details or create payment intent:', error);
                setLoading(false);
            }
        };

        if (ticketId) {
            fetchTicketDetails();
        } else {
            console.error("offerId is undefined");
            setLoading(false);
        }
    }, [ticketId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!details || !clientSecret) {
        return <p>Offer not found or payment setup failed.</p>;
    }

    // Configure Stripe's Elements with the clientSecret
    const options = {
        clientSecret: clientSecret,
    };

    return (
        <>
            {/* Conditionally render Elements only if clientSecret is available */}
            {clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                    <PaymentForm 
                        amount={details.amount} 
                        sellerId={details.sellerId} 
                        ticketId={details._id}
                    />
                </Elements>
            )}
        </>
    );
};

export default PaymentPage;