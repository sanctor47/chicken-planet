import { Schema, model } from 'mongoose';

const domainSchema = new Schema(
  {
    name: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    apiKey: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    chambers:[{type: Schema.Types.ObjectId, ref: 'Chamber'}],
  },
  {
    timestamps: true
  }
);

export default model('Domain', domainSchema);
