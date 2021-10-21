const { Pool } = require("pg");
const { dbhost, dbpass, dbuser, dbname } = require("../utils/config");

const pool = new Pool({
  user: dbuser,
  password: dbpass,
  host: dbhost,
  database: dbname,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

async function query(text, params) {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("executed query", { text, duration, rows: result.rowCount });
  return result;
}

async function getClient() {
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;

  // set a timeout of 5 seconds, after which we will log this client's last query
  const timeout = setTimeout(() => {
    console.error("A client has been checked out for more than 5 seconds!");
    console.error(
      `The last executed query on this client was: ${client.lastQuery}`
    );
  }, 5000);

  // monkey patch the query method to keep track of the last query executed
  client.query = (...args) => {
    client.lastQuery = args;
    return query.apply(client, args);
  };

  client.release = () => {
    clearTimeout(timeout);

    // set the methods back to their old un-monkey-patched version
    client.query = query;
    client.release = release;
    return release.apply(client);
  };

  return client;
}

module.exports = {
  query,
  getClient,
};
