"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var actuatorSchema = new _mongoose.Schema({
  name: {
    type: String
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Actuator', actuatorSchema);

exports["default"] = _default;