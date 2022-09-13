"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDevice = exports.sync = exports.newDevice = exports.login = exports.getDevice = exports.getAllDevices = exports.deleteDevice = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _device = _interopRequireDefault(require("../models/device.model"));

var _crypto = _interopRequireDefault(require("crypto"));

var _uuid = require("uuid");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var SensorServices = _interopRequireWildcard(require("./sensor.service"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function randomString() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 21;
  return _crypto["default"].randomBytes(size).toString('base64').slice(0, size);
} //get all devices


var getAllDevices = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _device["default"].find();

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

  return function getAllDevices() {
    return _ref.apply(this, arguments);
  };
}(); //create new device


exports.getAllDevices = getAllDevices;

var newDevice = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body, addedBy, domain) {
    var DeviceCheck, _newDevice, data;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _device["default"].findOne({
              name: body.name
            });

          case 3:
            DeviceCheck = _context2.sent;

            if (!(DeviceCheck && DeviceCheck.domain === body.domain)) {
              _context2.next = 6;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].CONFLICT,
              message: "Device ".concat(body.name, " already exists")
            };

          case 6:
            _newDevice = {
              UUID: (0, _uuid.v4)(),
              name: body.name,
              label: body.label,
              addedBy: addedBy,
              domain: domain,
              device_key: randomString()
            };
            _context2.next = 9;
            return _device["default"].create(_newDevice);

          case 9:
            data = _context2.sent;
            return _context2.abrupt("return", data);

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            throw _context2.t0;

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));

  return function newDevice(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}(); //update single device


exports.newDevice = newDevice;

