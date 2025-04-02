const validateSchema = require("../helper/validateSchema");
const {
  getMovies,
  getSingleMovie,
  getUserMovies,
  createMovie,
  updateMovie,
  removeMovie,
} = require("../models/movie/movie");
const { MovieCreate, MovieUpdate } = require("../models/movie/validate");

const getAllMovies = async (req, res) => {
  try {
    const movies = await getMovies();
    return res.status(200).send(movies);
  } catch (err) {
    return res.status(500).send("Internal Server Error!");
  }
};

const getAllMoviesForUser = async (req, res) => {
  try {
    const userMovies = await getUserMovies(req.auth.id);
    return res.status(200).send(userMovies);
  } catch (err) {
    return res.status(500).send("Internal Server Error!");
  }
};

const createNewMovie = async (req, res) => {
  try {
    const movieData = {
      ...req.body,
      user_id: req.auth.id,
    };
    await validateSchema(movieData, MovieCreate);
    const newMovie = await createMovie(movieData);
    return res.status(200).send("Movie created successfully!", newMovie);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const updateCurrentMovie = async (req, res) => {
  try {
    await validateSchema(req.body, MovieUpdate);

    const findMovie = await getSingleMovie(req.params.id);
    if (!findMovie) {
      return res.status(400).send("Movie not found!");
    }
    if (findMovie.user_id.toString() !== req.auth.id.toString()) {
      return res.status(400).send("The user is not owner of this movie");
    }
    await updateMovie(req.params.id, req.body);
    return res.status(200).send("Movie updated successfully!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error!", err);
  }
};

const removeCurrentMovie = async (req, res) => {
  try {
    const findMovie = await getSingleMovie(req.params.id);
    if (!findMovie) {
      return res.status(400).send("Movie not found!");
    }
    if (findMovie.user_id.toString() !== req.auth.id.toString()) {
      return res.status(400).send("The user is not owner of this movie! ");
    }
    await removeMovie(req.params.id);
    return res.status(200).send("Movie deleted successfully!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error!");
  }
};

module.exports = {
  getAllMovies,
  getAllMoviesForUser,
  createNewMovie,
  updateCurrentMovie,
  removeCurrentMovie,
};
