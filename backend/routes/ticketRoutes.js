const express = require('express');
const router = express.Router();
const { listTicket, getTicket, filterTicketsBySport, getAllTickets } = require('../controllers/ticketController');
const { protect } = require('../middleware/auth')

router.post('/list-ticket', listTicket);
router.get('/get-ticket/:id', getTicket);
router.get('/get-all-tickets', getAllTickets);
router.get('/get-tickets-by-sport', filterTicketsBySport);

module.exports = router;