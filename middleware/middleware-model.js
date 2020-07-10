const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel");

function validateProjectId(req, res, next) {
  const { id } = req.params;
  Projects.get(id)
    .then((data) => {
      if(data === null){
          res.status(400).json({ message: 'invalid project id'});
      } else{
          req.project = data;
          next();
      }
    })
    .catch(() => {
      res.status(500).json({ message: "internal server error" });
    });
}

function validateProject(req, res, next) {
  const  project  = req.body;
  if (!project) {
    res.status(400).json({ message: "No project provided" });
  } else if (!project.name || !project.description) {
    res.status(400).json({ message: "Name and description required" });
  } else {
    next();
  }
}

function validateActionId(req, res, next) {
  const { id } = req.params;
  Actions.get(id)
    .then((data) => {
        if(data === undefined){
            res.status(400).json({ message: 'invalid action id'});
        } else {
            req.action = data;
            next();
        }
    })
    .catch(() => {
      res.status(500).json({ message: "internal server error" });
    });
}

function validateAction(req, res, next) {
  const action = req.body;
  if (!action) {
    res.status(400).json({ message: "No action provided" });
  } else if (!action.description || !action.project_id || !action.notes) {
    res.status(400).json({ message: "Description, notes, and project id required" });
  } else {
    next();
  }
}

module.exports = {
  validateAction,
  validateActionId,
  validateProject,
  validateProjectId,
};