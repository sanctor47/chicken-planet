"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var networkSchema = new _mongoose.Schema({
  name: {
    type: String
  },
  gateway: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Device"
  },
  nodes: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Device"
  }]
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Network', networkSchema);

exports["default"] = _default;