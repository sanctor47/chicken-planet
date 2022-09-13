"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var domainSchema = new _mongoose.Schema({
  name: {
    type: String
  },
  owner: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  apiKey: {
    type: String
  },
  members: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  chambers: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Chamber'
  }]
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Domain', domainSchema);

exports["default"] = _default;