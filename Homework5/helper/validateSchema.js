const { Validator } = require("node-input-validator");

const validateSchema = async (data, schema) => {
  const validator = new Validator(data, schema);
  const valid = await validator.check();
  if (!valid) {
    throw {
      code: 400,
      error: "Client-side error",
      details: validator.errors,
    };
  }
};

module.exports = validateSchema;
