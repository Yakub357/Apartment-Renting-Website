const express = require("express");
const morgan = require("morgan");

// ** Importing ROUTES
const apartmentRouter = require("./routes/apartmentRoutes");

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
app.use("/api/v1/apartments", apartmentRouter);

module.exports = app;
