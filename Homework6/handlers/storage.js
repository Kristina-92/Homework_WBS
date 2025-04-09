const fs = require("fs");

const makeId = require("../helper/strings");

const MAX_FILESIZE = 10 * 1024 * 1024;
const ALLOWED_FILETYPES = ["image/jpeg", "image/jpg", "image/png"];

const processFileUpload = async (file, userDirPath) => {
  if (MAX_FILESIZE < file.size) {
    return res.status(400).send("File exceeds max file size!");
  }

  if (!ALLOWED_FILETYPES.includes(file.mimetype)) {
    return res.status(400).send(`File type for ${file.name} not allowed!`);
  }

  const newFileName = file.name.split(".");
  const fileName = `${newFileName[0]}_${makeId(6)}.${newFileName[1]}`;
  const filePath = `${userDirPath}/${fileName}`;

  file.mv(filePath, (err) => {
    if (err) {
      return "Internal Server error!", err;
    }
    return { file_name: fileName };
  });

  return fileName;
};

const upload = async (req, res) => {
  try {
    console.log("files", req.files);
    const documentKey = Object.keys(req.files);

    console.log("KEY:", documentKey);

    if (!req.files) {
      return res.status(400).send("No file was uploaded");
    }

    const userDir = `user_${req.auth.id}`;
    const userDirPath = `${__dirname}/../uploads/${userDir}`;

    if (!fs.existsSync(userDirPath)) {
      fs.mkdirSync(userDirPath);
    }

    const uploadedFiles = [];

    for (const key of documentKey) {
      const file = req.files[key];

      const fileName = await processFileUpload(file, userDirPath);
      uploadedFiles.push(fileName);
    }
    return res.status(200).send({ uploadedFiles: uploadedFiles });
  } catch (err) {
    res.status(500).send("Error", err.message);
  }
};

const download = async (req, res) => {
  const userDir = `user_${req.auth.id}}`;
  const userDirPath = `${__dirname}/../uploads/${userDir}`;
  const filePath = `${userDirPath}/${req.params.filename}`;

  console.log("filePath", filePath);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File does not exists!");
  }
  return res.download();
};

const listFilesForUser = async (req, res) => {
  const userDir = `user_${req.auth.id}`;
  const userDirPath = `${__dirname}/../uploads/${userDir}`;

  if (!fs.existsSync(userDirPath)) {
    return res.status(404).send("User directory not found!");
  }

  const userFilesList = fs.readdirSync(userDirPath);
  return res.status(200).send(userFilesList);
};

const removeFile = async (req, res) => {
  const userDir = `user_${req.auth.id}`;
  const userDirPath = `${__dirname}/../uploads/${userDir}`;
  const filePath = `${userDirPath}/${req.params.filename}`;

  if (!fs.existsSync(filePath)) {
    console.log("file path:", filePath);
    return res.status(404).send("File not found!");
  }

  fs.rmSync(filePath);

  const userFilesList = fs.readdirSync(userDirPath);
  if (userFilesList.length === 0) {
    console.log("User files list length:", userFilesList.length);
    fs.rmdirSync(userDirPath);
    return res.status(200).send("Directory removed because it was empty.");
  }
  return res
    .status(200)
    .send(`File ${req.params.filename} successfully deleted!`);
};

module.exports = { upload, download, listFilesForUser, removeFile };
