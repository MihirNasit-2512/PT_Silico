/* eslint-disable max-len */
import express from 'express';
import { clientAuthenticate } from '../../middleware/authMiddleware.js';
import * as TicketController from '../../controller/user/ticketController.js';

const router = express.Router();

router.post('/create', clientAuthenticate, (req, res) => {
  TicketController.create(req, res);
});

router.post('/list', clientAuthenticate, (req, res) => {
  TicketController.listTickets(req, res);
});

export default router;
