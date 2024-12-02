import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Menu from './components/Menu.jsx';
import PageNotFound from './components/PageNotFound.jsx';
import Buy from './components/Buy.jsx';
import Sell from './components/Sell.jsx';
import Register from './components/Register.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';

// Stripe Checkout Component
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const publishableKey = process.env.PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishableKey); // Replace with your Stripe publishable key

function StripeCheckoutForm() {
  return (
    <Elements stripe={stripePromise}>
      <form id="payment-form">
        <div id="payment-element">{/* Stripe Elements will be injected here */}</div>
        <button type="submit">Pay</button>
        <div id="error-message"></div>
      </form>
    </Elements>
  );
}

function MainApp() {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('loggedIn') === 'true');

  useEffect(() => {
    // Update localStorage when loggedIn changes
    sessionStorage.setItem('loggedIn', loggedIn);
  }, [loggedIn]);

  return (
    <StrictMode>
      <Router>
        <Menu loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<Sell loggedIn={loggedIn} />} />
          <Route path="/buy" element={<Buy loggedIn={loggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login setLoggedIn={setLoggedIn} />} />
          <Route path="/checkout" element={<StripeCheckoutForm />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<MainApp />);
