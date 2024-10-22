const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const authMiddleware = require('./middlewares/auth');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const SubjectController = require('./controllers/SubjectController');
const FileController = require('./controllers/FileController');

const routes = express.Router();

routes.post('/signup', UserController.register);

routes.post('/signin', (...args) => AuthController.authenticate(...args));

routes.use(authMiddleware);

routes.post('/subject', SubjectController.store);

routes.get('/subject/:id', SubjectController.show);

routes.post('/subject/:id/files', multer(multerConfig).single('file'), FileController.store);

module.exports = routes;
