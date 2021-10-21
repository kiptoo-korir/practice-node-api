const express = require("express");
const { port } = require("../utils/config");
const { router: eventRouter } = require("../modules/events");

const hostPort = port || 3000;

module.exports = () => {
  const app = express();
  app.set("port", hostPort);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/events", eventRouter);
  return app;
};
