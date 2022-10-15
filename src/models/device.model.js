import { Schema, model } from 'mongoose';

const deviceSchema = new Schema(
  {
    UUID: { type: String },
    device_key: { type: String },
    token: { type: String },
    model: { type: String },
    name: { type: String },
    label: { type: String },
    MAC_ADDRESS: { type: String },
    active: { type: Boolean, default: false },
    isGateway: { type: Boolean, default: false },
    isAccessController: { type: Boolean, default: false },
    isCamera: { type: Boolean, default: false },
    isBridge: { type: Boolean, default: false },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    domain: { type: Schema.Types.ObjectId, ref: 'Domain' },
    chamber: { type: Schema.Types.ObjectId, ref: 'Chamber' },
    cell: { type: Schema.Types.ObjectId, ref: 'Cell' },
    nodes: [{ type: Schema.Types.ObjectId, ref: 'Device' }],
    sensors: [
      {
        UUID: { type: String },
        key: { type: String },
        sensor: { type: Schema.Types.ObjectId, ref: 'Sensor' },
      }
    ],
    actuators: [
      {
        UUID: { type: String }
      }
    ],
    changeLog: [
      {
        timeStamp: { type: Date, default: Date.now() },
        description: { type: String },
        addedSensor: { type: Schema.Types.ObjectId, ref: 'Sensor' },
        addedActuator: { type: Schema.Types.ObjectId, ref: 'Actuator' }
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model('Device', deviceSchema);
