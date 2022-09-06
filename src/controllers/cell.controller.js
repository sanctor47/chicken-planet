import HttpStatus from 'http-status-codes';
import * as CellService from '../services/cell.service';

/**
 * Controller to get all cells available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllCells = async (req, res, next) => {
  try {
    const data = await CellService.getAllCells();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All cells fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single cell
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getCell = async (req, res, next) => {
  try {
    const data = await CellService.getCell(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Cell fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new cell
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newCell = async (req, res, next) => {
  try {
    const data = await CellService.newCell(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Cell created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a cell
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateCell = async (req, res, next) => {
  try {
    const data = await CellService.updateCell(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Cell updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a cell
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteCell = async (req, res, next) => {
  try {
    await CellService.deleteCell(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Cell deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
