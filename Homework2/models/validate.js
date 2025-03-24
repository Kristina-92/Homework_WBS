const { Validator } = require("node-input-validator");

const RecipeCreate = {
  name: "required|string",
  cuisine: "string",
  ingredients: "required|object",
  method: "required|object",
  prep_time: "required|string",
  cook_time: "required|string",
  servings: "required|integer|min:1",
};

const RecipeUpdate = {
  name: "string",
  cuisine: "string",
  ingredients: "object",
  method: "object",
  prep_time: "string",
  cook_time: "string",
  servings: "integer|min:1",
};

const validateRecipe = async (data, schema) => {
  const validator = new Validator(data, schema);
  const valid = await validator.check();
  if (!valid) {
    throw {
      code: 400,
      error: "Client-side error",
      details: validator.errors,
    };
  }
};

module.exports = { RecipeCreate, RecipeUpdate, validateRecipe };
