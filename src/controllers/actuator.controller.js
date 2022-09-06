import HttpStatus from 'http-status-codes';
import * as ActuatorService from '../services/actuator.service';

/**
 * Controller to get all actuators available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllActuators = async (req, res, next) => {
  try {
    const data = await ActuatorService.getAllActuators();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All actuators fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single actuator
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getActuator = async (req, res, next) => {
  try {
    const data = await ActuatorService.getActuator(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Actuator fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new actuator
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newActuator = async (req, res, next) => {
  try {
    const data = await ActuatorService.newActuator(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Actuator created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a actuator
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateActuator = async (req, res, next) => {
  try {
    const data = await ActuatorService.updateActuator(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Actuator updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a actuator
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteActuator = async (req, res, next) => {
  try {
    await ActuatorService.deleteActuator(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Actuator deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
