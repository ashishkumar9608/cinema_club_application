// controllers/theater.js
const Theater = require('../models/Theater');

// Reserve seats in the theater
exports.reserveSeats = async (req, res) => {
  const { numSeatsToReserve } = req.body;

  try {
    const theater = await Theater.findOne(); // Retrieve the single theater

    if (!theater) {
      return res.status(404).json({ error: 'Theater not found' });
    }

    // Check if there are enough available seats to reserve
    if (theater.bookedSeats + numSeatsToReserve > theater.totalSeats) {
      return res.status(400).json({ error: 'Not enough available seats' });
    }

    // Update the bookedSeats count
    theater.bookedSeats += numSeatsToReserve;

    await theater.save();

    res.json({ message: `${numSeatsToReserve} seats reserved successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get seat availability for the single theater
exports.getSeatAvailability = async (req, res) => {
  try {
    const theater = await Theater.findOne(); // Retrieve the single theater

    if (!theater) {
      return res.status(404).json({ error: 'Theater not found' });
    }

    const availableSeats = theater.totalSeats - theater.bookedSeats;

    res.json({ availableSeats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Cancel reserved seats in the theater
exports.cancelSeats = async (req, res) => {
  const { numSeatsToCancel } = req.body;

  try {
    const theater = await Theater.findOne(); // Retrieve the single theater

    if (!theater) {
      return res.status(404).json({ error: 'Theater not found' });
    }

    // Ensure there are enough booked seats to cancel
    if (theater.bookedSeats < numSeatsToCancel) {
      return res.status(400).json({ error: 'Not enough booked seats to cancel' });
    }

    // Update the bookedSeats count
    theater.bookedSeats -= numSeatsToCancel;

    await theater.save();

    res.json({ message: `${numSeatsToCancel} seats canceled successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
