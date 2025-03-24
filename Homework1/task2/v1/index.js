const express = require("express");

const {
  getRecipes,
  addRecipe,
  updateRecipe,
  removeRecipe,
} = require("./handlers/recipes");

const app = express();

app.use(express.json());

app.get("/recipes", getRecipes);
app.post("/recipes", addRecipe);
app.put("/recipes/:id", updateRecipe);
app.delete("/recipes/:id", removeRecipe);

app.listen(3030, () => console.log("Server is running on port 3030"));
