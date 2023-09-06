const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  name: String,
  totalSeats: Number,   // Total number of seats in the theater
  bookedSeats: Number,  // Number of seats currently booked
});

module.exports = mongoose.model('Theater', theaterSchema);
