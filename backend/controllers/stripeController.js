const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createConnectedAccount = async (req, res) => {
    try {
        const account = await stripe.accounts.create({
            type: 'express',
            country: 'US',
            email: req.body.email, // Seller's email
        });
        res.status(200).send({ accountId: account.id });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const createPaymentIntent = async (req, res) => {
    try {
        const { amount, feeAmount, sellerAccountId } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Total price in cents
            currency: 'usd',
            payment_method_types: ['card'],
            application_fee_amount: feeAmount, // Your platform fee in cents
            transfer_data: {
                destination: sellerAccountId, // Seller's Connected Account ID
            },
        });

        res.status(200).send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const handleWebhooks = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
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
