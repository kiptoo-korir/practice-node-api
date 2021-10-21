const { getById, getAll, create, remove } = require("./eventsDAL");

async function getEvent(id) {
  try {
    const event = await getById(id);
    return event;
  } catch (error) {
    throw error;
  } finally {
    return null;
  }
}

async function getEvents() {
  try {
    const events = await getAll();
    return events;
  } catch (error) {
    throw error;
  } finally {
    return null;
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
  } finally {
    return null;
  }
}

async function deleteEvent(id) {
  try {
    const state = remove(id);
    return state;
  } catch (error) {
    throw error;
  } finally {
    return null;
  }
}

module.exports = {
  getEvent,
  getEvents,
  createEvent,
  deleteEvent,
};
