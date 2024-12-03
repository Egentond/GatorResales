const Ticket = require('../models/Ticket');

const listTicket = async (req, res) => {
    const { sellerId, title, sport, description, price } = req.body;
    
    if (!sellerId || !title || !sport || !price) {
        return res.status(400).json({ status: "error", message: "Missing required fields" });
    }

    try {
        const ticket = new Ticket({
            sellerId,
            title,
            sport,
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
    const { id } = req.params;

    try {
        const ticket = await Ticket.findById(id);

        if(!ticket) {
            return res.status(404).json({ status: "error", message: "Ticket does not exist" });
        }

        res.status(200).json({ status: "success", data: ticket });
    } catch(error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
}

const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({ status: { $ne: "sold" } }).select('-__v');
        res.status(200).json({ status: "success", data: tickets });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

const filterTicketsBySport = async (req, res) => {
    const { sport } = req.query;

    if (!sport) {
        return res.status(400).json({ status: "error", message: "Missing sport parameter" });
    }

    try {
        const tickets = await Ticket.find({ sport, status: { $ne: "sold" } }).select('-__v');

        if (tickets.length === 0) {
            return res.status(404).json({ status: "error", message: "No tickets found for this sport" });
        }

        res.status(200).json({ status: "success", data: tickets });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};


const updateTicketStatus = async (req, res) => {
    const { ticketId } = req.body;

    try {
        const ticket = await Ticket.findById(ticketId);
        console.log(ticket);
        if(!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        ticket.status = "sold";
        await ticket.save();

        res.status(200).json({ status: "success" });
    } catch(error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
}
    


module.exports = {
    listTicket,
    getTicket,
    getAllTickets,
    filterTicketsBySport,
    updateTicketStatus
}