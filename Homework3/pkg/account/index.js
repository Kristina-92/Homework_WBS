const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  successfullLogins: {
    type: Number,
    default: 0,
  },
  unsuccessfullLogins: {
    type: Number,
    default: 0,
  },
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

const updateLoginStatus = async (_id, status) => {
  const account = await AccountsModel.findById(_id);
  if (status === "success") {
    account.successfullLogins += 1;
  } else {
    account.unsuccessfullLogins += 1;
  }
  return await account.updateOne({
    successfullLogins: account.successfullLogins,
    unsuccessfullLogins: account.unsuccessfullLogins,
  });
};

module.exports = {
  getAccounts,
  getByEmail,
  createAccount,
  updateAccount,
  removeAccount,
  updateLoginStatus,
};
