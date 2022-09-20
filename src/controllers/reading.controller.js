import HttpStatus from 'http-status-codes';
import * as ReadingService from '../services/reading.service';

/**
 * Controller to get all readings available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllReadings = async (req, res, next) => {
  try {
    const data = await ReadingService.getAllReadings();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All readings fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single reading
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getReading = async (req, res, next) => {
  try {
    const data = await ReadingService.getReading(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Reading fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new reading
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newReading = async (req, res, next) => {
  try {
    const data = await ReadingService.TempNewReading(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Reading created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a reading
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateReading = async (req, res, next) => {
  try {
    const data = await ReadingService.updateReading(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Reading updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a reading
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteReading = async (req, res, next) => {
  try {
    await ReadingService.deleteReading(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Reading deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
