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

module.exports = { RecipeCreate, RecipeUpdate };
