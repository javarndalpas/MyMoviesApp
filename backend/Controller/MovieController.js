import { Movie } from "../Model/Movie.js";

const addMovie = async (req, res) => {
  try {
    const { title, description, rating, image, addedBy } = req.body;

    if (!title || !description || rating == null) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    const movieExists = await Movie.findOne({ title });
    if (movieExists) {
      return res.status(400).json({ message: "Movie already exists." });
    }

    const newMovie = new Movie({ title, description, rating, image, addedBy });
    const savedMovie = await newMovie.save();

    res.status(201).json({ message: "Movie added successfully!", movie: savedMovie });
  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
const fetchMovies = async (req, res) => {
  try {
    const users = await Movie.find();
    if (users.length === 0) {
      res.status(404).json({ message: "Movies not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json("Internal Server Error");
    console.log(error);
  }
}
const searchMovies = async (req, res) => {
  try {
    console.log("Enter");
    const { title ,description,rating } = req.query;

    // Build the search criteria dynamically
    const query = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' }; 
    } 
    
    console.log(query);
    if (description) {
      query.description = { $regex: description, $options: 'i' };
    }
    if (rating) {
      query.rating = Number(rating); 
    }


    const movies = await Movie.find(query);

    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found matching the criteria." });
    }

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error searching for movies:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
const rateMovie = async (req, res) => {
  try {
    const { movieId, userId, score } = req.body;

    if (!movieId || !userId || score == null || score < 0 || score > 10) {
      return res.status(400).json({ message: "Invalid input." });
    }

   
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }

    const existingRating = movie.ratings.find((rating) => rating.user.toString() === userId);

    if (existingRating) {
      existingRating.score = score;
    } else {
      movie.ratings.push({ user: userId, score });
    }

    // Calculate the new average rating
    const totalRatings = movie.ratings.length;
    const averageRating = movie.ratings.reduce((sum, rating) => sum + rating.score, 0) / totalRatings;
    movie.rating = averageRating.toFixed(1); 

    // Save the movie
    await movie.save();

    res.status(200).json({ message: "Rating added/updated successfully!", movie });
  } catch (error) {
    console.error("Error rating movie:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


const MovieController = {
  addMovie,
  fetchMovies,
  searchMovies,
  rateMovie
};

export default MovieController;
