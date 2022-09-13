"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var cellSchema = new _mongoose.Schema({
  name: {
    type: String
  },
  area: {
    type: String
  },
  addedBy: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  chamber: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Chamber'
  },
  device: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Device'
  }]
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Cell', cellSchema);

exports["default"] = _default;