import HttpStatus from 'http-status-codes';
import * as DeviceService from '../services/device.service';

/**
 * Controller to get all devices available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllDevices = async (req, res, next) => {
  try {
    const data = await DeviceService.getAllDevices();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All devices fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single device
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getDevice = async (req, res, next) => {
  try {
    const data = await DeviceService.getDevice(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Device fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new device
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newDevice = async (req, res, next) => {
  try {
    const data = await DeviceService.newDevice(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Device created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a device
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateDevice = async (req, res, next) => {
  try {
    const data = await DeviceService.updateDevice(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Device updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a device
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteDevice = async (req, res, next) => {
  try {
    await DeviceService.deleteDevice(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Device deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
