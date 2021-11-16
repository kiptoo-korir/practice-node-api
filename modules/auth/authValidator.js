const { check } = require("express-validator");

const { getByEmail } = require("./authDAL");

const {
  validationHandler,
  notFoundHandler,
} = require("../../utils/validation");

// "There's no such email on record, please sign up to get an account."
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

          if (user.length !== 0) {
            return Promise.reject(
              "This email is already registered and linked to a user in the system. Please signup with another email or login to your account if it belongs to you."
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
      .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minSymbols: 0,
      })
      .withMessage(
        "Please ensure your password is at least 8 characters long, has at least one uppercase and lowercase letters."
      ),
    check("confirmPassword")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please confirm your password.")
      .custom(
        (confirmPassword, { req: request }) =>
          confirmPassword === request.body.password
      )
      .withMessage(
        "Password and the confirmed password fields must have the same password field"
      ),
  ];
}

function signInValidationRules() {
  return [
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
              "This email is not registered in our database. Please create a new account."
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
      .withMessage("Please input your password."),
  ];
}

module.exports = {
  validateRegister: [registerValidationRules(), validationHandler],
  validateSignIn: [signInValidationRules(), validationHandler],
};
