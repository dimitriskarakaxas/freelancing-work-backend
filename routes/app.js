const express = require("express");
const { body } = require("express-validator");

const incomingDataValidaion = [
  body("siteName").trim().isLength({ min: 1 }),
  body("owner").trim().isLength({ min: 1 }),
  body("longitude").isFloat(),
  body("latitude").isFloat(),
  body("utc").isInt(),
  body("dst").isBoolean(),
  body("disabled").isBoolean(),
];

const applicationController = require("../controllers/app");

const router = express.Router();

// Retrieve all Sites
router.get("/sites", applicationController.getSites);

// Retrieve a single Site with siteId
router.get("/sites/:siteId", applicationController.getSiteDetails);

// Create a new Site entry
router.post("/sites", incomingDataValidaion, applicationController.createSite);

// Update Site's details
router.put(
  "/sites/:siteId",
  incomingDataValidaion,
  applicationController.updateSite
);

router.delete("/sites/:siteId", applicationController.deleteSite);

module.exports = router;
