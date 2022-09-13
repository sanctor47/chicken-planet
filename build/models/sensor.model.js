"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var sensorSchema = new _mongoose.Schema({
  name: {
    type: String
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Sensor', sensorSchema);

exports["default"] = _default;