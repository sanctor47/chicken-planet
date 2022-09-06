import HttpStatus from 'http-status-codes';
import * as ChamberService from '../services/chamber.service';

/**
 * Controller to get all chambers available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllChambers = async (req, res, next) => {
  try {
    const data = await ChamberService.getAllChambers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All chambers fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single chamber
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getChamber = async (req, res, next) => {
  try {
    const data = await ChamberService.getChamber(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Chamber fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new chamber
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newChamber = async (req, res, next) => {
  try {
    // console.log(res.locals._id)
    const data = await ChamberService.newChamber(
      req.body,
      res.locals._id,
      res.locals.domain
    );
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Chamber created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a chamber
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateChamber = async (req, res, next) => {
  try {
    const data = await ChamberService.updateChamber(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Chamber updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a chamber
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteChamber = async (req, res, next) => {
  try {
    await ChamberService.deleteChamber(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Chamber deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
