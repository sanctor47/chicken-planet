import { Schema, model } from 'mongoose';

const chamberSchema = new Schema(
  {
    name: { type: String },
    area:{ type: String},
    addedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    domain: { type: Schema.Types.ObjectId, ref: 'Domain' },
    cells: [{ type: Schema.Types.ObjectId, ref: 'Cell' }]
  },
  {
    timestamps: true
  }
);

export default model('Chamber', chamberSchema);
