const express = require('express');
const { createConnectedAccount, createPaymentIntent, handleWebhooks } = require('../controllers/stripeController');
const router = express.Router();

// Route to create a connected account for sellers
router.post('/create-connected-account', createConnectedAccount);

// Route to create a payment intent
router.post('/create-payment-intent', createPaymentIntent);

// Route to handle Stripe webhooks
router.post('/webhook', handleWebhooks);

module.exports = router;
