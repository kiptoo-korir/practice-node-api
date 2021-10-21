const { check } = require("express-validator");
const { validationHandler } = require("../../utils/validation");

function eventValidationRules() {
  let yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  return [
    check("eventName")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide the title of the event."),
    check("eventDate")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please indicate when the event will occur.")
      .isDate()
      .isAfter(yesterdayDate.toISOString())
      .withMessage(
        "Please ensure the date provided is either today or after today"
      ),
    check("eventTime")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please indicate the time the event is supposed to start."),
    check("location")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please indicate the time the event is supposed to start.")
      .isString(),
    check("location").trim().escape().isString(),
  ];
}

module.exports = {
  validate: [eventValidationRules(), validationHandler],
};
