import { Schema, model } from 'mongoose';

const cellSchema = new Schema(
  {
    name: { type: String },
    area: { type: String },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    chamber: { type: Schema.Types.ObjectId, ref: 'Chamber' },
    device: [{ type: Schema.Types.ObjectId, ref: 'Device' }]
  },
  {
    timestamps: true
  }
);

export default model('Cell', cellSchema);
