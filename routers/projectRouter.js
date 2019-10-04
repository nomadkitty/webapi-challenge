const express = require("express");

// import database
const projectDb = require("../data/helpers/projectModel.js");
const actionDb = require("../data/helpers/actionModel.js");

// import middleware
const validateProjectId = require("../middleware/validateProjectID.js");
const validateProject = require("../middleware/validateProject.js");
const validateAction = require("../middleware/validateAction.js");

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

// post a project
router.post("/", validateProject, (req, res) => {
  const newProject = req.body;
  projectDb
    .insert(newProject)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the project to the database.",
      });
    });
});

// post action by project id
router.post("/:id/actions", validateProjectId, validateAction, (req, res) => {
  const id = req.params.id;
  const newAction = { ...req.body, project_id: id };

  actionDb
    .insert(newAction)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the action to the database.",
      });
    });
});

// delete a project
router.delete("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;
  projectDb
    .remove(id)
    .then(project => {
      res.status(200).json(id);
    })
    .catch(err => {
      res.status(500).json({ error: "Error removing project" });
    });
});

// update a project
router.put("/:id", validateProjectId, validateProject, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  projectDb
    .update(id, changes)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: "Error updating project." });
    });
});

module.exports = router;
