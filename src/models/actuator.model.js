import { Schema, model } from 'mongoose';

const actuatorSchema = new Schema(
  {
    name: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('Actuator', actuatorSchema);
