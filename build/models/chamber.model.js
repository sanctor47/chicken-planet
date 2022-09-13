"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var chamberSchema = new _mongoose.Schema({
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
  domain: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Domain'
  },
  cells: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Cell'
  }]
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Chamber', chamberSchema);

exports["default"] = _default;