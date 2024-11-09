const Ticket = require('../models/Ticket');

const listTicket = async (req, res) => {
    const { seller, title, description, price } = req.body;
    
    try {
        const ticket = new Ticket({
            seller,
            title,
            description,
            price,
        });

        const createdTicket = await ticket.save();
        res.status(201).json(createdTicket);
    } catch(error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
}

const getTicket = async (req, res) => {

}

module.exports = {
    listTicket,
    getTicket
}