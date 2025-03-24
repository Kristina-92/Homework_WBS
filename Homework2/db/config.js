const mongoose = require("mongoose");

const URI =
  "mongodb+srv://<username>:<pass>@cluster0.je1al.mongodb.net/semos?retryWrites=true&w=majority&appName=Cluster0";

async function connect() {
  try {
    await mongoose.connect(URI);
    console.log("Mongo DB connected");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connect;
