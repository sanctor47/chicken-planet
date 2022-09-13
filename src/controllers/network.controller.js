import HttpStatus from 'http-status-codes';
import * as NetworkService from '../services/network.service';

/**
 * Controller to get all networks available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllNetworks = async (req, res, next) => {
  try {
    const data = await NetworkService.getAllNetworks();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All networks fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single network
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getNetwork = async (req, res, next) => {
  try {
    const data = await NetworkService.getNetwork(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Network fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new network
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newNetwork = async (req, res, next) => {
  try {
    const data = await NetworkService.newNetwork(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Network created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a network
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateNetwork = async (req, res, next) => {
  try {
    const data = await NetworkService.updateNetwork(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Network updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a network
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteNetwork = async (req, res, next) => {
  try {
    await NetworkService.deleteNetwork(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Network deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
