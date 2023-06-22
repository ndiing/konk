const express = require("express");
const http = require("http");
const https = require("https");
const config = require("./lib/config");
const { init, fallback, error } = require("./lib/middleware");

require("./dev");
require("./lib");

const app = express();

app.use(init());
app.use("/api", require("./api"));
app.use(fallback());
app.use(error());

const httpServer = http.createServer(app);
const httpsServer = https.createServer(config.server.https.options, app);
httpServer.listen(config.server.http.port, config.server.hostname, () => console.log(httpServer.address()));
httpsServer.listen(config.server.https.port, config.server.hostname, () => console.log(httpsServer.address()));

