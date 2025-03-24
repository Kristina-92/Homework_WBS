const fs = require("fs");

const read = async (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) return reject(err);
      data = JSON.parse(data);
      return resolve(data);
    });
  });
};

const write = async (fileName, data) => {
  return new Promise((resolve, reject) => {
    data = JSON.stringify(data);
    fs.writeFile(fileName, data, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};

module.exports = { read, write };
