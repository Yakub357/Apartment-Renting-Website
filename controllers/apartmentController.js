const fs = require("fs");

// ** Downloading all the apartments from the dataBase into the memory synchronously

const apartments = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/apartments.json`)
);

// ** Middleware function for Checking ID
exports.checkID = (req, res, next, val) => {
  if (val * 1 > apartments.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  next();
};

// ** Middleware for checking Body
exports.checkBody = (req, res, next) => {
  if (!req.body.title || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing Title or Name",
    });
  }

  next();
};

// ** Callback functions & route handler
exports.getAllApartments = (req, res) => {
  res.status(200).json({
    status: "success",
    results: apartments.length,
    data: {
      apartments: apartments,
    },
  });
};

exports.getApartment = (req, res) => {
  const id = req.params.id * 1;

  const apartment = apartments.find((el) => el.id === id);
  res.status(200).json({
    status: "success",
    data: {
      apartment: apartment,
    },
  });
};

exports.createApartment = (req, res) => {
  const newId = apartments[apartments.length - 1].id + 1;
  const newApartment = Object.assign({ id: newId }, req.body);
  apartments.push(newApartment);
  console.log("New apartment added.");
  console.log("---- ---- ---- ----");

  fs.writeFile(
    `${__dirname}/../dev-data/data/apartments.json`,
    JSON.stringify(apartments),
    (err) => {
      if (err) {
        console.log(err);
        return res.status(404).json({
          status: "fail",
          message: "Could not write",
          errorMessage: err,
        });
      }

      res.status(201).json({
        status: "success",
        data: newApartment,
      });
    }
  );
};
