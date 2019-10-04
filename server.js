const express = require("express");
const helmet = require("helmet");
const server = express();

// import router
const projectRouter = require("./routers/projectRouter.js");

// set up global middleware
server.use(express.json());
server.use(helmet());
server.use(logger);

// set up router
server.use("/api/projects", projectRouter);

// Initial get request
server.get("/", (req, res) => {
  res.send(`<h1>Have fun at sprint!</h1>`);
});

// logger middleware
function logger(req, res, next) {
  console.log(`${req.method} to ${req.url} and [${new Date().toISOString()}]`);
  next();
}

module.exports = server;
