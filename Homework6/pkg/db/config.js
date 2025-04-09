const mongoose = require("mongoose");

const { getSection } = require("../config/INDEX.JS");

const URI = `mongodb+srv://${getSection("development").MONGO_USERNAME}:${
  getSection("development").MONGO_PASSWORD
}@cluster0.je1al.mongodb.net/semos?retryWrites=true&w=majority&appName=Cluster0`;

async function connect() {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connect;
