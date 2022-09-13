"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var adminSchema = new _mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    unique: true
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
  active: {
    type: Boolean
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Admin', adminSchema);

exports["default"] = _default;