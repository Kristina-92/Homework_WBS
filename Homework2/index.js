const express = require("express");

const {
  getRecipes,
  createRecipe,
  updateRecipe,
  removeRecipe,
} = require("./handlers/recipes.js");

const connectToDB = require("./db/config.js");
connectToDB();

const app = express();
app.use(express.json());

app.get("/recipes", getRecipes);
app.post("/recipes", createRecipe);
app.put("/recipes/:id", updateRecipe);
app.delete("/recipes/:id", removeRecipe);

app.listen(5000, () => console.log("Server is running on port 5000"));
