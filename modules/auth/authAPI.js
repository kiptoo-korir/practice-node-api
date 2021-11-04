const express = require("express");
const { validateRegister } = require("./authValidator");
const { register } = require("./authController");

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

module.exports = {
  router,
};
