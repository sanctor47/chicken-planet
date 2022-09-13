"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var bucketSchema = new _mongoose.Schema({
  UUID: {
    type: String
  },
  count: {
    type: Number,
    "default": 0
  },
  key: {
    type: String
  },
  points: [{
    timeStamp: {
      type: Date,
      required: true
    },
    point: {
      key: {
        type: String
      },
      "typeof": {
        type: String
      },
      value: {
        type: Number
      }
    }
  }]
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Bucket', bucketSchema);

exports["default"] = _default;