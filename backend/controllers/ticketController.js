const Ticket = require('../models/Ticket');

const listTicket = async (req, res) => { // Create a new ticket
    const { sellerId, title, sport, description, price } = req.body;
    
    if (!sellerId || !title || !sport || !price) {  
        return res.status(400).json({ status: "error", message: "Missing required fields" });
    }

    try {
        const ticket = new Ticket({  // Create a new ticket
            sellerId,
            title,
            sport,
            description,
            price,
        });

        const createdTicket = await ticket.save(); // Save the ticket to the database
        res.status(201).json(createdTicket); // Return the created ticket
    } catch(error) {
        res.status(500).json({ error: error.message }); // Return an error response
        console.error(error);
    }
}

const getTicket = async (req, res) => { // Get a ticket by ID
    const { id } = req.params;

    try {
        const ticket = await Ticket.findById(id); // Find a ticket by ID

        if(!ticket) {
            return res.status(404).json({ status: "error", message: "Ticket does not exist" }); // Return an error response
        }

        res.status(200).json({ status: "success", data: ticket }); // Return the ticket
    } catch(error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
}

const getAllTickets = async (req, res) => { // Get all tickets
    try {
        const tickets = await Ticket.find({ status: { $ne: "sold" } }).select('-__v'); // Find all tickets that are not sold
        res.status(200).json({ status: "success", data: tickets }); // Return the tickets
    } catch (error) {
        res.status(500).json({ error: error.message }); // Return an error response
        console.error(error);
    }
};

const filterTicketsBySport = async (req, res) => { // Filter tickets by sport
    const { sport } = req.query;

    if (!sport) {
        return res.status(400).json({ status: "error", message: "Missing sport parameter" }); // Return an error response
    }

    try {
        const tickets = await Ticket.find({ sport, status: { $ne: "sold" } }).select('-__v'); // Find all tickets that are not sold and match the sport

        if (tickets.length === 0) {
            return res.status(404).json({ status: "error", message: "No tickets found for this sport" }); // Return an error response
        }

        res.status(200).json({ status: "success", data: tickets }); // Return the tickets
    } catch (error) {
        res.status(500).json({ error: error.message }); // Return an error response
        console.error(error);
    }
};


const updateTicketStatus = async (req, res) => { // Update ticket status after purchase
    const { ticketId } = req.body;

    try {
        const ticket = await Ticket.findById(ticketId); // Find a ticket by ID
        console.log(ticket);
        if(!ticket) {
            return res.status(404).json({ error: 'Ticket not found' }); // Return an error response
        }
        ticket.status = "sold"; // Update the ticket status to sold
        await ticket.save(); // Save the updated ticket to the database

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