import HttpStatus from 'http-status-codes';
import * as DomainService from '../services/domain.service';

/**
 * Controller to get all domains available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllDomains = async (req, res, next) => {
  try {
    const data = await DomainService.getAllDomains();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All domains fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single domain
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getDomain = async (req, res, next) => {
  try {
    const data = await DomainService.getDomain(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Domain fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};



/**
 * Controller to update a domain
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateDomain = async (req, res, next) => {
  try {
    const data = await DomainService.updateDomain(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Domain updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a domain
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteDomain = async (req, res, next) => {
  try {
    await DomainService.deleteDomain(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Domain deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
