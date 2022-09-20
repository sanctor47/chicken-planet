import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers(req.params);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getUser = async (req, res, next) => {
  try {
    const data = await UserService.getUser(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res, next) => {
  try {
    const data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully, Sending OTP'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to Verify OTP
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const verfiyOTP = async (req, res, next) => {
  try {
    const data = await UserService.verfiyOTP(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.OK,
      data: data,
      message: 'OTP was verfide successfully'
    });
  } catch (error) {
    next(error);
  }
};

// /**
//  * Controller to login a user
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
// export const login = async (req, res, next) => {
//   try {
//     const data = await UserService.login(req.body);
//     res.status(HttpStatus.CREATED).json({
//       code: HttpStatus.CREATED,
//       data: data,
//       message: 'User login successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

/**
 * Controller to update a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateUserInfo = async (req, res, next) => {
  try {
    const data = await UserService.updateUserInfo(res.locals._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteUser = async (req, res, next) => {
  try {
    await UserService.deleteUser(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get current user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getCurrentUser = async (req, res, next) => {
  try {
    const data = await UserService.getUser(res.locals._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User data retrived successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get current user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const refreshToken = async (req, res, next) => {
  try {
    const reqRefreshToken = req.header('Authorization')
    const data = await UserService.RefreshToken(reqRefreshToken);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User data retrived successfully'
    });
  } catch (error) {
    next(error);
  }
};
