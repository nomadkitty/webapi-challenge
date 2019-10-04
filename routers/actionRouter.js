const express = require("express");

// import database
const projectDb = require("../data/helpers/projectModel.js");
const actionDb = require("../data/helpers/actionModel.js");

// import middleware
const validateProjectId = require("../middleware/validateProjectID.js");

const router = express.Router();

module.exports = router;
