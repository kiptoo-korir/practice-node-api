const { getById, getAll, create, remove, update } = require("./eventsDAL");

async function getEvent(id) {
  try {
    const event = await getById(id);
    return event;
  } catch (error) {
    throw error;
  }
}

async function getEvents() {
  try {
    const events = await getAll();
    return events;
  } catch (error) {
    throw error;
  }
}

async function createEvent(event) {
  try {
    const eventArray = Object.values(event);
    console.log(eventArray, event);
    const newEvent = await create(eventArray);
    return newEvent;
  } catch (error) {
    throw error;
  }
}

async function deleteEvent(id) {
  try {
    const state = await remove(id);
    return state;
  } catch (error) {
    throw error;
  }
}

async function updateEvent(event, eventId) {
  try {
    const eventArray = Object.values(event);
    const updatedEvent = update(eventArray, eventId);

    return updatedEvent;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getEvent,
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
};
