"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBucket = exports.newReading = exports.newPoint = exports.newBucket = exports.getBucketBySensorUUID = exports.getBucket = exports.getAllBuckets = exports.deleteBucket = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bucket = _interopRequireDefault(require("../models/bucket.model"));

//get all buckets
var getAllBuckets = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bucket["default"].find();

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

  return function getAllBuckets() {
    return _ref.apply(this, arguments);
  };
}(); //create new bucket


exports.getAllBuckets = getAllBuckets;

var newBucket = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(UUID, key) {
    var _newBucket, data;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _newBucket = {
              UUID: UUID,
              key: key
            };
            _context2.next = 4;
            return _bucket["default"].create(_newBucket);

          case 4:
            data = _context2.sent;
            return _context2.abrupt("return", data);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function newBucket(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}(); //update single bucket


exports.newBucket = newBucket;

var updateBucket = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _bucket["default"].findByIdAndUpdate({
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

  return function updateBucket(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}(); //delete single bucket


exports.updateBucket = updateBucket;

var deleteBucket = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _bucket["default"].findByIdAndDelete(id);

          case 2:
            return _context4.abrupt("return", '');

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function deleteBucket(_x5) {
    return _ref4.apply(this, arguments);
  };
}(); //get single bucket


exports.deleteBucket = deleteBucket;

var getBucket = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _bucket["default"].findById(id);

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

  return function getBucket(_x6) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getBucket = getBucket;

var newPoint = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(data, timeStamp) {
    var UUID, point, SensorBucket, createdBucket;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            UUID = data.UUID, point = data.point;
            _context6.next = 4;
            return _bucket["default"].findOne({
              UUID: UUID
            });

          case 4:
            SensorBucket = _context6.sent;

            if (SensorBucket) {
              _context6.next = 15;
              break;
            }

            _context6.next = 8;
            return newBucket(UUID, point.key);

          case 8:
            createdBucket = _context6.sent;

            if (createdBucket) {
              _context6.next = 11;
              break;
            }

            throw {
              code: 500,
              message: 'Error creating new bucket'
            };

          case 11:
            _context6.next = 13;
            return _bucket["default"].findByIdAndUpdate(createdBucket._id, {
              $push: {
                points: {
                  timeStamp: timeStamp,
                  point: point
                }
              }
            }, {
              safe: true,
              upsert: true
            });

          case 13:
            _context6.next = 17;
            break;

          case 15:
            _context6.next = 17;
            return _bucket["default"].findByIdAndUpdate(SensorBucket._id, {
              $push: {
                points: {
                  timeStamp: timeStamp,
                  point: point
                }
              }
            }, {
              safe: true,
              upsert: true
            });

          case 17:
            _context6.next = 22;
            break;

          case 19:
            _context6.prev = 19;
            _context6.t0 = _context6["catch"](0);
            console.error(_context6.t0);

          case 22:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 19]]);
  }));

  return function newPoint(_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();

exports.newPoint = newPoint;

var newReading = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(body) {
    var timeStamp, data;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            try {
              timeStamp = body.timeStamp;
              data = body.data; // console.log(data[0])

              data.forEach( /*#__PURE__*/function () {
                var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(element) {
                  var buckets, TargetBucket, point;
                  return _regenerator["default"].wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          console.log(element.UUID);
                          console.log(element.point);
                          _context7.next = 4;
                          return _bucket["default"].find({
                            sensor: element.UUID
                          });

                        case 4:
                          buckets = _context7.sent;

                          if (!(buckets.length === 0)) {
                            _context7.next = 11;
                            break;
                          }

                          _context7.next = 8;
                          return newBucket(element.UUID, element.point.key);

                        case 8:
                          TargetBucket = _context7.sent;
                          _context7.next = 12;
                          break;

                        case 11:
                          TargetBucket = buckets[0];

                        case 12:
                          point = {
                            timeStamp: timeStamp,
                            point: element.point
                          };
                          _context7.next = 15;
                          return _bucket["default"].findByIdAndUpdate(TargetBucket._id, {
                            $push: {
                              points: point
                            }
                          }, {
                            safe: true,
                            upsert: true
                          });

                        case 15:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                }));

                return function (_x10) {
                  return _ref8.apply(this, arguments);
                };
              }());
            } catch (errors) {
              console.log(errors);
            }

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function newReading(_x9) {
    return _ref7.apply(this, arguments);
  };
}();

exports.newReading = newReading;

var getBucketBySensorUUID = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(UUID) {
    var data;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            console.log(UUID);
            _context9.next = 4;
            return _bucket["default"].findOne({
              UUID: UUID
            });

          case 4:
            data = _context9.sent;
            return _context9.abrupt("return", data);

          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0);

          case 11:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 8]]);
  }));

  return function getBucketBySensorUUID(_x11) {
    return _ref9.apply(this, arguments);
  };
}();

exports.getBucketBySensorUUID = getBucketBySensorUUID;