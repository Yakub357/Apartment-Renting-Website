const express = require("express");
const apartmentController = require("../controllers/apartmentController");

const router = express.Router();

// Checking if the given id exists in the apartments database
router.param("id", apartmentController.checkID);

router
  .route("/")
  .get(apartmentController.getAllApartments)
  .post(apartmentController.checkBody, apartmentController.createApartment);
router.route("/:id").get(apartmentController.getApartment);

module.exports = router;
