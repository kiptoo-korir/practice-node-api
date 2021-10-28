const db = require("../../db");

async function getById(id) {
  try {
    const query = "SELECT * FROM events WHERE id = $1";
    const { rows: event } = await db.query(query, [id]);
    return event;
  } catch (error) {
    throw error;
  }
}

async function getAll() {
  try {
    const query = "SELECT * FROM events";
    const { rows: events } = await db.query(query);
    return events;
  } catch (error) {
    throw error;
  }
}

async function create(event) {
  try {
    const query =
      "INSERT INTO events(event_name, event_date, event_time, location, remarks) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const { rows: newEvent } = await db.query(query, event);
    return newEvent;
  } catch (error) {
    throw error;
  }
}

async function remove(eventId) {
  try {
    const query = "DELETE FROM events WHERE id = $1";
    await db.query(query, [eventId]);
    return "removed";
  } catch (error) {
    throw error;
  }
}

async function update(event, eventId) {
  try {
    const query =
      "UPDATE events SET event_name = $1, event_date = $2, event_time = $3, location = $4, remarks = $5 WHERE id = $6 RETURNING *";
    const { rows: updatedEvent } = await db.query(query, [...event, eventId]);
    return updatedEvent;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
