import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    // console.log(`Berrar Token ${bearerToken}`)
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const { _id, phone, domain } = await jwt.verify(
      bearerToken,
      process.env.TOKEN_KEY
    );
    res.locals._id = _id;
    res.locals.domain = domain;
    res.locals.phone = phone;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const adminAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const { _id } = await jwt.verify(bearerToken, process.env.TOKEN_KEY);
    res.locals._id = _id;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};


/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
 export const deviceAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const { _id, domain } = await jwt.verify(bearerToken, process.env.TOKEN_KEY);
    res.locals._id = _id;
    res.locals.domain = domain;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};
