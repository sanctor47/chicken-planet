"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _reading = _interopRequireDefault(require("./reading.route"));

var _network = _interopRequireDefault(require("./network.route"));

var _actuator = _interopRequireDefault(require("./actuator.route"));

var _bucket = _interopRequireDefault(require("./bucket.route"));

var _sensor = _interopRequireDefault(require("./sensor.route"));

var _device = _interopRequireDefault(require("./device.route"));

var _chamber = _interopRequireDefault(require("./chamber.route"));

var _admin = _interopRequireDefault(require("./admin.route"));

var _cell = _interopRequireDefault(require("./cell.route"));

var _domain = _interopRequireDefault(require("./domain.route"));

var _user = _interopRequireDefault(require("./user.route"));

var _path = _interopRequireDefault(require("path"));

var router = _express["default"].Router();

var FE_File = _path["default"].join(__dirname, '../views'); // const FE = path.join(__dirname, '../views')

/**
 * Function contains Application routes
 *
 * @returns router
 */


var routes = function routes() {
  router.get('/', function (req, res) {
    res.sendFile(_path["default"].join(FE_File, 'index.html'));
  });
  router.use('/users', _user["default"]);
  router.use('/domains', _domain["default"]);
  router.use('/cells', _cell["default"]);
  router.use('/chambers', _chamber["default"]);
  router.use('/admins', _admin["default"]);
  router.use('/devices', _device["default"]);
  router.use('/sensors', _sensor["default"]);
  router.use('/actuators', _actuator["default"]);
  router.use('/buckets', _bucket["default"]);
  router.use('/networks', _network["default"]);
  router.use('/reading', _reading["default"]);
  return router;
};

var _default = routes;
exports["default"] = _default;