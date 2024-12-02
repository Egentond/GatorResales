import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("your-publishable-key"); // Replace with your publishable key

const CheckoutForm = () => {
    const handlePayment = async (event) => {
        event.preventDefault();
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000",
            },
        });

        if (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        // Fetch PaymentIntent from your backend and initialize Elements
    }, []);

    return (
        <form id="payment-form" onSubmit={handlePayment}>
            <div id="payment-element">{/* Stripe Elements injected here */}</div>
            <button type="submit">Pay</button>
            <div id="error-message"></div>
        </form>
    );
};

const StripeCheckoutForm = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default StripeCheckoutForm;
