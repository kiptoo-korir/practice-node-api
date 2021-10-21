const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  dbuser: process.env.DBUSER,
  dbpass: process.env.DBPASS,
  dbhost: process.env.DBHOST,
  dbname: process.env.DBNAME,
  port: process.env.PORT,
};
