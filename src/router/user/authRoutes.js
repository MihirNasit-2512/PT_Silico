/* eslint-disable max-len */
import express from 'express';
import * as AuthController from '../../controller/user/authController.js';

const router = express.Router();

router.post('/signIn', (req, res) => {
  AuthController.signIn(req, res);
});

router.post('/signUp', (req, res) => {
  AuthController.signUp(req, res);
});

export default router;
