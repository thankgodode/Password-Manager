const Joi = require("joi");

function validateRegisterInput(input) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(input);
}

function validateLoginInput(input) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(input);
}

function validateEmail(input) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
  });

  return schema.validate(input);
}

function validatePassword(input) {
  const schema = Joi.object({
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(input);
}

function validateUserData() {
  const schema = Joi.object({
    username: Joi.string(),
    password: Joi.string(),
  });

  return schema.validate(input);
}

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateEmail,
  validatePassword,
  validateUserData,
};
