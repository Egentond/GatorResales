const mongoose = require('mongoose');
const User = require('./User');
const bcrypt = require('bcryptjs');

const ticketSchema = new mongoose.Schema({
    seller: {type: String, required: true},
    sellerEmail: {type: String},
    buyer: {type: String},
    title: {type: String, required: true},
    sport: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    status: {type: String, default: 'open'},
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;