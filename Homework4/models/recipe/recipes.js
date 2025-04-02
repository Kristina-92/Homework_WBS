const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  user_id: {
    immutable: true,
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Account",
  },
  name: String,
  cuisine: String,
  ingredients: { type: Map, of: String },
  method: { type: Map, of: String },
  prep_time: String,
  cook_time: String,
  servings: Number,
});

const RecipeModel = mongoose.model("Recipe", recipeSchema, "recipes");

const getAll = async (id) => {
  return await RecipeModel.find({ user_id: id });
};
const getOne = async (id) => {
  return await RecipeModel.findOne({ _id: id });
};

const create = async (data) => {
  const newRecipe = new RecipeModel(data);
  return await newRecipe.save();
};

const update = async (id, data) => {
  return await RecipeModel.updateOne({ _id: id }, data);
};

const remove = async (id) => {
  return await RecipeModel.deleteOne({ _id: id });
};

module.exports = { getAll, getOne, create, update, remove };
