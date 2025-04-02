const MovieCreate = {
  title: "required|string",
  year: "required|integer",
  genre: "required|string",
  director: "required|string",
  rating: "required|integer",
  duration: "required|string",
};

const MovieUpdate = {
  title: "string",
  year: "integer",
  genre: "string",
  director: "string",
  rating: "integer",
  duration: "string",
};

module.exports = { MovieCreate, MovieUpdate };
