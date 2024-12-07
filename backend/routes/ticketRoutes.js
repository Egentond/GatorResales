const express = require('express');
const router = express.Router();
const { listTicket, getTicket, filterTicketsBySport, getAllTickets, updateTicketStatus } = require('../controllers/ticketController');
const { protect } = require('../middleware/auth')

// Ticket routes
router.post('/list-ticket', listTicket); 
router.post('/update-ticket-status', updateTicketStatus);

router.get('/get-ticket/:id', getTicket);
router.get('/get-all-tickets', getAllTickets);
router.get('/get-tickets-by-sport', filterTicketsBySport);

module.exports = router;