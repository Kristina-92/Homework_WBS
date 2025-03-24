const { read, write } = require("../read-write");

const getRecipes = async (req, res) => {
  try {
    const recipes = await read("recipes.json");
    res.status(200).send(recipes);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Intrenal server error");
  }
};
const addRecipe = async (req, res) => {
  try {
    const recipes = await read("recipes.json");
    const newRecipe = req.body;
    recipes.push(newRecipe);
    await write("recipes.json", recipes);
    return res.status(200).send("New recipe successfully added");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};

const updateRecipe = async (req, res) => {
  try {
    let recipes = await read("recipes.json");
    const recipeId = Number(req.params.id);
    const updatedData = req.body;
    recipes = recipes.map((recipe, index) => {
      if (index === recipeId) {
        return {
          ...recipe,
          ...updatedData,
        };
      }
      return recipe;
    });
    await write("recipes.json", recipes);
    return res.status(200).send("Recipe updated successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};

const removeRecipe = async (req, res) => {
  try {
    let recipes = await read("recipes.json");
    const recipeId = Number(req.params.id);
    recipes = recipes.filter((_, index) => index !== recipeId);
    await write("recipes.json", recipes);
    return res.status(200).send("Recipe deleted successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};

module.exports = { getRecipes, addRecipe, updateRecipe, removeRecipe };
