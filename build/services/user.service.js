"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verfiyOTP = exports.updateUser = exports.updateProfile = exports.newUser = exports.login = exports.getUser = exports.getAllUsers = exports.deleteUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var DomainService = _interopRequireWildcard(require("../services/domain.service"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//get all users
var getAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user["default"].find();

          case 3:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            throw _context.t0;

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getAllUsers() {
    return _ref.apply(this, arguments);
  };
}(); //create new user


exports.getAllUsers = getAllUsers;

var newUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var phone, duplicateUser, _newUser;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            phone = body.phone;

            if (phone) {
              _context2.next = 4;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].PARTIAL_CONTENT,
              message: 'Please enter a phone number.'
            };

          case 4:
            duplicateUser = _user["default"].findOne({
              phone: phone
            });

            if (!duplicateUser) {
              _context2.next = 7;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].CONFLICT,
              message: 'Phone number alredy exists.'
            };

          case 7:
            _newUser = _user["default"].create({
              phone: phone,
              OTP: '1234'
            });
            return _context2.abrupt("return", _newUser);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            throw _context2.t0;

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function newUser(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.newUser = newUser;

var verfiyOTP = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var OTP, foundUser, domainData, domain, updatedUser, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            OTP = body.OTP;

            if (OTP) {
              _context3.next = 4;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].BAD_REQUEST,
              message: 'OTP not found'
            };

          case 4:
            _context3.next = 6;
            return _user["default"].findOne({
              OTP: OTP
            });

          case 6:
            foundUser = _context3.sent;

            if (foundUser) {
              _context3.next = 9;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].NOT_FOUND,
              message: ' invalid OTP'
            };

          case 9:
            domainData = {
              name: "".concat(foundUser.phone, " - Domain"),
              owner: foundUser._id
            };
            _context3.next = 12;
            return DomainService.newDomain(domainData);

          case 12:
            domain = _context3.sent;
            _context3.next = 15;
            return _user["default"].findByIdAndUpdate(foundUser._id, {
              domain: domain._id
            }, {
              "new": true
            });

          case 15:
            updatedUser = _context3.sent;
            token = _jsonwebtoken["default"].sign({
              _id: foundUser._id,
              domain: domain._id
            }, process.env.TOKEN_KEY, {
              expiresIn: '100h'
            });
            return _context3.abrupt("return", {
              userToken: token
            });

          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            throw _context3.t0;

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 20]]);
  }));

  return function verfiyOTP(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.verfiyOTP = verfiyOTP;

var updateProfile = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(body, id) {
    var firstName, lastName, email, data, updatedUser, completedProfileUser;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            firstName = body.firstName, lastName = body.lastName, email = body.email;
            data = {
              firstName: firstName ? firstName : null,
              lastName: lastName ? lastName : null,
              email: email ? email : null
            };
            _context4.next = 5;
            return _user["default"].findByIdAndUpdate(id, data, {
              "new": true
            });

          case 5:
            updatedUser = _context4.sent;

            if (!(updatedUser.firstName && updatedUser.lastName && updatedUser.email)) {
              _context4.next = 11;
              break;
            }

            _context4.next = 9;
            return _user["default"].findByIdAndUpdate(id, data, {
              "new": true
            });

          case 9:
            completedProfileUser = _context4.sent;
            return _context4.abrupt("return", completedProfileUser);

          case 11:
            return _context4.abrupt("return", updatedUser);

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            throw _context4.t0;

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 14]]);
  }));

  return function updateProfile(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateProfile = updateProfile;

var login = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(body) {
    var phone, TargetUser, token;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            phone = body.phone;

            if (phone) {
              _context5.next = 4;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].BAD_REQUEST,
              message: 'Phone number is required'
            };

          case 4:
            TargetUser = _user["default"].findOne({
              phone: phone
            });

            if (TargetUser) {
              _context5.next = 8;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].NOT_FOUND,
              message: 'User does not exist'
            };

          case 8:
            token = _jsonwebtoken["default"].sign({
              _id: TargetUser._id,
              domain: TargetUser.domain
            }, process.env.TOKEN_KEY, {
              expiresIn: '100h'
            });
            return _context5.abrupt("return", {
              userToken: token
            });

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            throw _context5.t0;

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 12]]);
  }));

  return function login(_x5) {
    return _ref5.apply(this, arguments);
  };
}(); //Signup New User
// export const signup = async (body) => {
//   try {
//     const { firstName, lastName, phone, password } = body;
//     const UserByPhone = await User.findOne({ phone: phone });
//     if (UserByPhone) {
//       throw {
//         code: '403',
//         message: 'Phone Number Alredy Regestered',
//         data: 'PHONE_ALREDY_REGESTERED'
//       };
//     }
//     const encryptedPassword = await bcrypt.hash(password, 10);
//     const userData = {
//       firstName,
//       lastName,
//       phone,
//       password: encryptedPassword
//     };
//     const data = await User.create(userData);
//     const domainData = {
//       name: `${firstName} ${lastName} - Domain`,
//       owner: data._id
//     };
//     const domain = await DomainService.newDomain(domainData);
//     const updatedUser = await User.findByIdAndUpdate(
//       data._id,
//       { domain: domain._id },
//       { new: true }
//     );
//     return updateUser;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
//Login New User
// export const login = async (body) => {
//   const { phone, password } = body;
//   try {
//     const UserByphone = await User.findOne({ phone: phone });
//     if (!UserByphone) {
//       throw {
//         code: '404',
//         message: 'User not found',
//         data: 'USER_NOT_FOUND'
//       };
//     }
//     if (!(await bcrypt.compare(password, UserByphone.password))) {
//       throw {
//         code: '401',
//         message: 'User not found',
//         data: 'USER_NOT_FOUND'
//       };
//     }
// const token = jwt.sign(
//   { _id: UserByphone._id, phone, domain: UserByphone.domain },
//   process.env.TOKEN_KEY,
//   {
//     expiresIn: '2h'
//   }
// );
//     return token;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
//update single user


exports.login = login;

var updateUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _user["default"].findByIdAndUpdate({
              _id: _id
            }, body, {
              "new": true
            });

          case 2:
            data = _context6.sent;
            return _context6.abrupt("return", data);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function updateUser(_x6, _x7) {
    return _ref6.apply(this, arguments);
  };
}(); //delete single user


exports.updateUser = updateUser;

var deleteUser = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(id) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _user["default"].findByIdAndDelete(id);

          case 2:
            return _context7.abrupt("return", '');

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function deleteUser(_x8) {
    return _ref7.apply(this, arguments);
  };
}(); //get single user


exports.deleteUser = deleteUser;

var getUser = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(id) {
    var data;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _user["default"].findById(id);

          case 2:
            data = _context8.sent;
            return _context8.abrupt("return", data);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getUser(_x9) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getUser = getUser;