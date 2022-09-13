"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userAuth = exports.deviceAuth = exports.adminAuth = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
var userAuth = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var bearerToken, _yield$jwt$verify, _id, phone, domain;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            bearerToken = req.header('Authorization'); // console.log(`Berrar Token ${bearerToken}`)

            if (bearerToken) {
              _context.next = 4;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].BAD_REQUEST,
              message: 'Authorization token is required'
            };

          case 4:
            bearerToken = bearerToken.split(' ')[1];
            _context.next = 7;
            return _jsonwebtoken["default"].verify(bearerToken, process.env.TOKEN_KEY);

          case 7:
            _yield$jwt$verify = _context.sent;
            _id = _yield$jwt$verify._id;
            phone = _yield$jwt$verify.phone;
            domain = _yield$jwt$verify.domain;
            res.locals._id = _id;
            res.locals.domain = domain;
            res.locals.phone = phone;
            res.locals.token = bearerToken;
            next();
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 18]]);
  }));

  return function userAuth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */


exports.userAuth = userAuth;

var adminAuth = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var bearerToken, _yield$jwt$verify2, _id;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            bearerToken = req.header('Authorization');

            if (bearerToken) {
              _context2.next = 4;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].BAD_REQUEST,
              message: 'Authorization token is required'
            };

          case 4:
            bearerToken = bearerToken.split(' ')[1];
            _context2.next = 7;
            return _jsonwebtoken["default"].verify(bearerToken, process.env.TOKEN_KEY);

          case 7:
            _yield$jwt$verify2 = _context2.sent;
            _id = _yield$jwt$verify2._id;
            res.locals._id = _id;
            res.locals.token = bearerToken;
            next();
            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 14]]);
  }));

  return function adminAuth(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */


exports.adminAuth = adminAuth;

var deviceAuth = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var bearerToken, _yield$jwt$verify3, _id, domain;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            bearerToken = req.header('Authorization');

            if (bearerToken) {
              _context3.next = 4;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].BAD_REQUEST,
              message: 'Authorization token is required'
            };

          case 4:
            bearerToken = bearerToken.split(' ')[1];
            _context3.next = 7;
            return _jsonwebtoken["default"].verify(bearerToken, process.env.TOKEN_KEY);

          case 7:
            _yield$jwt$verify3 = _context3.sent;
            _id = _yield$jwt$verify3._id;
            domain = _yield$jwt$verify3.domain;
            res.locals._id = _id;
            res.locals.domain = domain;
            res.locals.token = bearerToken;
            next();
            _context3.next = 19;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 16]]);
  }));

  return function deviceAuth(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deviceAuth = deviceAuth;