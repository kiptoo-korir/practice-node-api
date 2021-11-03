const { check } = require("express-validator");

const { getByEmail } = require("./authDAL");

const {
  validationHandler,
  notFoundHandler,
} = require("../../utils/validation");
const { request } = require("express");

function registerValidationRules() {
  return [
    check("name")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please input you name."),
    check("email")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please input your email.")
      .isEmail()
      .withMessage("Please input a valid email")
      .custom(async (email) => {
        try {
          const user = await getByEmail(email);

          if (user.length === 0) {
            return Promise.reject(
              "There's no such email on record, please sign up to get an account."
            );
          }
        } catch (error) {
          throw error;
        }
      }),
    check("password")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please input your password.")
      .isStrongPassword(),
    check("confirmPassword")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please ensure that the password is confirmed.")
      .custom((confirmPassword) => {
        try {
          if (confirmPassword !== request.body.password) {
            return Promise.reject(
              "Please ensure that the two passwords match."
            );
          }
        } catch (error) {
          throw error;
        }
      }),
  ];
}
