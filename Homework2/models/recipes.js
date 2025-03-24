const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  name: String,
  cuisine: String,
  ingredients: { type: Map, of: String },
  method: { type: Map, of: String },
  prep_time: String,
  cook_time: String,
  servings: Number,
});

const RecipeModel = mongoose.model("Recipe", recipeSchema, "recipes");

const get = async () => {
  return await RecipeModel.find();
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

module.exports = { get, create, update, remove };
