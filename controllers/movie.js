

// Define your movie-related controller functions here
const Movie = require('../models/Movie');

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new movie
exports.createMovie = async (req, res) => {
  const { title, description, releaseDate } = req.body;
  try {
    const movie = new Movie({ title, description, releaseDate });
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a movie by ID
exports.getMovieById = async (req, res) => {
  const movieId = req.params.id;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
    } else {
      res.json(movie);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a movie by ID
exports.updateMovieById = async (req, res) => {
  const movieId = req.params.id;
  const { title, description, releaseDate } = req.body;
  try {
    const movie = await Movie.findByIdAndUpdate(movieId, { title, description, releaseDate }, { new: true });
    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
    } else {
      res.json(movie);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a movie by ID
exports.deleteMovieById = async (req, res) => {
  const movieId = req.params.id;
  try {
    const movie = await Movie.findByIdAndRemove(movieId);
    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
    } else {
      res.json({ message: 'Movie deleted' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
