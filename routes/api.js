
const express = require('express');
const router = express.Router();
// Import your theater controller functions
const theaterController = require('../controllers/theater');

// Import your movie-related controller functions
const movieController = require('../controllers/movie');

// Get all movies
router.get('/movies', movieController.getAllMovies);

// Create a new movie
router.post('/movies', movieController.createMovie);

// Get a movie by ID
router.get('/movies/:id', movieController.getMovieById);

// Update a movie by ID
router.put('/movies/:id', movieController.updateMovieById);

// Delete a movie by ID
router.delete('/movies/:id', movieController.deleteMovieById);






// Reserve seats in a theater
router.post('/theaters/seats/reserve', theaterController.reserveSeats);

// Get seat availability for a specific theater
router.get('/theaters/seats', theaterController.getSeatAvailability);

// Purchase reserved seats
// router.post('/theaters/seats/purchase', theaterController.purchaseSeats);

module.exports = router;
