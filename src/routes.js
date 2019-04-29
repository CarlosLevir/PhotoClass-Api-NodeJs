const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const SubjectController = require('./controllers/SubjectController');
const FileController = require('./controllers/FileController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

// User routes
routes.post('/user', UserController.store);
routes.get('/user/:id', UserController.show);

// Subject routes
routes.post('/subject/:userId', SubjectController.store);
routes.get('/subject/:id', SubjectController.show);

// Files routes
routes.post('/subject/:id/files', multer(multerConfig).single('file'), FileController.store);

module.exports = routes;
