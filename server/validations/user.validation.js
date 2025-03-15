const Joi = require("joi");
const {body}  = require("express-validator")


const validateRegisterInput = [
    body('name')
      .isString().withMessage('Name must be a string')
      .escape(),

    // Validate and sanitize email
    body('email')
      .isEmail().withMessage('Invalid email address')
      .normalizeEmail() // Normalizes email to lowercase
      .escape(), // Escape any special HTML characters in the email address

    // Validate password
    body('password')
      .trim()
      .escape()
]

const validateLoginInput = [
    // Validate and sanitize email
    body('email')
      .isEmail().withMessage('Invalid email address')
      .normalizeEmail() // Normalizes email to lowercase
      .escape(), // Escape any special HTML characters in the email address

    // Validate password
    body('password')
      .trim()
      .escape()
]

const validateEmail = [
  body("email").
    isEmail().withMessage("Invalid email address").
    normalizeEmail().
    escape()
]

const validatePassword = [
  body("password").
    trim().
    escape()
]

const validateUserData = [
  body('site')
    .isURL().withMessage('Please enter a valid URL')
    .optional(), // This can be use

  body("username").
    isEmail().withMessage("Invalid email entered").
    normalizeEmail().
    escape(),
  
  body('password')
    .trim()
    .escape()
]

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateEmail,
  validatePassword,
  validateUserData,
};
