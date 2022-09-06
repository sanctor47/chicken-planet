import HttpStatus from 'http-status-codes';
import * as SensorService from '../services/sensor.service';

/**
 * Controller to get all sensors available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllSensors = async (req, res, next) => {
  try {
    const data = await SensorService.getAllSensors();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All sensors fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single sensor
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getSensor = async (req, res, next) => {
  try {
    const data = await SensorService.getSensor(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Sensor fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new sensor
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newSensor = async (req, res, next) => {
  try {
    const data = await SensorService.newSensor(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Sensor created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a sensor
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateSensor = async (req, res, next) => {
  try {
    const data = await SensorService.updateSensor(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Sensor updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a sensor
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteSensor = async (req, res, next) => {
  try {
    await SensorService.deleteSensor(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Sensor deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
