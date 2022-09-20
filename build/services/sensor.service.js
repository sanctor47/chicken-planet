"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSesnorNode = exports.updateSensor = exports.newSensor = exports.newReadings = exports.getSensorReadings = exports.getSensorByUUID = exports.getSensor = exports.getAllSensors = exports.deleteSensor = exports.addNewSensor = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sensor = _interopRequireDefault(require("../models/sensor.model"));

var _device = _interopRequireDefault(require("../models/device.model"));

var BucketService = _interopRequireWildcard(require("./bucket.service"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//get all sensors
var getAllSensors = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _sensor["default"].find();

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

  return function getAllSensors() {
    return _ref.apply(this, arguments);
  };
}();

exports.getAllSensors = getAllSensors;

var getSensorByUUID = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(UUID) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _sensor["default"].findOne({
              UUID: UUID
            });

          case 3:
            data = _context2.sent;
            return _context2.abrupt("return", data);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getSensorByUUID(_x) {
    return _ref2.apply(this, arguments);
  };
}(); // Check if sensor already exists
// -if true, then check if DeviceIds Match
// --if true, then return True
// --if false, update sensor node and add deviceChageLog
// -if false, create a new sensor
//create new sensor


exports.getSensorByUUID = getSensorByUUID;

var newSensor = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var deviceCheck, sensorCheck, newSensorData, data, updatedDevice;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _device["default"].findById(body.device);

          case 3:
            deviceCheck = _context3.sent;

            if (deviceCheck) {
              _context3.next = 6;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].NOT_FOUND,
              message: 'Device not found.'
            };

          case 6:
            _context3.next = 8;
            return _sensor["default"].findOne({
              UUID: body.UUID
            });

          case 8:
            sensorCheck = _context3.sent;

            if (!sensorCheck) {
              _context3.next = 11;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].CONFLICT,
              messgae: 'UUID already exists'
            };

          case 11:
            newSensorData = {
              name: body.name,
              UUID: body.UUID,
              device: body.device
            };
            _context3.next = 14;
            return _sensor["default"].create(newSensorData);

          case 14:
            data = _context3.sent;
            _context3.next = 17;
            return _device["default"].findByIdAndUpdate(deviceCheck._id, {
              $push: {
                sensors: {
                  UUID: data.UUID
                }
              }
            }, {
              "new": true
            });

          case 17:
            updatedDevice = _context3.sent;
            return _context3.abrupt("return", data);

          case 21:
            _context3.prev = 21;
            _context3.t0 = _context3["catch"](0);
            throw _context3.t0;

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 21]]);
  }));

  return function newSensor(_x2) {
    return _ref3.apply(this, arguments);
  };
}(); //create new sensor


exports.newSensor = newSensor;

var addNewSensor = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(data) {
    var newSesnorData, _newSensor;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            newSesnorData = {
              name: data.name,
              UUID: data.UUID,
              node: data.node,
              reading: data.reading,
              connected: true
            };
            _context4.next = 4;
            return _sensor["default"].create(newSesnorData);

          case 4:
            _newSensor = _context4.sent;
            return _context4.abrupt("return", _newSensor);

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));

  return function addNewSensor(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.addNewSensor = addNewSensor;

var updateSesnorNode = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(sensorId, deviceId) {
    var TargetSensor;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _sensor["default"].findByIdAndUpdate(sensorId, {
              node: deviceId
            }, {
              "new": true
            });

          case 3:
            TargetSensor = _context5.sent;
            return _context5.abrupt("return", TargetSensor);

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            console.error(_context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function updateSesnorNode(_x4, _x5) {
    return _ref5.apply(this, arguments);
  };
}(); //update single sensor


exports.updateSesnorNode = updateSesnorNode;

var updateSensor = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _sensor["default"].findByIdAndUpdate({
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

  return function updateSensor(_x6, _x7) {
    return _ref6.apply(this, arguments);
  };
}(); //delete single sensor


exports.updateSensor = updateSensor;

var deleteSensor = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(id) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _sensor["default"].findByIdAndDelete(id);

          case 2:
            return _context7.abrupt("return", '');

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function deleteSensor(_x8) {
    return _ref7.apply(this, arguments);
  };
}(); //get single sensor


exports.deleteSensor = deleteSensor;

var getSensor = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(id) {
    var data;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _sensor["default"].findById(id);

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

  return function getSensor(_x9) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getSensor = getSensor;

var newReadings = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(body) {
    var timeStamp, data;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            try {
              timeStamp = body.timeStamp, data = body.data;
              data.forEach( /*#__PURE__*/function () {
                var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(sensor) {
                  var response;
                  return _regenerator["default"].wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          _context9.next = 2;
                          return BucketService.newPoint(sensor, timeStamp);

                        case 2:
                          response = _context9.sent;

                        case 3:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _callee9);
                }));

                return function (_x11) {
                  return _ref10.apply(this, arguments);
                };
              }());
            } catch (err) {
              console.log(err);
            }

          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function newReadings(_x10) {
    return _ref9.apply(this, arguments);
  };
}();

exports.newReadings = newReadings;

var getSensorReadings = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(UUID) {
    var TargetSensor, data;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            console.log(UUID);
            _context11.next = 4;
            return _sensor["default"].findOne({
              UUID: UUID
            });

          case 4:
            TargetSensor = _context11.sent;

            if (TargetSensor) {
              _context11.next = 7;
              break;
            }

            throw {
              code: 404,
              message: 'Sensor not found',
              data: 'SENSOR_NOT_FOUND'
            };

          case 7:
            _context11.next = 9;
            return BucketService.getBucketBySensorUUID(UUID);

          case 9:
            data = _context11.sent;

            if (data) {
              _context11.next = 12;
              break;
            }

            throw {
              code: 500,
              message: 'Error getting bucket',
              data: 'BUCKET_GET_ERROR'
            };

          case 12:
            return _context11.abrupt("return", data);

          case 15:
            _context11.prev = 15;
            _context11.t0 = _context11["catch"](0);
            throw _context11.t0;

          case 18:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 15]]);
  }));

  return function getSensorReadings(_x12) {
    return _ref11.apply(this, arguments);
  };
}();

exports.getSensorReadings = getSensorReadings;