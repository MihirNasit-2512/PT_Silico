/* eslint-disable max-len */
import express from 'express';
import { clientAuthenticate } from '../../middleware/authMiddleware.js';
import * as StatController from '../../controller/user/statController.js';

const router = express.Router();

router.post('/create', clientAuthenticate, (req, res) => {
  StatController.create(req, res);
});

router.get('/list', clientAuthenticate, (req, res) => {
  StatController.listStats(req, res);
});

router.post('/update', clientAuthenticate, (req, res) => {
  StatController.updateStat(req, res);
});

router.get('/delete/:statId', clientAuthenticate, (req, res) => {
  StatController.deleteStat(req, res);
});

router.get('/syncDefaultStats', clientAuthenticate, (req, res) => {
  StatController.syncDefault(req, res);
});
export default router;
