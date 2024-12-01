const express = require('express');
const router = express.Router();
const { listTicket, getTickets } = require('../controllers/ticketController');
const { protect } = require('../middleware/auth')

router.post('/list-ticket', listTicket);
router.get('./get-ticket', getTickets);

module.exports = router;