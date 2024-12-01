const express = require('express');
const router = express.Router();
const { listTicket, getTickets, filterTicketsBySport } = require('../controllers/ticketController');
const { protect } = require('../middleware/auth')

router.post('/list-ticket', listTicket);
router.get('/get-tickets', getTickets);
router.get('/get-tickets-by-sport', filterTicketsBySport);

module.exports = router;