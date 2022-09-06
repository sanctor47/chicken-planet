import { Schema, model } from 'mongoose';

const bucketSchema = new Schema(
  {
    UUID: { type: String },
    count: { type: Number, default: 0 },
    key: { type: String },
    points: [
      {
        timeStamp: { type: Date, required: true },
        point: {
          key: { type: String },
          typeof: { type: String },
          value: { type: Number }
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model('Bucket', bucketSchema);
