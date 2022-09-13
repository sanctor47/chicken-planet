"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var userSchema = new _mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  OTP: {
    type: String
  },
  domain: {
    type: String
  },
  active: {
    type: Boolean,
    "default": false
  },
  completedProfile: {
    type: Boolean,
    "default": false
  },
  refreshToken: {
    type: String
  },
  blocked: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('User', userSchema);

exports["default"] = _default;