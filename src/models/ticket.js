import { model, Schema } from 'mongoose';
import { STATUS } from '../helper/constant.js';

const ticketSchema = new Schema(
  {
    title: String,
    description: String,
    projectId: String,
    reporter: String,
    assignee: String,
    dueDate: Date,
    status: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Ticket = model('Ticket', ticketSchema);

export default Ticket;
