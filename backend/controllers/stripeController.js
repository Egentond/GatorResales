const User = require('../models/User');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Stripe secret key

// Create a connected account
const createConnectedAccount = async (req, res) => { 
    try {
        const account = await stripe.accounts.create({ // Create a Stripe account
            type: 'express', // Account type
            country: 'US', // Country
            email: req.body.email, // Seller's email
        });
        res.status(200).send({ accountId: account.id }); // Send the account ID to the client
    } catch (error) {
        res.status(400).send({ error: error.message }); // Send an error message to the client
    }
}

// Create a payment intent
const createPaymentIntent = async (req, res) => { 
    const { price, sellerId } = req.body;

    console.log(sellerId); // Log the seller ID
    try {
        const { stripeAccountId } = await User.findById(sellerId); // Find the seller's Stripe account ID
        // Create the payment intent without transfer
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(price * 100), // amount in cents
            currency: 'usd',
            automatic_payment_methods: { // Enable automatic payment methods
                enabled: true,
            },
            transfer_data: { // Transfer the payment to the seller's account
                destination: stripeAccountId, 
            },
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret }); // Send the client secret to the client
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Failed to create payment intent' }); // Send an error message to the client
    }
};

const handleWebhooks = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;    // Stripe webhook

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);  // Construct the event
    } catch (error) {
        console.error('Webhook signature verification failed:', error.message); 
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    // Handle specific event types
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log(`PaymentIntent ${paymentIntent.id} was successful!`);
            // Notify buyer and seller here
            break;
        case 'payment_intent.payment_failed':
            console.error(`PaymentIntent ${event.data.object.id} failed.`);
            break;
        default:
            console.warn(`Unhandled event type: ${event.type}`);
    }

    res.status(200).send('Event processed');
}

module.exports = {
    createConnectedAccount,
    createPaymentIntent,
    handleWebhooks   
}
