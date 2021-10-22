const { check, param } = require("express-validator");
const {
  validationHandler,
  notFoundHandler,
} = require("../../utils/validation");
const { getById } = require("./eventsDAL");

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

function deleteValidationRules() {
  return [
    check("eventId")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please ensure that you have selected an event to remove.")
      .custom(async (eventId) => {
        try {
          const event = await getById(eventId);

          if (!event) {
            throw new Error("Event not found.");
          }
        } catch (error) {
          throw error;
        }
      }),
  ];
}

function getEventRules() {
  return [
    // check("id")
    param("id")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please ensure that you have selected an event.")
      .custom((eventId) => {
        return getById(eventId)
          .then((event) => {
            if (event.length === 0) {
              return Promise.reject("Event not found.");
            }
          })
          .catch((error) => {
            throw error;
          });
      }),
  ];
}

module.exports = {
  validate: [eventValidationRules(), validationHandler],
  validateDelete: [deleteValidationRules(), notFoundHandler],
  validateGetEvent: [getEventRules(), notFoundHandler],
};
