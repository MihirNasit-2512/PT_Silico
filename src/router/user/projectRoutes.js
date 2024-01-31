/* eslint-disable max-len */
import express from 'express';
import { clientAuthenticate } from '../../middleware/authMiddleware.js';
import * as ProjectController from '../../controller/user/projectController.js';

const router = express.Router();

router.post('/create', clientAuthenticate, (req, res) => {
  ProjectController.create(req, res);
});

router.get('/list', clientAuthenticate, (req, res) => {
  ProjectController.listProjects(req, res);
});

router.post('/update', clientAuthenticate, (req, res) => {
  ProjectController.updateProject(req, res);
});

export default router;
