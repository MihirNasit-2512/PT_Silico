import express from 'express';
const router = express.Router();
import AuthRoutes from './authRoutes.js';
import ProjectRoutes from './projectRoutes.js';
import StatRoutes from './statRoutes.js';
import TicketRoutes from './ticketRoutes.js';

router.use('/auth', AuthRoutes);
router.use('/project', ProjectRoutes);
router.use('/stat', StatRoutes);
router.use('/ticket', TicketRoutes);

export default router;
