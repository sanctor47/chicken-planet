"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var deviceSchema = new _mongoose.Schema({
  UUID: {
    type: String
  },
  device_key: {
    type: String
  },
  token: {
    type: String
  },
  model: {
    type: String
  },
  name: {
    type: String
  },
  label: {
    type: String
  },
  MAC_ADDRESS: {
    type: String
  },
  active: {
    type: Boolean,
    "default": false
  },
  isGateway: {
    type: Boolean,
    "default": false
  },
  isAccessController: {
    type: Boolean,
    "default": false
  },
  isCamera: {
    type: Boolean,
    "default": false
  },
  isBridge: {
    type: Boolean,
    "default": false
  },
  addedBy: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  domain: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Domain'
  },
  chamber: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Chamber'
  },
  cell: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Cell'
  },
  nodes: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Device'
  }],
  sensors: [{
    UUID: {
      type: String
    }
  }],
  actuators: [{
    UUID: {
      type: String
    }
  }],
  changeLog: [{
    timeStamp: {
      type: Date,
      "default": Date.now()
    },
    description: {
      type: String
    },
    addedSensor: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'Sensor'
    },
    addedActuator: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'Actuator'
    }
  }]
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Device', deviceSchema);

exports["default"] = _default;