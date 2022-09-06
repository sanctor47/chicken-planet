import { Schema, model } from 'mongoose';

const sensorSchema = new Schema(
  {
    name: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('Sensor', sensorSchema);
