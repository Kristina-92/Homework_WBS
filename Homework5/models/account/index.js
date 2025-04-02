const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const AccountsModel = mongoose.model("Account", accountSchema, "accounts");

const getAccounts = async () => {
  return await AccountsModel.find();
};

const getByEmail = async (email) => {
  return await AccountsModel.findOne({ email });
};

const createAccount = async (data) => {
  const newAccount = new AccountsModel(data);
  return await newAccount.save();
};

const updateAccount = async (_id, data) => {
  return await AccountsModel.updateOne({ _id }, data);
};

const removeAccount = async (_id) => {
  return await AccountsModel.deleteOne({ _id });
};

module.exports = {
  getAccounts,
  getByEmail,
  createAccount,
  updateAccount,
  removeAccount,
};
