const express = require("express");
const { validateRegister, validateSignIn } = require("./authValidator");
const { register, signIn } = require("./authController");

const router = express.Router();

router.post("/register", validateRegister, async (request, response) => {
  const { body } = request;
  const { name, email, password } = body;

  const userObject = { name, email, password };

  try {
    const newUser = await register(userObject);
    response.status(200).json({ user: newUser });
  } catch (error) {
    throw error;
  }
});

router.post("/login", validateSignIn, async (request, response) => {
  const { body } = request;
  const { email, password } = body;

  const userObject = { email, password };

  try {
    const token = await signIn(userObject);

    if (token) {
      response
        .status(200)
        .json({ msg: "Logged in successfully.", token: token });

      return;
    }

    response.status(401).json({
      errors: [
        {
          value: password,
          message:
            "You have provided the wrong password. Please enter the correct password.",
          param: "password",
        },
      ],
    });
  } catch (error) {
    throw error;
  }
});

module.exports = {
  router,
};
