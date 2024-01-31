import * as CommonService from '../../services/commonServices.js';
import * as UtilService from '../../services/utilServices.js';
import message from '../../helper/message.js';
import { STATUS } from '../../helper/constant.js';
import Ticket from '../../models/ticket.js';
import Project from '../../models/project.js';
import Stat from '../../models/stat.js';
import User from '../../models/user.js';

export const create = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const params = req.body;
    const fields = ['title', 'assignee', 'dueDate', 'projectId', 'statId'];
    await UtilService.checkRequiredParams(fields, params);
    const isProject = await Project.findOne({
      _id: params.projectId,
      status: STATUS.ACTIVE,
    });
    if (!isProject) {
      throw message.PROJECT_NOT_FOUND;
    }
    const isStat = await Stat.findOne({
      _id: params.statId,
      status: STATUS.ACTIVE,
    });
    if (!isStat) {
      throw message.STAT_NOT_FOUND;
    }
    const isAssignee = await User.findOne({
      _id: params.assignee,
      status: STATUS.ACTIVE,
    });
    if (!isAssignee) {
      throw message.ASSIGNEE_NOT_FOUND;
    }
    const filter = {
      title: params.title.trim(),
      projectId: isProject.id,
    };
    const isTicketExists = await Ticket.findOne(filter);
    if (isTicketExists) {
      throw message.TICKET_ALREADY_EXIST;
    }

    params.reporter = loggedInUser.id;
    params.assignee = isAssignee.id;
    params.status = isStat.id;
    const isTicket = await Ticket.create(params);

    const response = await CommonService.successResponse(isTicket);

    return res.status(201).send(response);
  } catch (err) {
    return res.status(422).send(err);
  }
};

export const listTickets = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const params = req.body;
    const filter = {};
    if (params?.statId) {
      const isStat = await Stat.findOne({
        _id: params.statId,
        status: STATUS.ACTIVE,
      });
      if (!isStat) {
        throw message.STAT_NOT_FOUND;
      }
      filter['status'] = params.statId;
    }
    const isTickets = await Ticket.find(filter);
    const response = await CommonService.successResponse(isTickets);

    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    return res.status(422).send(err);
  }
};
