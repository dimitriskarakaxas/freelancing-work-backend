const express = require("express");

const applicationController = require("../controllers/app");

const router = express.Router();

// Retrieve all Sites
router.get("/sites", applicationController.getSites);

// Retrieve a single Site with siteId
router.get("/sites/:siteId", applicationController.getSiteDetails);

// Create a new Site entry
router.post("/sites", applicationController.createSite);

// Update Site's details
router.put("/sites/:siteId", applicationController.updateSite);

module.exports = router;
