const { get, create, update, remove } = require("../models/recipes");
const {
  validateRecipe,
  RecipeCreate,
  RecipeUpdate,
} = require("../models/validate");

const getRecipes = async (req, res) => {
  try {
    const recipes = await get();
    return res.status(200).send(recipes);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};

const createRecipe = async (req, res) => {
  try {
    const newRecipe = req.body;
    await validateRecipe(newRecipe, RecipeCreate);
    await create(newRecipe);
    return res.status(200).send("Recipe created successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};

const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const dataToUpdate = req.body;
    await validateRecipe(dataToUpdate, RecipeUpdate);
    await update(recipeId, dataToUpdate);
    return res.status(200).send("Recipe updated successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};

const removeRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    await remove(recipeId);
    return res.status(200).send("Recipe removed successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports = { getRecipes, createRecipe, updateRecipe, removeRecipe };
