const { Validator } = require("node-input-validator");

// data -> req.body , schema -> Account Schema
const AccountLogin = {
  email: "required|email",
  password: "required|string",
};

const AccountRegister = {
  username: "required|string",
  email: "required|email",
  password: "required|string",
  confirmPassword: "required|string",
};

const AccountCreate = {
  username: "required|string",
  email: "required|email",
  password: "required|string",
};

const AccountUpdate = {
  username: "string",
  email: "string",
  password: "string",
};

module.exports = {
  AccountCreate,
  AccountUpdate,
  AccountLogin,
  AccountRegister,
};
