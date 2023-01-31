const express = require("express");
const morgan = require("morgan");

// ** Importing ROUTES
// TODO create the routes for the website

const app = express();

// ** 1. MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// serving a static files
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("hello from middleware");
  next();
});

// ** MOUNTING the routers
// TODO implement the routing

module.exports = app;
