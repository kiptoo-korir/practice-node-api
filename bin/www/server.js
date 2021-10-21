const app = require("../app")();
const http = require("http");

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express Server Runing on port " + app.get("port"));
});
