import HttpStatus from 'http-status-codes';
import * as BucketService from '../services/bucket.service';

/**
 * Controller to get all buckets available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllBuckets = async (req, res, next) => {
  try {
    const data = await BucketService.getAllBuckets();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All buckets fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single bucket
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getBucket = async (req, res, next) => {
  try {
    const data = await BucketService.getBucket(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Bucket fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new bucket
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newBucket = async (req, res, next) => {
  try {
    const data = await BucketService.newBucket(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Bucket created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a bucket
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateBucket = async (req, res, next) => {
  try {
    const data = await BucketService.updateBucket(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Bucket updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a bucket
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteBucket = async (req, res, next) => {
  try {
    await BucketService.deleteBucket(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Bucket deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
