import { Movie } from "../Model/Movie.js";

const addMovie = async (req, res) => {
  try {
    const { title, description, rating, image, addedBy } = req.body;

    if (!title || !description || rating == null ) {
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

const MovieController = {
  addMovie,
};

export default MovieController;
