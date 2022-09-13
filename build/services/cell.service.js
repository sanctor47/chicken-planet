"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCell = exports.newCell = exports.getCell = exports.getAllCells = exports.deleteCell = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cell = _interopRequireDefault(require("../models/cell.model"));

var ChamberServices = _interopRequireWildcard(require("./chamber.service"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//get all cells
var getAllCells = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _cell["default"].find();

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

  return function getAllCells() {
    return _ref.apply(this, arguments);
  };
}(); //new Cell


exports.getAllCells = getAllCells;

var newCell = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body, addedBy, chamber) {
    var TargetChamber, CellData, data, UpdatedChamber;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("body: ".concat(body));
            console.log("addedBy: ".concat(addedBy));
            console.log("chamber: ".concat(chamber));
            _context2.prev = 3;
            _context2.next = 6;
            return ChamberServices.getChamber(chamber);

          case 6:
            TargetChamber = _context2.sent;
            console.log("chamber: ".concat(TargetChamber));

            if (TargetChamber) {
              _context2.next = 10;
              break;
            }

            throw {
              code: HttpStatus.NOT_FOUND,
              message: 'Chamber not found',
              data: 'Chamber_NOT_FOUND'
            };

          case 10:
            CellData = {
              name: body.name,
              area: body.area || 'TBD',
              addedBy: addedBy,
              chamber: chamber
            };
            _context2.next = 13;
            return _cell["default"].create(CellData);

          case 13:
            data = _context2.sent;
            _context2.next = 16;
            return ChamberServices.addCellToChamber(chamber, data._id);

          case 16:
            UpdatedChamber = _context2.sent;

            if (UpdatedChamber) {
              _context2.next = 19;
              break;
            }

            throw {
              code: HttpStatus.NOT_FOUND,
              message: 'chamber not found',
              data: 'chamber_NOT_FOUND'
            };

          case 19:
            return _context2.abrupt("return", data);

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2["catch"](3);
            console.error(_context2.t0);
            throw _context2.t0;

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 22]]);
  }));

  return function newCell(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}(); //update single cell


exports.newCell = newCell;

var updateCell = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _cell["default"].findByIdAndUpdate({
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

  return function updateCell(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}(); //delete single cell


exports.updateCell = updateCell;

var deleteCell = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _cell["default"].findByIdAndDelete(id);

          case 2:
            return _context4.abrupt("return", '');

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function deleteCell(_x6) {
    return _ref4.apply(this, arguments);
  };
}(); //get single cell


exports.deleteCell = deleteCell;

var getCell = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _cell["default"].findById(id);

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

  return function getCell(_x7) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getCell = getCell;