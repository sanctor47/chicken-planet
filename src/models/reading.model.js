import { Schema, model } from 'mongoose';

const readingSchema = new Schema(
  {
    sensor: {
      type: Schema.Types.ObjectId,
      ref: 'Sensor'
    },
    key: { type: String },
    point: { type: String }
  },
  {
    timestamps: true
  }
);

export default model('Reading', readingSchema);
