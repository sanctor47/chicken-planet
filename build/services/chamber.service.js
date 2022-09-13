"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateChamber = exports.newChamber = exports.getChamber = exports.getAllChambers = exports.deleteChamber = exports.addCellToChamber = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chamber = _interopRequireDefault(require("../models/chamber.model"));

var DomainServices = _interopRequireWildcard(require("./domain.service"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//get all chambers
var getAllChambers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _chamber["default"].find().populate('addedBy');

          case 2:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getAllChambers() {
    return _ref.apply(this, arguments);
  };
}(); //create new chamber


exports.getAllChambers = getAllChambers;

var newChamber = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body, addedBy, domain) {
    var TargetDomain, ChamberData, data, UpdatedDomain;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return DomainServices.getDomain(domain);

          case 3:
            TargetDomain = _context2.sent;
            console.log("domain: ".concat(TargetDomain));

            if (TargetDomain) {
              _context2.next = 7;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].NOT_FOUND,
              message: 'Domain not found',
              data: 'DOMAIN_NOT_FOUND'
            };

          case 7:
            ChamberData = {
              name: body.name,
              area: body.area || 'TBD',
              addedBy: addedBy,
              domain: domain
            };
            _context2.next = 10;
            return _chamber["default"].create(ChamberData);

          case 10:
            data = _context2.sent;
            _context2.next = 13;
            return DomainServices.addChamberToDomain(domain, data._id);

          case 13:
            UpdatedDomain = _context2.sent;

            if (UpdatedDomain) {
              _context2.next = 16;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].NOT_FOUND,
              message: 'Domain not found',
              data: 'DOMAIN_NOT_FOUND'
            };

          case 16:
            return _context2.abrupt("return", data);

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
            throw _context2.t0;

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 19]]);
  }));

  return function newChamber(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}(); //update single chamber


exports.newChamber = newChamber;

var updateChamber = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _chamber["default"].findByIdAndUpdate({
              _id: _id
            }, body, {
              "new": true
            });

          case 2:
            data = _context3.sent;
            return _context3.abrupt("return", data);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function updateChamber(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}(); //delete single chamber


exports.updateChamber = updateChamber;

var deleteChamber = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _chamber["default"].findByIdAndDelete(id);

          case 2:
            return _context4.abrupt("return", '');

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function deleteChamber(_x6) {
    return _ref4.apply(this, arguments);
  };
}(); //get single chamber


exports.deleteChamber = deleteChamber;

var getChamber = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _chamber["default"].findById(id);

          case 2:
            data = _context5.sent;
            return _context5.abrupt("return", data);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getChamber(_x7) {
    return _ref5.apply(this, arguments);
  };
}(); //get single domain


exports.getChamber = getChamber;

var addCellToChamber = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id, cell) {
    var data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return Domain.findByIdAndUpdate(id, {
              $push: {
                cells: cell
              }
            }, {
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

  return function addCellToChamber(_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();

exports.addCellToChamber = addCellToChamber;