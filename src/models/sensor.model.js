import { Schema, model } from 'mongoose';

const sensorSchema = new Schema(
  {
    name: { type: String },
    UUID: { type: String },
    device: { type: Schema.Types.ObjectId, ref: 'Device' }
  },
  {
    timestamps: true
  }
);

export default model('Sensor', sensorSchema);
