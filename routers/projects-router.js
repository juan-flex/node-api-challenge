const express = require('express');
const Projects = require('../data/helpers/projectModel');
const { validateProjectId, validateProject } = require('../middleware/middleware-model');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Projects could not be fetched'});
        })
    
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project);
})

router.get("/:id/actions", validateProjectId, (req, res) => {
    res.status(200).json(req.project.actions);
  });

router.post('/', validateProject, (req, res) => {
    const newProject = req.body;
    Projects.insert(newProject)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'New project could not be stored'})
        })
})

router.put('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    const updatedProject = req.body;
    Projects.update(id, updatedProject)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Project could not be updated'})
        })
})

router.delete('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    Projects.remove(id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Project could not be deleted'})
        })
})

module.exports = router;