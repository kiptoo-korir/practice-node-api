const db = require("../../db");

async function getById(id) {
  try {
    const query = "SELECT * FROM events WHERE id = $1";
    const { rows: event } = await db.query(query, [id]);
    return event;
  } catch (error) {
    throw error;
  } finally {
    return null;
  }
}

async function getAll() {
  try {
    const query = "SELECT * FROM events";
    const { rows: events } = await db.query(query);
    return events;
  } catch (error) {
    throw error;
  } finally {
    return null;
  }
}

async function create(event) {
  try {
    const query =
      "INSERT INTO events(event_name, event_date, event_time, location, remarks) VALUES $1, $2, $3, $4, $5 RETURNING *";
    const { rows: newEvent } = await db.query(query, event);
    return newEvent;
  } catch (error) {
    throw error;
  } finally {
    return null;
  }
}

async function remove(eventId) {
  try {
    const query = "DROP * FROM events WHERE id = $1";
    await db.query(query, eventId);
    return true;
  } catch (error) {
    throw error;
  } finally {
    return null;
  }
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
};
