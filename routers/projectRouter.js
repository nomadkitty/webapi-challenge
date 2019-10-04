const express = require("express");

// import database
const projectDb = require("../data/helpers/projectModel.js");
const actionDb = require("../data/helpers/actionModel.js");

// import middleware
const validateProjectId = require("../middleware/validateProjectID.js");

const router = express.Router();

// get all projects
router.get("/", (req, res) => {
  projectDb
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ error: "The projects could not be retrieved." });
    });
});

// get project by id
router.get("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;
  projectDb
    .get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving project" });
    });
});

// get project actions by project id
router.get("/:id/actions", validateProjectId, (req, res) => {
  const projectId = req.params.id;
  projectDb
    .getProjectActions(projectId)
    .then(actions => {
      if (!actions.length) {
        res
          .status(404)
          .json({ message: "There's no actions from this project." });
      } else {
        res.status(200).json(actions);
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving posts" });
    });
});

// post

module.exports = router;
