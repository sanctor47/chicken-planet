"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateReading = exports.newReading = exports.getReading = exports.getAllReadings = exports.deleteReading = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _reading = _interopRequireDefault(require("../models/reading.model"));

var _device = _interopRequireDefault(require("../models/device.model"));

var _sensor = _interopRequireDefault(require("../models/sensor.model"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var _sensor2 = require("./sensor.service");

//get all readings
var getAllReadings = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _reading["default"].find();

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

  return function getAllReadings() {
    return _ref.apply(this, arguments);
  };
}(); //create new reading


exports.getAllReadings = getAllReadings;

var newReading = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var device, temp, ammonia, humidity, sensor, TargetDevice, tempSensor, humSensor, ammoniaSensor, tempReading, humReading, ammoniaReading;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // const data = await Reading.create(body);
            // return data;
            console.log(body);
            _context2.prev = 1;
            device = body['node uuid'];
            temp = body['Temperature'];
            ammonia = body['Ammonia'];
            humidity = body['Humidity'];
            sensor = [temp, humidity, ammonia];
            _context2.next = 9;
            return _device["default"].findOne({
              UUID: device
            });

          case 9:
            TargetDevice = _context2.sent;

            if (TargetDevice) {
              _context2.next = 12;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].NOT_FOUND,
              message: 'Device not found.'
            };

          case 12:
            _context2.next = 14;
            return _sensor["default"].findOne({
              UUID: temp['sensor uuid']
            });

          case 14:
            tempSensor = _context2.sent;
            _context2.next = 17;
            return _sensor["default"].findOne({
              UUID: humidity['sensor uuid']
            });

          case 17:
            humSensor = _context2.sent;
            _context2.next = 20;
            return _sensor["default"].findOne({
              UUID: ammonia['sensor uuid']
            });

          case 20:
            ammoniaSensor = _context2.sent;

            if (!(!tempSensor || !humSensor || !ammoniaSensor)) {
              _context2.next = 23;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].NOT_FOUND,
              message: 'Sensor not found'
            };

          case 23:
            _context2.next = 25;
            return _reading["default"].create({
              sensor: tempSensor._id,
              key: "Temprature",
              point: temp.data.temperature
            });

          case 25:
            tempReading = _context2.sent;
            _context2.next = 28;
            return _reading["default"].create({
              sensor: humSensor._id,
              key: "Humidity",
              point: humidity.data.humidity
            });

          case 28:
            humReading = _context2.sent;
            _context2.next = 31;
            return _reading["default"].create({
              sensor: ammoniaSensor._id,
              key: "Ammonia",
              point: ammonia.data.ammonia
            });

          case 31:
            ammoniaReading = _context2.sent;
            return _context2.abrupt("return");

          case 35:
            _context2.prev = 35;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);

          case 38:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 35]]);
  }));

  return function newReading(_x) {
    return _ref2.apply(this, arguments);
  };
}(); //update single reading


exports.newReading = newReading;

var updateReading = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _reading["default"].findByIdAndUpdate({
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

  return function updateReading(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}(); //delete single reading


exports.updateReading = updateReading;

var deleteReading = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _reading["default"].findByIdAndDelete(id);

          case 2:
            return _context4.abrupt("return", '');

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function deleteReading(_x4) {
    return _ref4.apply(this, arguments);
  };
}(); //get single reading


exports.deleteReading = deleteReading;

var getReading = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _reading["default"].findById(id);

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

  return function getReading(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getReading = getReading;