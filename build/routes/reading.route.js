"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var readingController = _interopRequireWildcard(require("../controllers/reading.controller"));

var _reading2 = _interopRequireDefault(require("../models/reading.model"));

var _network = _interopRequireDefault(require("../models/network.model"));

var _device = _interopRequireDefault(require("../models/device.model"));

var _sensor = _interopRequireDefault(require("../models/sensor.model"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = _express["default"].Router(); //route to get all readings


router.get('', readingController.getAllReadings); //route to create a new reading

router.post('', readingController.newReading); //route to get a single reading by their reading id

router.get('/id/:_id', readingController.getReading); //route to update a single reading by their reading id

router.put('/id/:_id', readingController.updateReading); //route to delete a single reading by their reading id

router["delete"]('/id/:_id', readingController.deleteReading);
router.get('/temp', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _reading2["default"].find({
              key: 'Temprature'
            });

          case 3:
            data = _context.sent;
            res.status(200).json(data);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/hum', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _reading2["default"].find({
              key: 'Humidity'
            });

          case 3:
            data = _context2.sent;
            res.status(200).json(data);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
router.get('/nh3', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _reading2["default"].find({
              key: 'Ammonia'
            });

          case 3:
            data = _context3.sent;
            res.status(200).json(data);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
router.get('/latest/temp', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _reading2["default"].findOne({
              key: 'Temprature'
            }, {}, {
              sort: {
                createdAt: -1
              }
            });

          case 3:
            data = _context4.sent;
            res.status(200).json(data);
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
router.get('/latest/hum', /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _reading2["default"].findOne({
              key: 'Humidity'
            }, {}, {
              sort: {
                createdAt: -1
              }
            });

          case 3:
            data = _context5.sent;
            res.status(200).json(data);
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}());
router.get('/latest/nh3', /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _reading2["default"].findOne({
              key: 'Ammonia'
            }, {}, {
              sort: {
                createdAt: -1
              }
            });

          case 3:
            data = _context6.sent;
            res.status(200).json(data);
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}());
router.get('/latest', /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var temp, hum, nh3;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _reading2["default"].findOne({
              key: 'Temprature'
            }, {}, {
              sort: {
                createdAt: -1
              }
            });

          case 3:
            temp = _context7.sent;
            _context7.next = 6;
            return _reading2["default"].findOne({
              key: 'Humidity'
            }, {}, {
              sort: {
                createdAt: -1
              }
            });

          case 6:
            hum = _context7.sent;
            _context7.next = 9;
            return _reading2["default"].findOne({
              key: 'Ammonia'
            }, {}, {
              sort: {
                createdAt: -1
              }
            });

          case 9:
            nh3 = _context7.sent;
            res.status(200).json({
              temp: temp,
              hum: hum,
              nh3: nh3
            });
            _context7.next = 16;
            break;

          case 13:
            _context7.prev = 13;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 13]]);
  }));

  return function (_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}());

var arrayAvg = function arrayAvg(array) {
  var sum = 0;
  var avg = 0;

  for (var index = 0; index < array.length; index++) {
    var element = array[index];
    sum = parseInt(element) + sum;
  }

  avg = sum / array.length;
  return avg;
};

var getAvgReadings = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(gateway, nodes) {
    var temps, hums, nh3s, TargetGateway, index, n, TargetSensor, TargetReadigns, _index, element, _index2, elemnet, node, _index3, _n, _TargetSensor, _TargetReadigns, _index4, _element, tempAvg, humAvg, nh3Avg;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            temps = [];
            hums = [];
            nh3s = []; //   temps.push("20")

            _context8.next = 5;
            return _device["default"].findById(gateway);

          case 5:
            TargetGateway = _context8.sent;
            index = 0;

          case 7:
            if (!(index < TargetGateway.sensors.length)) {
              _context8.next = 19;
              break;
            }

            n = TargetGateway.sensors[index];
            _context8.next = 11;
            return _sensor["default"].findOne({
              UUID: n.UUID
            });

          case 11:
            TargetSensor = _context8.sent;
            _context8.next = 14;
            return _reading2["default"].find({
              sensor: TargetSensor._id
            });

          case 14:
            TargetReadigns = _context8.sent;

            for (_index = 0; _index < TargetReadigns.length; _index++) {
              element = TargetReadigns[_index];
              if (element.key === 'Temprature') temps.push(element.point);
              if (element.key === 'Humidity') hums.push(element.point);
              if (element.key === 'Ammonia') nh3s.push(element.point); //   if (element.key === 'Temprature') console.log('Temp: ', element.point);
              //   if (element.key === 'Humidity') console.log('Hum: ', element.point);
              //   if (element.key === 'Ammonia') console.log('Nh3: ', element.point);
            }

          case 16:
            index++;
            _context8.next = 7;
            break;

          case 19:
            _index2 = 0;

          case 20:
            if (!(_index2 < nodes.length)) {
              _context8.next = 41;
              break;
            }

            elemnet = nodes[_index2];
            _context8.next = 24;
            return _device["default"].findById(elemnet);

          case 24:
            node = _context8.sent;
            _index3 = 0;

          case 26:
            if (!(_index3 < node.sensors.length)) {
              _context8.next = 38;
              break;
            }

            _n = node.sensors[_index3];
            _context8.next = 30;
            return _sensor["default"].findOne({
              UUID: _n.UUID
            });

          case 30:
            _TargetSensor = _context8.sent;
            _context8.next = 33;
            return _reading2["default"].find({
              sensor: _TargetSensor._id
            });

          case 33:
            _TargetReadigns = _context8.sent;

            for (_index4 = 0; _index4 < _TargetReadigns.length; _index4++) {
              _element = _TargetReadigns[_index4];
              if (_element.key === 'Temprature') temps.push(_element.point);
              if (_element.key === 'Humidity') hums.push(_element.point);
              if (_element.key === 'Ammonia') nh3s.push(_element.point);
              if (_element.key === 'Temprature') console.log('Temp: ', _element.point);
              if (_element.key === 'Humidity') console.log('Hum: ', _element.point);
              if (_element.key === 'Ammonia') console.log('Nh3: ', _element.point);
            }

          case 35:
            _index3++;
            _context8.next = 26;
            break;

          case 38:
            _index2++;
            _context8.next = 20;
            break;

          case 41:
            tempAvg = arrayAvg(temps);
            humAvg = arrayAvg(hums);
            nh3Avg = arrayAvg(nh3s);
            console.log(tempAvg);
            console.log(humAvg);
            console.log(nh3Avg);
            return _context8.abrupt("return", {
              tempAvg: tempAvg,
              humAvg: humAvg,
              nh3Avg: nh3Avg
            });

          case 48:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getAvgReadings(_x22, _x23) {
    return _ref8.apply(this, arguments);
  };
}();

router.get('/networkId/:networkId', /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var TargetNework, avgs;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _network["default"].findById(req.params.networkId);

          case 3:
            TargetNework = _context9.sent;

            if (TargetNework) {
              _context9.next = 6;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].NOT_FOUND,
              message: 'Network not found.'
            };

          case 6:
            _context9.next = 8;
            return getAvgReadings(TargetNework.gateway, TargetNework.nodes);

          case 8:
            avgs = _context9.sent;
            // console.log(avgs);
            res.status(200).send({
              data: avgs
            });
            _context9.next = 16;
            break;

          case 12:
            _context9.prev = 12;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0);
            res.status(500).send({
              status: 'error'
            });

          case 16:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 12]]);
  }));

  return function (_x24, _x25, _x26) {
    return _ref9.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;