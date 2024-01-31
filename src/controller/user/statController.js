import * as CommonService from '../../services/commonServices.js';
import * as UtilService from '../../services/utilServices.js';
import message from '../../helper/message.js';
import { DEFAULT_TICKET_STATUS, STATUS } from '../../helper/constant.js';
import Stat from '../../models/stat.js';

export const create = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const params = req.body;
    const fields = ['name'];
    await UtilService.checkRequiredParams(fields, params);

    const filter = {
      name: params.name.trim(),
      status: { $nin: [STATUS.DELETED] },
    };
    const isStatExists = await Stat.findOne(filter);
    if (isStatExists) {
      throw message.STAT_ALREADY_EXIST;
    }

    params.createdBy = loggedInUser._id;
    const isStat = await Stat.create(params);

    const response = await CommonService.successResponse(isStat);

    return res.status(201).send(response);
  } catch (err) {
    return res.status(422).send(err);
  }
};

export const listStats = async (req, res) => {
  try {
    const filter = {
      status: STATUS.ACTIVE,
    };
    const isStats = await Stat.find(filter);
    const response = await CommonService.successResponse(isStats);

    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    return res.status(422).send(err);
  }
};

export const updateStat = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const params = req.body;
    const fields = ['statId'];
    const updatable = ['name', 'description', 'status'];
    await UtilService.checkRequiredParams(fields, params);
    if (params?.name) {
      const isStatExists = await Stat.findOne({
        _id: { $nin: params.statId },
        name: params.name,
        status: STATUS.ACTIVE,
      });
      if (isStatExists) {
        throw message.STAT_ALREADY_EXIST;
      }
    }
    let updObj = {};
    Object.keys(params).map((item) => {
      if (updatable.includes(item)) {
        updObj[item] = params[item];
      }
    });
    const record = await Stat.findOneAndUpdate(
      { _id: params.statId, createdBy: loggedInUser.id },
      updObj,
      {
        new: true,
      }
    );
    if (!record) {
      throw message.STAT_NOT_FOUND;
    }
    const response = await CommonService.successResponse(record);

    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    return res.status(422).send(err);
  }
};

export const syncDefault = async (req, res) => {
  try {
    let statsToCreate = [];
    Object.keys(DEFAULT_TICKET_STATUS).map((item) => {
      statsToCreate.push({
        name: item,
      });
    });
    await Stat.updateMany({}, { $set: { status: STATUS.DELETED } });
    await Stat.create(statsToCreate);
    return res.status(200).send(message.STAT_SYNCED);
  } catch (err) {
    console.log(err);
    return res.status(422).send(err);
  }
};

export const deleteStat = async (req, res) => {
  try {
    const params = req.params;

    const fields = ['statId'];
    await UtilService.checkRequiredParams(fields, params);

    const filter = {
      _id: params.statId,
      status: { $nin: [STATUS.DELETED] },
    };
    let record = await Stat.findOne(filter);

    if (!record) {
      throw message.STAT_NOT_FOUND;
    }
    const dataToUpdate = {
      status: STATUS.DELETED,
    };
    record = await Stat.findByIdAndUpdate({ _id: record._id }, dataToUpdate, {
      new: true,
    });
    if (!record || record.status !== STATUS.DELETED) {
      throw message.STAT_NOT_DELETED;
    }

    return res.status(200).send(message.STAT_DELETED);
  } catch (err) {
    console.log(err);
    return res.status(422).send(err);
  }
};
