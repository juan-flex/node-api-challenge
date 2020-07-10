const express = require('express');
const Actions = require('../data/helpers/actionModel');
const { validateActionId ,validateAction } = require('../middleware/middleware-model');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .then(err => {
            console.log(err);
            res.status(500).json({ message: 'Actions could not be fetched'});
        })
})

router.get('/:id', validateActionId, (req, res) => {
  res.status(200).json(req.action);
})

router.post('/', validateAction, (req, res) => {
    const action = req.body;

    Actions.insert(action)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'New action could not be stored'});
        })
})

router.put('/:id', validateActionId, (req, res) => {
    const { id } = req.params;
    const updatedAction = req.body;

    Actions.update(id, updatedAction)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Action could not be updated'})
        })
})

router.delete('/:id', validateActionId, (req, res) => {
    const { id } = req.params;
    Actions.remove(id)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Action could not be deleted'})
        })
})

module.exports = router;