"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var readingSchema = new _mongoose.Schema({
  sensor: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Sensor'
  },
  key: {
    type: String
  },
  point: {
    type: String
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Reading', readingSchema);

exports["default"] = _default;