var updateDevice = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _device["default"].findByIdAndUpdate({
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

  return function updateDevice(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}(); //delete single device


exports.updateDevice = updateDevice;

var deleteDevice = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _device["default"].findByIdAndDelete(id);

          case 2:
            return _context4.abrupt("return", '');

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function deleteDevice(_x6) {
    return _ref4.apply(this, arguments);
  };
}(); //get single device


exports.deleteDevice = deleteDevice;

var getDevice = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _device["default"].findById(id);

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

  return function getDevice(_x7) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getDevice = getDevice;

var addSensorToDeviceArray = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(data, id) {
    var updatedDevice;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log("Adding sensor ".concat(data, " to device ").concat(id));
            _context6.prev = 1;
            _context6.next = 4;
            return _device["default"].findByIdAndUpdate(id, {
              $push: {
                sesnors: {
                  UUID: data
                }
              }
            }, {
              "new": true
            });

          case 4:
            updatedDevice = _context6.sent;
            return _context6.abrupt("return", updatedDevice);

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](1);
            console.error(_context6.t0);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 8]]);
  }));

  return function addSensorToDeviceArray(_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();

var sync = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(body, id) {
    var sensors, actuators, TargetDevice, currentDeviceSensors, currentDeviceActuators, updatedDeviceSensors, updatedDeviceActuators, _loop, i, UpdatedDevice3, UpdatedDevice2;

    return _regenerator["default"].wrap(function _callee7$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            // console.log(body);
            sensors = body.sensors, actuators = body.actuators;
            _context8.next = 4;
            return _device["default"].findById(id);

          case 4:
            TargetDevice = _context8.sent;

            if (TargetDevice) {
              _context8.next = 7;
              break;
            }

            throw {
              code: 401,
              data: 'Fuck you',
              message: 'Device not found'
            };

          case 7:
            console.log('Device: UUID: ' + TargetDevice.uuid);
            currentDeviceSensors = TargetDevice.sensors;
            currentDeviceActuators = TargetDevice.actuators;
            console.log('Current device Sensors: ' + currentDeviceSensors.length);
            console.log('Current device Actuators: ' + currentDeviceActuators.length);
            updatedDeviceSensors = [];
            updatedDeviceActuators = []; //Update device Array with

            console.log('Clearing device Array');
            _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop(i) {
              var SensorData, existingSensor, updatedSensor, newSensor, _existingSensor, _updatedSensor;

              return _regenerator["default"].wrap(function _loop$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      // console.log('Sensor: ' + JSON.stringify(sensors[i]));
                      SensorData = {
                        name: sensors[i].name,
                        UUID: sensors[i].UUID,
                        node: id,
                        reading: {
                          key: sensors[i].reading.key,
                          "typeof": sensors[i].reading["typeof"],
                          unit: sensors[i].reading.unit
                        }
                      };

                      if (!(!currentDeviceSensors.filter(function (e) {
                        return e.UUID === SensorData.UUID;
                      }).length > 0)) {
                        _context7.next = 34;
                        break;
                      }

                      console.log("Sensor Not Found at Device: ".concat(SensorData.UUID));
                      _context7.next = 5;
                      return SensorServices.getSensorByUUID(SensorData.UUID);

                    case 5:
                      existingSensor = _context7.sent;

                      if (!existingSensor) {
                        _context7.next = 24;
                        break;
                      }

                      console.log("Sensor Is on the Newwork: ".concat(SensorData.UUID));

                      if (!(!existingSensor.node === id)) {
                        _context7.next = 18;
                        break;
                      }

                      console.log("Sensor ".concat(existingSensor.UUID, " is not Connected to Device ").concat(id));
                      updatedSensor = SensorServices.updateSesnorNode(existingSensor._id, id); // Update existingSensor.node with id

                      if (updatedSensor) {
                        _context7.next = 13;
                        break;
                      }

                      throw {
                        code: _httpStatusCodes["default"].INTERNAL_SERVER_ERROR,
                        message: "Failed to update existing sensor"
                      };

                    case 13:
                      updatedDeviceSensors.push({
                        UUID: SensorData.UUID
                      });
                      _context7.next = 16;
                      return addSensorToDeviceArray(SensorData.UUID, id);

                    case 16:
                      _context7.next = 22;
                      break;

                    case 18:
                      console.log("Sensor ".concat(SensorData.UUID, " is Connected to Device ").concat(id)); //Push SensorData to device sensor[]

                      updatedDeviceSensors.push({
                        UUID: SensorData.UUID
                      });
                      _context7.next = 22;
                      return addSensorToDeviceArray(SensorData.UUID, id);

                    case 22:
                      _context7.next = 32;
                      break;

                    case 24:
                      _context7.next = 26;
                      return SensorServices.addNewSensor(SensorData);

                    case 26:
                      newSensor = _context7.sent;

                      if (newSensor) {
                        _context7.next = 29;
                        break;
                      }

                      throw {
                        code: _httpStatusCodes["default"].BAD_REQUEST,
                        message: 'Failed to add new sensor'
                      };

                    case 29:
                      updatedDeviceSensors.push({
                        UUID: SensorData.UUID
                      });
                      _context7.next = 32;
                      return addSensorToDeviceArray(SensorData.UUID, id);

                    case 32:
                      _context7.next = 49;
                      break;

                    case 34:
                      _context7.next = 36;
                      return SensorServices.getSensorByUUID(SensorData.UUID);

                    case 36:
                      _existingSensor = _context7.sent;

                      if (!(_existingSensor.node !== id)) {
                        _context7.next = 46;
                        break;
                      }

                      _updatedSensor = SensorServices.updateSesnorNode(_existingSensor._id, id); // Update existingSensor.node with id

                      if (_updatedSensor) {
                        _context7.next = 41;
                        break;
                      }

                      throw {
                        code: _httpStatusCodes["default"].INTERNAL_SERVER_ERROR,
                        message: "Failed to update existing sensor"
                      };

                    case 41:
                      updatedDeviceSensors.push({
                        UUID: SensorData.UUID
                      });
                      _context7.next = 44;
                      return addSensorToDeviceArray(SensorData.UUID, id);

                    case 44:
                      _context7.next = 49;
                      break;

                    case 46:
                      updatedDeviceSensors.push({
                        UUID: SensorData.UUID
                      });
                      _context7.next = 49;
                      return addSensorToDeviceArray(SensorData.UUID, id);

                    case 49:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _loop);
            });
            i = 0;

          case 17:
            if (!(i < sensors.length)) {
              _context8.next = 22;
              break;
            }

            return _context8.delegateYield(_loop(i), "t0", 19);

          case 19:
            i++;
            _context8.next = 17;
            break;

          case 22:
            console.log(updatedDeviceSensors);
            _context8.next = 25;
            return _device["default"].findOneAndUpdate({
              uuid: TargetDevice.uuid
            }, {
              sesnors: []
            }, {
              "new": true
            });

          case 25:
            _context8.next = 27;
            return _device["default"].findByIdAndUpdate(id, {
              sensors: updatedDeviceSensors
            }, {
              "new": true
            });

          case 27:
            _context8.next = 29;
            return _device["default"].findByIdAndUpdate(id, {
              actuators: []
            }, {
              "new": true
            });

          case 29:
            UpdatedDevice3 = _context8.sent;
            updatedDeviceActuators = [{
              UUID: '8998989898989'
            }, {
              UUID: '47364384275'
            }];
            console.log("Updated deviceActuators: ".concat(updatedDeviceActuators));
            _context8.next = 34;
            return _device["default"].findByIdAndUpdate(id, {
              actuators: updatedDeviceActuators
            }, {
              "new": true
            });

          case 34:
            UpdatedDevice2 = _context8.sent;
            _context8.next = 41;
            break;

          case 37:
            _context8.prev = 37;
            _context8.t1 = _context8["catch"](0);
            console.log(_context8.t1);
            throw _context8.t1;

          case 41:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee7, null, [[0, 37]]);
  }));

  return function sync(_x10, _x11) {
    return _ref7.apply(this, arguments);
  };
}(); //Login device


exports.sync = sync;

var login = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(body) {
    var device, token;
    return _regenerator["default"].wrap(function _callee8$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _device["default"].findOne({
              uuid: body.uuid
            }, '-__v -updatedAt');

          case 3:
            device = _context9.sent;

            if (device) {
              _context9.next = 6;
              break;
            }

            throw {
              code: 404,
              data: 'NO_uuid_FOUND',
              message: 'This uuid is not registered.'
            };

          case 6:
            if (!(body.device_key === device.device_key)) {
              _context9.next = 12;
              break;
            }

            token = _jsonwebtoken["default"].sign({
              device_id: device._id,
              uuid: device.uuid
            }, process.env.JWT_SECRET, {
              expiresIn: '2h'
            });
            device.token = token;
            return _context9.abrupt("return", device);

          case 12:
            throw {
              code: 404,
              data: 'DEVICE_KEY_MISSMATCH',
              message: 'Wrong Device Key'
            };

          case 13:
            _context9.next = 18;
            break;

          case 15:
            _context9.prev = 15;
            _context9.t0 = _context9["catch"](0);
            throw _context9.t0;

          case 18:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee8, null, [[0, 15]]);
  }));

  return function login(_x12) {
    return _ref8.apply(this, arguments);
  };
}();

exports.login = login;