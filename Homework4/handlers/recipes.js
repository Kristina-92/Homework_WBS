const validateSchema = require("../helper/validateSchema");
const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = require("../models/recipe/recipes");
const { RecipeCreate, RecipeUpdate } = require("../models/recipe/validate");

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await getAll(req.auth.id);
    return res.status(200).send(recipes);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};

const createRecipe = async (req, res) => {
  try {
    const recipe = { ...req.body, user_id: req.auth.id };
    await validateSchema(recipe, RecipeCreate);
    const newRecipe = await create(recipe);
    return res.status(200).send("Recipe created successfully", newRecipe);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};

const updateRecipe = async (req, res) => {
  try {
    await validateSchema(req.body, RecipeUpdate);

    const findRecipe = await getOne(req.params.id);
    if (!findRecipe) {
      return res.status(400).send("Recipe not found!");
    }
    if (findRecipe.user_id.toString() !== req.auth.id.toString()) {
      return res.status(400).send("The user is not owner of this recipe!");
    }
    const updatedRecipe = await update(req.params.id, req.body);

    return res.status(200).send("Recipe updated successfully", updatedRecipe);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Internal server error");
  }
};

const removeRecipe = async (req, res) => {
  try {
    const findRecipe = await getOne(req.params.id);

    if (!findRecipe) {
      return res.status(400).send("Recipe not found!");
    }
    if (findRecipe.user_id.toString() !== req.auth.id.toString()) {
      return res.status(400).send("The user is not owner of this recipe!");
    }
    const removedRecipe = await remove(req.params.id);

    return res.status(200).send("Recipe removed successfully", removedRecipe);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports = { getAllRecipes, createRecipe, updateRecipe, removeRecipe };
