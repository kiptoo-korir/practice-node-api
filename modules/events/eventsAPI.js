const express = require("express");
const router = express.Router();

const {
  getEvent,
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} = require("./eventsController");

const {
  validate,
  validateDelete,
  validateGetEvent,
  validateUpdateEvent,
} = require("./eventsValidator");

router.get("/:id", validateGetEvent, async (request, response) => {
  const { params } = request;
  const { id } = params;

  getEvent(id)
    .then((event) => {
      response.json({ event });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/", async (request, response) => {
  getEvents()
    .then((events) => {
      response.json({ events });
    })
    .catch((error) => {
      console.log(error);
    });
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

  createEvent(eventObject)
    .then((newEvent) => {
      response.status(200).json({ event: newEvent });
    })
    .catch((error) => console.error(error));
});

router.put("/", validateUpdateEvent, async (request, response) => {
  const { body } = request;
  const { eventId, eventName, eventDate, eventTime, location, remarks } = body;
  const eventObject = {
    eventName,
    eventDate,
    eventTime,
    location,
    remarks,
  };

  try {
    const updatedEvent = await updateEvent(eventObject, eventId);
    response.status(200).json({ event: updatedEvent });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/", validateDelete, async (request, response) => {
  const { body } = request;
  const { eventId } = body;

  try {
    const state = await deleteEvent(eventId);

    if (state === "removed") {
      response
        .status(200)
        .json({ message: "Event has been removed successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  router,
};
