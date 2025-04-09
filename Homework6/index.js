const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const fileUpload = require("express-fileupload");

const connectDB = require("./pkg/db/config");
connectDB();
const { getSection } = require("./pkg/config");
const { login, register } = require("./handlers/auth");
const {
  upload,
  download,
  listFilesForUser,
  removeFile,
} = require("./handlers/storage");

const app = express();
app.use(express.json());

app.use(
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/auth/login", "/auth/register"],
  })
);

app.use(fileUpload());

app.post("/auth/login", login);
app.post("/auth/register", register);

app.post("/api/storage", upload);

app.get("/api/storage/:filename", download);

app.get("/api/list", listFilesForUser);

app.delete("/api/storage/:filename", removeFile);

app.listen(getSection("development").port, () =>
  console.log(`Server running on port ${getSection("development").port} `)
);
