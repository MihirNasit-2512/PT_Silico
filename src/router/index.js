import express from 'express';
const router = express.Router();
import UserRoutes from './user/index.js';

router.use('/user', UserRoutes);

export default router;
