const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    title: String,
    year: Number,
    genre: String,
    director: String,
    rating: Number,
    duration: String,
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Account",
      immutable: true,
    },
  },
  { timestamps: true }
);

const movieModel = mongoose.model("Movie", movieSchema, "movies");

const getMovies = async () => {
  return await movieModel.find();
};

const getSingleMovie = async (id) => {
  return await movieModel.findOne({ _id: id });
};

const getUserMovies = async (user_id) => {
  return await movieModel.find({ user_id: user_id });
};

const createMovie = async (data) => {
  const newMovie = new movieModel(data);
  return await newMovie.save();
};

const updateMovie = async (id, data) => {
  return await movieModel.updateOne({ _id: id }, data);
};

const removeMovie = async (id) => {
  return await movieModel.deleteOne({ _id: id });
};

module.exports = {
  getMovies,
  getSingleMovie,
  getUserMovies,
  createMovie,
  updateMovie,
  removeMovie,
};
