// imports
const express = require('express'); // importing a CommonJS module
const cors = require('cors');

// router imports
const projectRouter = require('../routers/projects-router')
const actionRouter = require('../routers/actions-router')

// server
const server = express();

server.use(express.json()); // built in middleware
server.use(cors());

server.use('/api/projects', logger, projectRouter)
server.use('/api/actions', logger, actionRouter)

// logging middleware
function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
        'Origin'
      )}`
    );
    next();
  }

server.get('/', (req, res) => {
  res.send('Server is running');
});


module.exports = server;