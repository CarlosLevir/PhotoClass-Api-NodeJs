const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const SubjectController = require('./controllers/SubjectController');
const FileController = require('./controllers/FileController');

const routes = express.Router();

routes.post('/subjects', SubjectController.store);
routes.get('/subjects/:id', SubjectController.show);

routes.post('/subjects/:id/files', multer(multerConfig).single('file'), FileController.store);

module.exports = routes;
