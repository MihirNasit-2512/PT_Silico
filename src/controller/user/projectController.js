import * as CommonService from '../../services/commonServices.js';
import * as UtilService from '../../services/utilServices.js';
import message from '../../helper/message.js';
import { STATUS } from '../../helper/constant.js';
import Project from '../../models/project.js';

export const create = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const params = req.body;
    const fields = ['title'];
    await UtilService.checkRequiredParams(fields, params);

    const filter = {
      title: params.title.trim(),
      status: { $nin: [STATUS.DELETED] },
    };
    const isProjectExists = await Project.findOne(filter);
    if (isProjectExists) {
      throw message.PROJECT_ALREADY_EXIST;
    }

    params.createdBy = loggedInUser._id;
    const isProject = await Project.create(params);

    const response = await CommonService.successResponse(isProject);

    return res.status(201).send(response);
  } catch (err) {
    return res.status(422).send(err);
  }
};

export const listProjects = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const filter = {
      createdBy: loggedInUser._id,
      status: STATUS.ACTIVE,
    };
    const isProjects = await Project.find(filter);
    const response = await CommonService.successResponse(isProjects);

    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    return res.status(422).send(err);
  }
};

export const updateProject = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const params = req.body;
    const fields = ['projectId'];
    const updatable = ['title', 'description', 'status'];
    await UtilService.checkRequiredParams(fields, params);
    let updObj = {};
    Object.keys(params).map((item) => {
      if (updatable.includes(item)) {
        updObj[item] = params[item];
      }
    });
    if (params?.title) {
      const isProjectExists = await Project.findOne({
        title: params.title,
        createdBy: { $nin: loggedInUser.id },
        status: STATUS.ACTIVE,
      });
      if (isProjectExists) {
        throw message.PROJECT_ALREADY_EXIST;
      }
    }
    const record = await Project.findOneAndUpdate(
      { _id: params.projectId, createdBy: loggedInUser.id },
      updObj,
      {
        new: true,
      }
    );
    if (!record) {
      throw message.PROJECT_NOT_FOUND;
    }
    const response = await CommonService.successResponse(record);

    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    return res.status(422).send(err);
  }
};
