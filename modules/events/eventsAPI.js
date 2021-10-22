const express = require("express");
const router = express.Router();

const {
  getEvent,
  getEvents,
  createEvent,
  deleteEvent,
} = require("./eventsController");

const {
  validate,
  validateDelete,
  validateGetEvent,
} = require("./eventsValidator");

router.get("/:id", validateGetEvent, async (request, response) => {
  const { params } = request;
  const { id } = params;

  const event = await getEvent(id);
  response.json({ event });
});

router.get("/", async (request, response) => {
  const events = await getEvents();
  response.json({ events });
});

router.post("/", validate, async (request, response) => {
  const { body } = request;
  const { eventName, eventDate, eventTime, location, remarks } = body;
  const eventObject = {
    eventName,
    eventDate,
    eventTime,
    location,
    remarks,
  };

  const newEvent = await createEvent(eventObject);
  response.status(200).json({ event: newEvent });
});

router.delete("/", validateDelete, async (request, response) => {
  const { body } = request;
  const { eventId } = body;

  const state = await deleteEvent(eventId);

  if (state) {
    response
      .status(200)
      .json({ message: "Event has been removed successfully" });
  }
});

module.exports = {
  router,
};
